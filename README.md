## 단풍지지 (danpung-gg)

메이플스토리 넥슨 오픈 API를 활용한 캐릭터·길드 정보 검색 서비스입니다. 캐릭터 이름만 검색하면 스탯, 장비, 유니온, 업적, 랭킹 정보를 한 번에 확인할 수 있고, 길드명으로는 길드원 목록과 노블레스 스킬 현황을 조회할 수 있습니다. PWA와 Capacitor 기반 iOS/Android 앱으로도 제공됩니다.

### 서비스
- 웹: `https://www.danpung.shop`
- 앱: Capacitor로 감싼 iOS/Android 네이티브 앱 (원격 URL 모드로 위 웹 서비스를 그대로 로드)

---

## 기술 스택
- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript
- **Validation**: Zod (넥슨 API 응답 20종 런타임 검증)
- **UI**: Tailwind CSS v4 (커스텀 브레이크포인트 `pc: 940px`)
- **State**: Zustand (즐겨찾기/최근 검색어, `localStorage` 영속화)
- **Test**: Vitest(유닛/컴포넌트) + Testing Library + jsdom, Playwright(E2E)
- **CI**: GitHub Actions
  - `ci.yml`: `lint` → `tsc --noEmit` → `test`, push/PR마다 실행 (필수 게이트)
  - `e2e.yml`: Playwright E2E, 수동 실행/매일 스케줄로만 실행 (실제 넥슨 API 의존이라 필수 게이트 아님)
- **PWA**: next-pwa + 수동 서비스워커 등록 (App Router는 자동 등록 스크립트를 넣어주지 않아 `ServiceWorkerRegister` 컴포넌트로 직접 등록)
- **Native App**: Capacitor 8 (iOS/Android) — 정적 export가 아닌 `server.url` 원격 모드 (서버 사이드 API 키를 쓰는 구조라 웹 서버를 그대로 로드)
- **Analytics/Ads**: @vercel/analytics, Google AdSense
- **Icons/UX**: react-icons, react-spinners

---

## 주요 기능

### 캐릭터 검색 (`/user/[name]`)
6개 탭으로 구성됩니다.
- **장비**: 장비 프리셋 1·2·3, 세트효과, 스타포스(강화 주문서 사용 시 별 색상 변경), 잠재/에디셔널 옵션, 아이템 클릭 시 상세 정보 모달, 심볼(아케인/어센틱), 어빌리티(프리셋 1·2·3), 안드로이드, 칭호(타이틀 상세 모달)
- **스탯**: 기본 스탯 / 상세 스탯 / 하이퍼 스탯(프리셋 1·2·3)
- **스킬**: HEXA 스탯 코어, 5차/6차 스킬, 장착 링크 스킬(프리셋 자동 판별)
- **유니온**: 유니온 레벨/등급, 챔피언 배치, 아티팩트 효과, 공격대원 효과(프리셋 전환)
- **코디**: 장착 코디, 코디 프리셋 1·2·3
- **기타**: 업적 등급/점수, 무릉도장 최고 기록 (당일 데이터 미집계 시 전날 데이터로 자동 재시도)
- 즐겨찾기 등록 버튼, 검색 시 최근 검색어 자동 기록

### 길드 검색 (`/guild`, `/guild/[world]/[name]`)
- 월드(서버) + 길드명으로 길드 상세 페이지 조회
- 길드 마크, 기본 정보, 길드원 목록(이름 검색/정렬, 내부 스크롤)
- 노블레스 스킬 보유 현황

### 즐겨찾기 (`/favorites`)
- 즐겨찾기에 등록한 캐릭터를 카드 목록으로 모아 보여주는 대시보드
- `app/api/favorites/route.ts`에서 캐릭터별로 최신 레벨/전투력 등을 조회해 요약 정보 제공 (한 캐릭터 조회가 실패해도 나머지는 정상 처리)

### 메인 대시보드 (`/`)
- 무릉도장/더시드/업적 랭킹 1위 하이라이트
- 공지사항/업데이트 목록
- 검색창 클릭 시 최근 검색어·즐겨찾기 드롭다운

