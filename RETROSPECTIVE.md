# 단풍지지 개발 노트

기술 스택/실행 방법 등 레퍼런스 정보는 [README.md](README.md)에 있습니다. 이 문서는 "왜 이렇게 만들었는가"에 집중한 회고입니다.

---

## 1. 문제 정의 과정

넥슨 오픈 API는 인게임 캐릭터 정보를 20개 이상의 엔드포인트로 쪼개서 제공합니다(기본 정보/스탯/장비/유니온/스킬/업적 등).
인게임에서 이 정보를 확인하려면 여러 메뉴를 오가야 하고, 다른 유저의 정보는 아예 확인할 수 없습니다. 문제를 좁히면:

- **캐릭터 이름을 입력하면** 장비·스탯·스킬·유니온 등 정보를 한 화면에서 볼 수 있어야 한다.
- 길드 단위로도 같은 종류의 조회(길드원 목록, 노블레스 스킬 보유 현황)가 필요하다.
- 자주 보는 캐릭터를 매번 검색하지 않도록 즐겨찾기가 있어야 한다.

이 서비스가 검색 엔진에 걸리려면 SSR이 필요했고, 서버 사이드에서만 API 키를 다루므로 정적 export가 아닌 서버 배포가 전제였습니다. 배포 플랫폼은 Vercel 무료 티어를 기준으로 잡았고, 그 결과로 아래 3장에 나오는 여러 제약(서버리스 함수 개수, 이미지 최적화 변환 한도, Fluid CPU 과금)이 실제 개발 도중 발목을 잡았습니다.

범위는 처음부터 다 정하지 않고 커밋 단위로 좁혀 나갔습니다. 뼈대(헤더/서치바/다크모드) → 넥슨 API 연동 → 캐릭터 탭 하나씩 추가(장비 → 스탯 → 스킬 → 유니온 → 코디/기타) → 길드 검색 → 즐겨찾기/최근 검색어 → PWA/네이티브 앱 → 테스트/CI → 다국어 → 좋아요/인기 캐릭터(첫 DB 도입) 순서로, 매번 "다음에 뭐가 없으면 불편한가"를 기준으로 다음 커밋을 정했습니다.

---

## 2. 주요 의사결정

### 2.1 API 키는 항상 서버에서만 사용한다
클라이언트에서 넥슨 API를 직접 호출하면 API 키가 브라우저 번들/네트워크 탭에 노출됩니다. 그래서 모든 호출은 서버 컴포넌트/라우트 핸들러에서만 하고, 앱(iOS/Android)도 정적 export 대신 `capacitor.config.ts`의 `server.url`로 배포된 웹을 그대로 로드하는 **원격 URL 모드**를 택했습니다. 앱 스토어 심사 때문에 네이티브 셸을 씌웠을 뿐, 실제 로직은 웹 서버 하나로 통일됩니다.