### 기타
- 이용 가이드 (`/guide`)
- 라이트/다크 테마 토글
- 개인정보처리방침 (`/privacy`)

---

## 프로젝트 구조
```
mapleGG/
  lib/
    getDate.ts                 # 날짜 유틸 (KST 기준 오늘/어제)
    key.ts                     # Nexon Open API Key (환경변수에서 로드)
    ssrFetcher.ts              # 서버사이드 fetch 래퍼 (API 키 헤더 + 429 지수 백오프 재시도 + 1시간 캐시)
    ssrRankingFetcher.ts       # 랭킹류 조회 래퍼 (당일 데이터 미집계 시 전날 날짜로 자동 재시도)
    runLimited.ts              # 동시 실행 개수를 제한하며 여러 비동기 작업을 처리하는 워커 풀 (429 회피)
    cutOptionName.ts           # 옵션명 축약 (보스 몬스터 데미지 → 보공 등)
    formatStatValue.ts         # 스탯 숫자 포맷팅
    formatExpireDate.ts        # 만료일 포맷팅 (KST 오전/오후를 직접 계산 — Intl의 ICU 버전 의존성 회피)
    gradeColor.ts              # 등급별 텍스트/테두리/배경 색상 매핑
    url/apiUrl.ts              # 엔드포인트 생성기 (랭킹/캐릭터/유니온/길드/공지 등)
  app/
    (main)/page.tsx            # 메인: 랭킹 TOP 3 + 공지/업데이트, 검색바
    (main)/components/         # RankBox, InformationBox
    user/[name]/page.tsx       # 캐릭터 상세 페이지 (SSR, API 병렬 조회 → mapUserData로 가공)
    user/[name]/utils/mapUserData.ts  # 넥슨 API 원본 응답 20종 → 화면용 데이터로 가공하는 순수 함수 (유닛 테스트 대상)
    user/[name]/utils/filterItem.ts   # 장비/안드로이드/칭호를 슬롯 기준으로 필터링 (오버로드 시그니처)
    user/[name]/components/    # UserHeader/UserBasicStat/UserItem/UserSkill/UserUnion/ItemDetailModal 등 섹션 컴포넌트
    user/userProps/props.ts       # 상세 페이지 타입 정의 (대부분 zod 스키마에서 z.infer로 추출)
    user/userProps/itemSchema.ts  # 장비/안드로이드/칭호 zod 스키마
    user/userProps/rawSchemas.ts  # 나머지 19개 엔드포인트 원본 응답 zod 스키마
    guild/page.tsx              # 길드 검색 폼
    guild/[world]/[name]/page.tsx  # 길드 상세 페이지 (SSR)
    guild/[world]/[name]/components/  # GuildHeader, GuildMemberList, GuildNobleSkillList
    guild/guildProps/props.ts   # 길드 페이지 타입 정의
    favorites/page.tsx          # 즐겨찾기 대시보드
    favorites/components/       # FavoritesClient, FavoriteCard
    api/favorites/route.ts      # 즐겨찾기 캐릭터 요약 조회 API (동시성 제한 + 부분 실패 허용)
    guide/page.tsx               # 이용 가이드
    privacy/page.tsx             # 개인정보처리방침
    layout.tsx                  # 글로벌 레이아웃/메타/PWA·서비스워커/광고 스크립트
    robots.ts, sitemap.ts
    globals.css                 # Tailwind 4 전역 스타일, 커스텀 브레이크포인트 정의
  components/
    Header.tsx, SearchBar.tsx, SearchForm.tsx, SearchDropdown.tsx, GuildSearchBar.tsx
    PresetTabs.tsx               # 프리셋 전환 공용 탭 컴포넌트
    NotInfoText.tsx, ErrorPage.tsx, ErrorInfoPage.tsx, PageLoader.tsx
    ServiceWorkerRegister.tsx    # App Router용 수동 서비스워커 등록
    header/                      # NavBar, HeaderSearchBar, ThemeBtn
  hooks/
    useCharacterSearch.ts        # 검색창 입력/제출 로직
    useSearchDropdown.ts         # 최근 검색어·즐겨찾기 드롭다운 열림/닫힘 로직
    useEscapeClose.ts            # 모달 Escape 닫기 + 배경 스크롤 잠금 (ItemDetailModal/TitleDetailModal 공용)
  store/
    useFavoriteStore.ts          # 즐겨찾기 (zustand + localStorage)
    useRecentSearchStore.ts      # 최근 검색어 (zustand + localStorage)
  e2e/
    character-search.spec.ts     # Playwright 골든패스 E2E (검색 → 상세 → 탭 전환 → 즐겨찾기 → 에러 페이지)
  public/
    manifest.json, icons/, main/header.png, danpungGG.png 등
  resources/                     # Capacitor 앱 아이콘/스플래시 원본 이미지
  ios/, android/                 # Capacitor 네이티브 프로젝트 (원격 URL 모드)
  .github/workflows/
    ci.yml                       # lint/타입체크/테스트 (필수 게이트)
    e2e.yml                      # Playwright E2E (수동 실행/매일 스케줄)
  capacitor.config.ts
  next.config.ts                 # 이미지 도메인, 이미지 최적화 비활성화(Vercel 무료 한도 보호), PWA 구성
  vitest.config.mts, vitest.setup.ts   # 컴포넌트/훅 테스트만 jsdom, 나머지는 node 환경
  playwright.config.ts
  tsconfig.json, eslint.config.mjs, tailwind/postcss 설정
```

---

## 라우트 개요
- `/` 메인 대시보드
- `/user/[name]` 캐릭터 상세
- `/guild` 길드 검색
- `/guild/[world]/[name]` 길드 상세
- `/favorites` 즐겨찾기 대시보드
- `/guide` 이용 가이드
- `/privacy` 개인정보처리방침

---

## Nexon Open API 연동
모든 API 호출은 서버 컴포넌트/라우트 핸들러에서 수행되며, 헤더에 `x-nxopen-api-key`를 포함합니다.

- 키 위치: `lib/key.ts` (환경변수 `NX_OPEN_API_KEY`)
- 공통 fetch: `lib/ssrFetcher.ts` — 1시간 캐시(`revalidate: 3600`), HTTP 429 시 지수 백오프 + 지터로 최대 4회 재시도
- 동시성 제어: `lib/runLimited.ts` — 여러 API를 병렬 호출하되 동시 실행 개수를 3개로 제한하는 워커 풀 (한꺼번에 쏘면 캐릭터에 따라 429가 나던 문제 회피)
- 랭킹류 fetch: `lib/ssrRankingFetcher.ts` — 당일 데이터가 아직 집계 전(`OPENAPI00009`)이면 전날 날짜로 자동 재시도
- 엔드포인트 조립: `lib/url/apiUrl.ts`

**성능**: 캐릭터 상세 페이지는 ocid 조회 이후 나머지 20개 API 호출을 서로 독립적으로 `runLimited`로 병렬 요청합니다(동시 3개 제한, 순차 요청 대비 응답 시간 대폭 단축). 즐겨찾기 요약 조회도 동일한 방식으로 캐릭터별 요청을 동시 3개까지 처리합니다.

**검증**: 원본 응답 20종은 전부 `app/user/userProps/itemSchema.ts` / `rawSchemas.ts`의 zod 스키마로 파싱합니다. 넥슨 API가 값이 없는 필드를 `undefined`가 아니라 명시적 `null`로 내려주는 경우가 많아(예: 잠재옵션 없는 아이템, 미가입 유니온) 전 필드를 `nullish()`로 받고, 실제 API 응답으로 검증한 뒤에 붙였습니다.

---

## 실행 방법
사전 준비: Node 20+ 권장, npm

1) 의존성 설치
```bash
npm install
```

2) Nexon Open API Key 설정
- `.env.example`을 `.env.local`로 복사한 뒤 `NX_OPEN_API_KEY=...` 값을 본인 키로 교체
- `.env.local`은 `.gitignore`에 포함되어 커밋되지 않습니다

3) 개발 서버
```bash
npm run dev
# http://localhost:3000
```