### 2.2 순간 요청 제한(429)을 구조로 흡수한다
캐릭터 상세 페이지 하나를 그리려면 ocid 조회 후 20개 API를 호출해야 합니다. 개발 중 테스트용 API 키로 순차 호출을 하던 도중 429가 발생했는데, 순간 요청량 제한은 라이브 키에서도 트래픽이 몰리면 똑같이 겪을 수 있는 문제라고 판단했습니다. 그래서 [e71e25a](https://github.com/empal030110/mapleGG/commit/e71e25a)에서 응답 속도 개선을 위해 병렬 호출로 전환하면서도, 20개를 아무 제약 없이 한꺼번에 쏘면 429가 더 잦아질 게 뻔했기 때문에 처음부터 동시 실행 개수를 제한하는 구조로 병렬화했습니다. 두 가지로 대응했습니다.
- [`lib/runLimited.ts`](lib/runLimited.ts): 동시 실행 개수를 3개로 제한하는 워커 풀. "전부 병렬"과 "전부 순차"의 중간 지점을 코드 몇 줄로 만들었습니다.
- [`lib/ssrFetcher.ts`](lib/ssrFetcher.ts): 그래도 429가 나면 지수 백오프 + 지터로 최대 4회 재시도. 동시에 여러 요청이 실패하면 같은 간격으로 재시도가 다시 몰리므로, 고정 지연이 아니라 지터를 섞었습니다.

랭킹류는 별도 문제였습니다. 당일 랭킹은 하루 중 특정 시점까지 집계 전 상태(`OPENAPI00009`)일 수 있어서, [`lib/ssrRankingFetcher.ts`](lib/ssrRankingFetcher.ts)가 이 에러 코드를 감지하면 전날 날짜로 자동 재시도하도록 만들었습니다([2cbdd74](https://github.com/empal030110/mapleGG/commit/2cbdd74)).

### 2.3 넥슨 API 응답은 전부 zod로 검증한다
초기에는 응답 타입을 손으로 작성한 interface로 다뤘는데, 잠재옵션이 없는 아이템이나 유니온 미가입 캐릭터처럼 필드가 `null`로 내려오는 케이스를 놓쳐 크래시가 여러 번 났습니다([0be30e2](https://github.com/empal030110/mapleGG/commit/0be30e2), [2f7a218](https://github.com/empal030110/mapleGG/commit/2f7a218), [c2a42db](https://github.com/empal030110/mapleGG/commit/c2a42db), [821a175](https://github.com/empal030110/mapleGG/commit/821a175) 등). [707d18d](https://github.com/empal030110/mapleGG/commit/707d18d)에서 장비/안드로이드/칭호 스키마에 zod를 먼저 도입해 타입 버그를 실제로 잡아냈고, 효과가 확인된 후 [7b518c6](https://github.com/empal030110/mapleGG/commit/7b518c6)에서 나머지 19개 엔드포인트까지 전부 zod 스키마로 옮겼습니다. 원칙은 "값이 없을 수 있는 필드는 전부 `nullish()`로 받고, 실제 API 응답을 눈으로 확인한 뒤에만 좁힌다" — 실제 응답을 신뢰 기준으로 삼았습니다. 부가 효과로 도메인 타입은 대부분 `z.infer`로 추출해서 스키마와 타입이 어긋날 일이 사라졌습니다.

### 2.4 배포 플랫폼(Vercel) 제약이 실제 아키텍처를 바꿨다
- **서버리스 함수 개수 초과**: 루트 `api/` 폴더 구조가 Vercel의 함수 개수 제한에 걸려, 라우트 핸들러가 필요 없는 순수 유틸은 `lib/`로 옮겼습니다([d663e05](https://github.com/empal030110/mapleGG/commit/d663e05)). 당시 `app/api/`에 남은 건 `favorites/route.ts` 하나뿐이었고, 지금은 좋아요용 `likes/[name]/route.ts`가 하나 더 있습니다.
- **이미지 최적화 무료 한도**: 넥슨 API가 내려주는 캐릭터/장비 아이콘은 이미 적정 크기라 Next.js 이미지 최적화가 오히려 Vercel 무료 변환 횟수만 소모했습니다. `next.config.ts`에서 `unoptimized: true`로 비활성화했습니다([1ca2f89](https://github.com/empal030110/mapleGG/commit/1ca2f89)).
- **Fluid CPU 과금**: 길드원/랭킹/즐겨찾기 목록의 `<Link>`가 뷰포트에 들어올 때마다 자동 프리페치를 실행해 CPU 사용량이 과도하게 잡혔습니다. 목적지인 `/user/[name]`이 넥슨 API를 20개 호출하는 SSR 페이지라, 목록을 스크롤만 해도 실제 방문과 비슷한 비용이 백그라운드에서 발생했습니다. Vercel 대시보드(Usage/Observability)에서 Fluid Compute 사용량이 예상보다 높게 찍힌 걸 보고 알아차렸고, 목록성 링크는 `prefetch={false}`로 바꿔 해결했습니다([948840c](https://github.com/empal030110/mapleGG/commit/948840c)).
- **Neon Free 플랜의 compute 한도**: 좋아요 상태를 캐릭터 상세 페이지 SSR에서 조회하도록 만들었더니 Neon 콘솔에 "Limit reached"가 떴습니다(월 100 CU-hours 하드 컷오프, 사용량 110 CU-hrs). 테이블 하나짜리 DB가 월 110시간을 썼다는 건 compute가 거의 상시 켜져 있었다는 뜻인데, Neon은 5분간 요청이 없어야 꺼지고 Free 플랜에서는 이 설정을 바꿀 수 없습니다. Vercel Observability의 Functions 라우트별 표를 보니 12시간 동안 `/user/[name]`이 8.8K건(Active CPU 35m)인데 홈(`/`)은 186건이었습니다. 사람이라기엔 캐릭터 페이지에 지나치게 쏠린 분포라 크롤러성 트래픽으로 보고, 좋아요 상태 조회를 SSR에서 빼서 클라이언트 마운트 후 `GET /api/likes/[name]`로 가져오게 바꿨습니다([3894585](https://github.com/empal030110/mapleGG/commit/3894585)). 대부분의 크롤러는 JS를 실행하지 않아 DB를 깨우지 못합니다. 다만 User-Agent까지 확인하진 못해 원인은 정황으로 좁힌 것이고, Neon Monitoring 탭에서는 (compute가 정지된 상태라) 월 전체 분포를 확인하지 못했습니다.

기능 요구사항이 아니라 **무료 인프라의 구조**가 코드 구조를 결정한 사례들입니다.

### 2.5 E2E는 필수 게이트에서 뺀다
`e2e/character-search.spec.ts`는 실제 넥슨 API를 호출하는 골든패스 테스트입니다. 처음엔 특정 캐릭터 이름을 하드코딩했는데, 그 캐릭터가 삭제되거나 이름이 바뀌면 테스트가 영구히 깨지는 구조였습니다. [847e515](https://github.com/empal030110/mapleGG/commit/847e515)에서 메인 페이지의 "무릉도장 1위" 캐릭터를 매번 동적으로 조회해 쓰도록 바꿨지만, 그래도 넥슨 API 자체 장애에는 여전히 취약합니다. MSW 같은 모킹 레이어를 두면 완전히 없앨 수 있지만 프로젝트 규모 대비 과하다 생각했습니다. 그래서 `ci.yml`(lint → tsc → test → build)만 push/PR 필수 게이트로 두고, E2E는 `e2e.yml`로 분리해 수동 실행/매일 스케줄로만 돌립니다([5a12ee1](https://github.com/empal030110/mapleGG/commit/5a12ee1)). 완벽한 테스트보다, **깨졌을 때 원인이 코드인지 외부 API인지 구분되는 구조**를 택했습니다.

### 2.6 다국어는 UI 셸만, 쿠키 기반으로
이 서비스의 핵심 데이터(아이템명·스킬명·스탯명·등급명)는 넥슨 API(메이플스토리 한국 서버)가 전부 한국어로 내려줍니다. 번역하려면 게임 용어 매핑 테이블을 직접 만들어야 해서 현실적인 범위가 아니라고 판단했고, **UI 텍스트(메뉴/검색/에러/즐겨찾기/가이드/개인정보처리방침)만 영어를 추가**하기로 했습니다. 번역 대상은 UI로 한정하고 게임 데이터는 원문 그대로 둔다는 경계를 명확히 잡았습니다.
- **라우팅은 쿠키 기반(URL 접두사 없음)**: 표준인 `/en`, `/ko` 방식은 `app/` 아래 모든 라우트(`user/[name]`, `guild/[world]/[name]` 포함)를 `[locale]/`로 옮기고 sitemap/Capacitor 진입점까지 손대야 합니다. 한국 서버 데이터 중심이라 URL로 언어를 구분하는 SEO 이점이 작다고 보고, `next-intl`을 라우팅 없이 써서 구조를 건드리지 않았습니다([9f421df](https://github.com/empal030110/mapleGG/commit/9f421df)).
- **번역 범위는 단계적으로**: 헤더/검색/에러 같은 핵심 UI([3dba4ab](https://github.com/empal030110/mapleGG/commit/3dba4ab)) → 이용 가이드([d9a6903](https://github.com/empal030110/mapleGG/commit/d9a6903)) → 개인정보처리방침([93e89fb](https://github.com/empal030110/mapleGG/commit/93e89fb)) 순서로 넓혔습니다. 캐릭터 상세 패널(스탯/장비/스킬 등)의 내용은 게임 용어에 가까워 범위 밖으로 남겼습니다.

### 2.7 좋아요/인기 캐릭터: 첫 DB는 '합산이 필요한 기능'에만
즐겨찾기·최근 검색어는 브라우저별 데이터라 `localStorage`로 충분했지만, 인기 순위는 여러 사용자의 좋아요를 합산해야 해서 처음으로 서버 저장소가 필요해졌습니다.
- **저장소는 Neon(Postgres) + Drizzle**: 카운터/랭킹만 보면 Redis(Sorted Set)가 코드가 가장 짧았지만, 스키마 설계·마이그레이션·SQL 집계를 직접 다뤄볼 수 있고 범용성이 높은 Postgres를 택했습니다. Vercel Marketplace에서 연결하면 환경변수가 자동으로 들어가는 점도 한몫했습니다.
- **어뷰징 방지는 로그인이 아니라 IP**: 로그인 시스템은 "좋아요 버튼 하나"에 비해 스코프가 너무 크고, 계정이 없는 서비스 설계와도 어긋납니다. `(캐릭터명, IP)` 복합 기본키로 한 IP당 캐릭터별 1회를 DB가 보장하게 했고, 별도 카운터 테이블 없이 `COUNT(*) ... GROUP BY`로 수와 랭킹을 구합니다([9163639](https://github.com/empal030110/mapleGG/commit/9163639), [0c7b8a7](https://github.com/empal030110/mapleGG/commit/0c7b8a7)). 공유 IP/VPN 우회라는 한계는 감수했고, IP를 저장하므로 개인정보처리방침에 목적을 고지했습니다([00a577a](https://github.com/empal030110/mapleGG/commit/00a577a)).
- **DB 장애가 핵심 기능으로 번지지 않게**: 좋아요 조회가 실패해도 캐릭터 페이지가 죽지 않도록 실패 시 빈 상태로 처리합니다(즐겨찾기 API의 "한 캐릭터가 실패해도 나머지는 정상"과 같은 방침). DB 연결도 모듈 로드 시점이 아니라 첫 쿼리 시점에 만듭니다. 처음엔 모듈 로드 시 연결을 만들었다가 `DATABASE_URL`이 없으면 `next build`의 페이지 데이터 수집 단계에서 깨져서 지연 초기화로 바꿨습니다.

---

## 3. 결과 및 회고

### 잘한 선택
- **zod를 늦게라도 전면 도입한 것**: 처음부터 20개 스키마를 다 짜지 않고, 크래시가 실제로 반복되는 걸 확인한 뒤 도입 범위를 넓혔습니다. 결과적으로 "런타임에만 드러나는 null 필드"로 인한 크래시 커밋([0be30e2](https://github.com/empal030110/mapleGG/commit/0be30e2) 계열)이 zod 도입 이후로는 재발하지 않았습니다.
- **동시성 제한을 라이브러리 없이 워커 풀 12줄로 해결**: `runLimited.ts`는 별도 큐 라이브러리 없이 필요한 만큼만 구현했고, 이후 즐겨찾기 API route에도 그대로 재사용됐습니다.
- **인프라 제약을 코드에 흡수**: Vercel 무료 티어의 함수 개수/이미지 최적화/Fluid CPU와 Neon Free의 compute 한도 이슈를 그때그때 구조를 바꿔 흡수했습니다. 모두 "기능"이 아니라 "운영 비용"의 이슈였는데, 커밋 로그에 원인이 남아 있어 나중에 플랫폼을 바꾸거나 유료 티어로 올릴 때 왜 이런 처리가 있는지 추적 가능합니다.
- **원인을 추측이 아니라 라우트별 수치로 좁힌 것**: Neon 한도를 소진했을 때 DB 쪽 지표에 매달리지 않고, 요청이 출발하는 Vercel Observability의 라우트별 invocations/Active CPU를 먼저 봤습니다. `/user/[name]`이 압도적이라는 걸 확인한 뒤에 고쳤기 때문에, 짐작으로 캐싱이나 DB 설정을 건드리지 않았습니다.

### 아쉬운 점 / 다음에 고칠 것
- **E2E의 실데이터 의존은 여전히 남아있는 리스크**입니다. 캐릭터 이름 하드코딩은 없앴지만, 넥슨 API 장애 시 CI 없이도 실패할 수 있는 구조라 실패 원인을 사람이 매번 판단해야 합니다.
- **`UserInfoTabs`의 40개 prop drilling을 6개 Panel로 나눈 리팩터([525515a](https://github.com/empal030110/mapleGG/commit/525515a))는 더 일찍 했어야 하는 리팩터**입니다. 탭이 하나씩 늘어날 때마다 부모 컴포넌트에 prop이 쌓이는 걸 알면서도 기능을 먼저 채웠고, 결국 40개가 된 뒤에야 정리했습니다. 다음 프로젝트에서는 탭 3개를 넘는 시점에 바로 Panel 분리를 할 것 같습니다.
- **`apiUrl.ts`의 URL 빌더 13개를 `withOcid` 팩토리로 통합한 것도 같은 패턴의 뒤늦은 정리([00780b0](https://github.com/empal030110/mapleGG/commit/00780b0))**입니다. "ocid 하나만 받아서 쿼리스트링 붙이는" 반복이 13번 쌓인 뒤에야 팩토리 함수로 뽑았습니다.
- **디자인 리소스 없이 혼자 UI까지 결정**하다 보니 세트효과 팝업 UI 하나를 두고도 클릭→호버, 스크롤 여부, 자동 닫힘 등으로 여러 번 왔다갔다했습니다([25e548a](https://github.com/empal030110/mapleGG/commit/25e548a), [9e18955](https://github.com/empal030110/mapleGG/commit/9e18955), [ce84111](https://github.com/empal030110/mapleGG/commit/ce84111)). 작은 UI라도 초기에 한 번 더 검토했다면 커밋 수를 줄일 수 있었을 것 같습니다.
- **DB 조회를 SSR 경로에 먼저 넣은 것**: 좋아요 상태를 캐릭터 페이지 SSR에서 가져오는 게 가장 단순해 보여 그렇게 만들었는데, 크롤러성 트래픽까지 전부 DB 쿼리가 된다는 걸 고려하지 못했고 Free 플랜 한도(월 100 CU-hours, 5분 idle 후 suspend)도 배포 전에 따져보지 않았습니다. 한도를 소진한 뒤에야 알아차렸고, 이후엔 DB를 쓰는 기능이라면 "SSR 경로에 넣어도 되는가"부터 확인할 생각입니다.
- **Vercel Active CPU는 여전히 남은 과제**: 좋아요 조회를 클라이언트로 옮겨도 `/user/[name]` SSR 자체가 쓰는 CPU(12시간에 약 35분, 대부분 이 라우트)는 그대로입니다. 이 속도가 한 달 이어지면 Hobby 월 포함량(4시간)을 크게 넘는 계산이라, 페이지 캐싱이 가능한지 확인해볼 필요가 있습니다.

### 회고 한 줄
기능을 먼저 굴리고 반복되는 패턴이 눈에 보일 때 리팩터링하는 방식이 전반적으로는 맞았지만, prop drilling·URL 빌더처럼 "늘어나는 게 뻔히 보이는" 패턴은 3번째 반복 시점에 바로 추상화하는 게 더 나았을 것 같습니다.

---

## 4. 컴포넌트 설계 방식

### 4.1 페이지는 데이터를 만들고, 컴포넌트는 받은 데이터만 그린다
`app/user/[name]/page.tsx`가 서버에서 20개 API를 병렬로 호출하고, 그 원본 응답을 [`utils/mapUserData.ts`](app/user/[name]/utils/mapUserData.ts)라는 순수 함수에 넘겨 화면용 데이터로 가공합니다. 가공 로직을 `page.tsx`에 그대로 두지 않고 순수 함수로 뽑아둔 이유는 **유닛 테스트가 가능해지기 때문**입니다([7ac08c0](https://github.com/empal030110/mapleGG/commit/7ac08c0)). 컴포넌트는 이미 가공이 끝난 데이터를 props로만 받고, API 응답 형태를 알 필요가 없습니다.

### 4.2 탭이 많은 화면은 "전환 컴포넌트"와 "내용 컴포넌트"를 분리한다
캐릭터 상세 페이지는 탭이 6개입니다. 초기엔 `UserInfoTabs` 하나가 모든 탭의 데이터를 props로 받아 활성 탭에 따라 골라 그리는 구조였는데, 탭이 늘 때마다 이 컴포넌트의 prop 개수가 같이 늘어 결국 40개까지 쌓였습니다. [525515a](https://github.com/empal030110/mapleGG/commit/525515a)에서 탭별로 `UserEquipmentPanel`/`UserStatPanel`/`UserSkillPanel`/`UserUnionPanel`/`UserCodiPanel`/`UserEtcPanel` 6개를 만들어 각자 필요한 데이터만 받게 하고, `UserInfoTabs`는 이렇게 완성된 패널들(`ReactNode[]`)을 받아 `activeTab` 인덱스로 하나만 렌더링하는 역할만 남겼습니다.

```tsx
// UserInfoTabs.tsx — 탭 전환 UI만 담당, panels는 이미 완성된 패널
export default function UserInfoTabs({ panels }: { panels: React.ReactNode[] }) {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className="w-full z-10">
            <UserNavbar tabs={TABS} active={activeTab} onSelect={setActiveTab} />
            {panels[activeTab]}
        </div>
    );
}
```

"전환 로직"과 "탭별 데이터 의존성"을 한 컴포넌트에 같이 두지 않는 게 핵심입니다. 새 탭이 추가돼도 `UserInfoTabs` 자체는 손댈 일이 없습니다.

### 4.3 반복되는 UI 패턴은 공용 컴포넌트로, 단 실제로 반복된 뒤에
- **`PresetTabs`**: 어빌리티/장비/하이퍼스탯/유니온/코디 프리셋 전환이 각 컴포넌트마다 따로 구현돼 있다가, 패턴이 5곳에서 반복된 뒤 `count`/`active`/`onSelect`/`labelPrefix`/`fullWidth` 5개 props로 일반화한 공용 컴포넌트로 뽑았습니다.
- **`NotInfoText`**: "정보 없음" 안내 문구가 스킬/링크스킬/유니온 등 여러 탭에서 제각각 마크업으로 반복되다가 [156c715](https://github.com/empal030110/mapleGG/commit/156c715)에서 하나로 통합했습니다.
- **`PageLoader`**: 중복된 `loading.tsx` 2개를 공용 컴포넌트로 통합했습니다([579ffcc](https://github.com/empal030110/mapleGG/commit/579ffcc)).

세 경우 모두 먼저 각자 구현해서 화면에 반영한 뒤, 같은 모양이 반복되는 게 확인된 시점에 공용화했습니다. 처음부터 공용 컴포넌트를 설계하지 않은 이유는, 탭마다 요구사항이 미묘하게 다를 수 있는 상태에서 너무 이른 추상화는 오히려 props가 계속 늘어나는 역효과를 내기 때문입니다.

### 4.4 도메인 로직은 컴포넌트 밖으로
등급별 색상(`gradeColor.ts`), 옵션명 축약(`cutOptionName.ts`), 특수 반지 판별(`isSpecialRing`, [d209c8b](https://github.com/empal030110/mapleGG/commit/d209c8b)) 같은 로직은 컴포넌트 안에 삼항연산자/분기로 흩어져 있다가 각각 유틸 함수로 뽑혔습니다([68f1cff](https://github.com/empal030110/mapleGG/commit/68f1cff), [768462f](https://github.com/empal030110/mapleGG/commit/768462f)). 컴포넌트는 "이 아이템의 등급이 무엇인가"를 판단하지 않고 `gradeColor(grade)`를 호출하기만 합니다. — 판단 로직이 한 곳에 있어야 등급 색상 규칙이 바뀔 때 한 곳만 고치면 됩니다.

### 4.5 상태는 클라이언트 컴포넌트에 최소한으로만
프리셋 전환처럼 순수하게 화면 상태인 것(`useState`)과, 즐겨찾기·최근 검색어처럼 세션을 넘어 유지돼야 하는 것(`zustand` + `localStorage`)을 구분합니다. 서버로 보낼 필요가 없는 개인화 데이터는 서버 상태로 만들지 않고 클라이언트에만 둡니다 — 계정 시스템이 없는 서비스 특성상 서버에 저장할 이유도, 저장할 곳도 없기 때문입니다. 예외가 좋아요입니다. 여러 사용자의 값을 합산해야 해서 이것만 DB(Neon)에 두고, 그 상태를 읽는 것도 SSR이 아니라 클라이언트 마운트 후에 합니다(2.4 참고).

### 4.6 표시 문자열과 로직 키를 분리한다 (다국어를 붙이며 드러난 문제)
`InformationBox`는 제목 문자열이 `"공지사항"`인지 비교해서 "더보기" 링크(공지/업데이트)를 골랐습니다. 제목을 번역하는 순간 이 비교가 깨지므로, 표시용 `title`과 분기용 `kind: "notice" | "update"`를 별도 props로 나눴습니다([2946933](https://github.com/empal030110/mapleGG/commit/2946933)). 같은 이유로 `UserInfoTabs`의 탭 이름도 문자열 배열이 아니라 키 배열(`TAB_KEYS`)로 두고 렌더링 시점에 번역합니다([e6e821a](https://github.com/empal030110/mapleGG/commit/e6e821a)). 서버 컴포넌트는 `getTranslations`, 클라이언트 컴포넌트는 `useTranslations`를 쓰고, 문장 안에 링크나 강조가 들어가는 경우에만 `t.rich`를 씁니다.