4) 테스트/린트/타입체크
```bash
npm test          # Vitest 유닛/컴포넌트 테스트
npm run test:e2e   # Playwright E2E (dev 서버가 안 떠있으면 자동으로 띄움)
npm run lint       # ESLint
npx tsc --noEmit   # 타입 체크
```

5) 프로덕션 빌드/실행
```bash
npm run build
npm start
```

---

## CI
- **`.github/workflows/ci.yml`** (필수 게이트): `main`/`master` push와 모든 PR에서 `lint` → `tsc --noEmit` → `test`를 순서대로 실행합니다. 넥슨 API 키가 필요한 `build`는 시크릿 설정 부담을 피하기 위해 이 워크플로 대상에서 제외했습니다.
- **`.github/workflows/e2e.yml`** (수동/스케줄): Playwright E2E는 실제 넥슨 API와 랭킹 1위 캐릭터라는 살아있는 데이터에 의존해 깨지기 쉬운 테스트라, push/PR을 막는 필수 게이트에 넣지 않았습니다. `workflow_dispatch`(수동 실행)와 매일 스케줄로만 돌고, 실패 시 `playwright-report`를 아티팩트로 남깁니다. 저장소 시크릿에 `NX_OPEN_API_KEY`가 있어야 동작합니다.

---

## 테스트
순수 로직 → 상태관리 → API route → 컴포넌트/훅 → E2E까지 계층별로 갖춰져 있습니다.

| 계층 | 도구 | 대상 |
|---|---|---|
| 순수 로직 | Vitest (node 환경) | `lib/*`, `app/user/userProps/itemSchema.ts`·`rawSchemas.ts`(zod 스키마), `app/user/[name]/utils/mapUserData.ts`·`filterItem.ts` |
| 상태관리 | Vitest | `store/useFavoriteStore.ts`, `store/useRecentSearchStore.ts` |
| API route | Vitest | `app/api/favorites/route.ts` (`ssrFetcher`만 모킹, `runLimited`는 실제 사용) |
| 컴포넌트/훅 | Vitest + Testing Library + jsdom | `hooks/useCharacterSearch.ts`·`useSearchDropdown.ts`, `PresetTabs`·`SearchForm`·`FavoriteButton` 등 (파일 상단에 `// @vitest-environment jsdom` 지정, 나머지는 기본 node 환경 유지) |
| E2E | Playwright | `e2e/character-search.spec.ts` — 검색 → 상세 페이지 탭 전환 → 즐겨찾기 추가/반영 → 존재하지 않는 캐릭터 에러까지, 실제 dev 서버 + 실제 넥슨 API로 검증 |

zod 스키마와 `getDate`/`formatExpireDate` 등은 실제 API 응답이나 KST 자정 경계처럼 놓치기 쉬운 케이스를 실제로 재현해서 테스트로 고정했습니다 (예: 잠재옵션 없는 아이템이 `undefined`가 아니라 `null`로 오는 것, `Intl.DateTimeFormat('ko-KR', {hour12:true})`가 Node ICU 버전에 따라 "오후"/"PM"으로 갈리는 것).

```bash
npm test           # 유닛/컴포넌트 테스트
npm run test:e2e    # E2E (Playwright)
```

---

## PWA 설정
- 플러그인: `next-pwa` (`public/sw.js`, `public/manifest.json` 자동 생성)
- App Router는 next-pwa의 등록 스크립트가 자동으로 안 들어가서, `components/ServiceWorkerRegister.tsx`(클라이언트 컴포넌트)가 `app/layout.tsx`에서 직접 `navigator.serviceWorker.register('/sw.js')` 호출
- 개발환경: PWA 비활성화 (`next.config.ts`의 `disable: process.env.NODE_ENV === "development"`)

---

## 모바일 앱 (Capacitor)
- 번들 ID: `shop.danpung.app`
- `capacitor.config.ts`에서 `server.url: 'https://www.danpung.shop'`로 **원격 URL 모드** 사용 (정적 export 아님 — 서버 사이드에서 API 키를 쓰는 구조라 웹 서버를 그대로 로드해야 함)
- iOS: `ios/App/App.xcodeproj` (Xcode로 빌드, SPM 기반)
- Android: `android/` (Android Studio 또는 `./gradlew` 로 빌드, Release 서명은 `android/keystore.properties` 필요·gitignore 처리됨)
- 아이콘/스플래시 원본: `resources/` (`npx capacitor-assets generate`로 재생성)

빌드 시 Node 22, Java 21 필요 (Capacitor 8 CLI/Android Gradle 요구사항).

---

## 코드 가이드/패턴
- 데이터 정규화: `ssrFetcher`는 응답을 항상 배열(`data[]`) 형태로 반환합니다.
- 데이터 가공 분리: 캐릭터 상세 페이지처럼 API 응답을 여러 형태로 가공해야 하는 경우, `page.tsx`에 두지 않고 `utils/mapUserData.ts` 같은 순수 함수로 분리해 유닛 테스트가 가능하게 합니다.
- 날짜 유틸: `getToDate()` / `getYdayDate()`는 KST 기준 오늘/어제, 랭킹 API 쿼리에 사용됩니다.
- 타입: 캐릭터 상세 페이지 타입은 `app/user/userProps/props.ts`, 길드 페이지 타입은 `app/guild/guildProps/props.ts`에 정의되어 있습니다. 넥슨 API 응답과 1:1로 대응되는 타입(아이템/스탯/스킬 등)은 손으로 쓰지 않고 zod 스키마에서 `z.infer`로 추출합니다 — camelCase 변환처럼 원본과 모양이 달라지는 것만 예외적으로 인터페이스를 직접 씁니다.
- UI/상태: 프리셋 전환(어빌리티/장비/하이퍼스탯/유니온/코디 등)은 클라이언트 컴포넌트에서 `useState` + `PresetTabs` 공용 컴포넌트로 처리합니다.
- 즐겨찾기/최근검색어: `store/`의 zustand 스토어가 `localStorage`에 영속화하며 서버로 전송하지 않습니다.
- 이미지: 캐릭터/장비 아이콘은 넥슨 API가 이미 적정 크기로 내려주므로 `next.config.ts`에서 이미지 최적화를 비활성화(`unoptimized: true`)해 Vercel 무료 변환 한도를 보호합니다.
- 다크모드: `components/header/ThemeBtn.tsx`에서 `document.documentElement`에 `dark` 클래스를 토글.
- 반응형: Tailwind 커스텀 브레이크포인트 `pc`(940px)를 기준으로 모바일/데스크탑 레이아웃을 분기합니다.

---

## 알려진 제한사항
- **`UserInfoTabs.tsx` prop drilling**: 6개 탭 콘텐츠를 하나의 컴포넌트가 40개 prop으로 받아 그대로 자식에 흩뿌립니다. 도메인 자체가 복잡한 탓도 있지만, Context나 children 슬롯 패턴으로 줄일 여지가 있습니다.
- **접근성**: `SearchDropdown`의 최근검색/즐겨찾기 목록 항목이 `<div onClick>`이라 키보드로 선택할 수 없습니다. 일부 아이콘 이미지에 의미 있는 `alt`가 빠져 있습니다.
- **매직 스트링**: 등급명(`'레전드리'`, `'유니크'`...), 장비 슬롯명(`'모자'`, `'상의'`...) 같은 도메인 문자열이 여러 파일에 그대로 하드코딩되어 있어 오타로 인한 버그 위험이 있습니다.
- **코드 스타일 일관성**: 탭/스페이스 들여쓰기, 세미콜론 유무가 파일마다 섞여 있습니다. Prettier 같은 자동 포매터가 아직 없습니다.
- **E2E의 실데이터 의존**: `e2e/character-search.spec.ts`가 "종합랭킹 1위 캐릭터"라는 실제 프로덕션 데이터 한 명에 의존합니다. 그 캐릭터의 랭킹/장비 구성이 바뀌거나 넥슨 API가 잠깐 장애가 나면 테스트가 실패할 수 있어, 필수 게이트가 아닌 수동/스케줄 워크플로로만 돌립니다 (자세한 내용은 위 CI 섹션 참고).
- CI에 `build` 단계가 없어 빌드 타임 오류(예: ESLint의 `no-unused-vars`)는 로컬 `npm run build`나 배포 시점에만 걸러집니다.
