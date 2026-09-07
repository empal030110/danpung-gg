## 단풍지지 (danpung-gg)

메이플스토리 넥슨 오픈 API를 활용한 캐릭터·길드 정보 검색 서비스입니다. 캐릭터 이름만 검색하면 스탯, 장비, 유니온, 업적, 랭킹 정보를 한 번에 확인할 수 있고, 길드명으로는 길드원 목록과 노블레스 스킬 현황을 조회할 수 있습니다. PWA와 Capacitor 기반 iOS/Android 앱으로도 제공됩니다.

### 서비스
- 웹: `https://www.danpung.shop`
- 앱: Capacitor로 감싼 iOS/Android 네이티브 앱 (원격 URL 모드로 위 웹 서비스를 그대로 로드)

---

## 기술 스택
- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript
- **UI**: Tailwind CSS v4 (커스텀 브레이크포인트 `pc: 940px`)
- **State**: Zustand (즐겨찾기/최근 검색어, `localStorage` 영속화)
- **Test**: Vitest (순수 함수 유닛 테스트)
- **CI**: GitHub Actions (`lint` → `tsc --noEmit` → `test`, push/PR마다 실행)
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
    formatExpireDate.ts        # 만료일 포맷팅
    gradeColor.ts              # 등급별 텍스트 색상 매핑
    url/apiUrl.ts              # 엔드포인트 생성기 (랭킹/캐릭터/유니온/길드/공지 등)
  app/
    (main)/page.tsx            # 메인: 랭킹 TOP 3 + 공지/업데이트, 검색바
    (main)/components/         # RankBox, InformationBox
    user/[name]/page.tsx       # 캐릭터 상세 페이지 (SSR, API 병렬 조회 → mapUserData로 가공)
    user/[name]/utils/mapUserData.ts  # 넥슨 API 원본 응답 20종 → 화면용 데이터로 가공하는 순수 함수 (유닛 테스트 대상)
    user/[name]/components/    # UserHeader/UserBasicStat/UserItem/UserSkill/UserUnion/ItemDetailModal 등 섹션 컴포넌트
    user/userProps/props.ts    # 상세 페이지 타입 정의
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
    NotInfoText.tsx, ErrorPage.tsx, UserErrorPage.tsx, GuildErrorPage.tsx
    ServiceWorkerRegister.tsx    # App Router용 수동 서비스워커 등록
    header/                      # NavBar, HeaderSearchBar, ThemeBtn
  hooks/
    useCharacterSearch.ts        # 검색창 입력/제출 로직
    useSearchDropdown.ts         # 최근 검색어·즐겨찾기 드롭다운 열림/닫힘 로직
  store/
    useFavoriteStore.ts          # 즐겨찾기 (zustand + localStorage)
    useRecentSearchStore.ts      # 최근 검색어 (zustand + localStorage)
  public/
    manifest.json, icons/, main/header.png, danpungGG.png 등
  resources/                     # Capacitor 앱 아이콘/스플래시 원본 이미지
  ios/, android/                 # Capacitor 네이티브 프로젝트 (원격 URL 모드)
  .github/workflows/ci.yml       # lint/타입체크/테스트 CI
  capacitor.config.ts
  next.config.ts                 # 이미지 도메인, 이미지 최적화 비활성화(Vercel 무료 한도 보호), PWA 구성
  vitest.config.mts
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
npm test          # Vitest 유닛 테스트
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
`.github/workflows/ci.yml`이 `main`/`master` push와 모든 PR에서 `lint` → `tsc --noEmit` → `test`를 순서대로 실행합니다. 넥슨 API 키가 필요한 `build`는 시크릿 설정 부담을 피하기 위해 CI 대상에서 제외했습니다.

---

## 테스트
Vitest를 사용합니다. 현재는 캐릭터 상세 페이지의 데이터 가공 로직인 `app/user/[name]/utils/mapUserData.ts`(`mapUserPageData`)에 대해, 심볼 분류·프리셋 폴백·유니온 null 처리 등 핵심 분기를 커버하는 유닛 테스트가 있습니다 (`app/user/[name]/utils/mapUserData.test.ts`).

```bash
npm test
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
- 타입: 캐릭터 상세 페이지 타입은 `app/user/userProps/props.ts`, 길드 페이지 타입은 `app/guild/guildProps/props.ts`에 정의되어 있습니다.
- UI/상태: 프리셋 전환(어빌리티/장비/하이퍼스탯/유니온/코디 등)은 클라이언트 컴포넌트에서 `useState` + `PresetTabs` 공용 컴포넌트로 처리합니다.
- 즐겨찾기/최근검색어: `store/`의 zustand 스토어가 `localStorage`에 영속화하며 서버로 전송하지 않습니다.
- 이미지: 캐릭터/장비 아이콘은 넥슨 API가 이미 적정 크기로 내려주므로 `next.config.ts`에서 이미지 최적화를 비활성화(`unoptimized: true`)해 Vercel 무료 변환 한도를 보호합니다.
- 다크모드: `components/header/ThemeBtn.tsx`에서 `document.documentElement`에 `dark` 클래스를 토글.
- 반응형: Tailwind 커스텀 브레이크포인트 `pc`(940px)를 기준으로 모바일/데스크탑 레이아웃을 분기합니다.

---

## 알려진 제한사항
- 유닛 테스트는 `mapUserPageData` 위주로만 있고, `lib/`의 다른 순수 함수(`cutOptionName`, `formatStatValue` 등)와 컴포넌트 레벨 테스트는 아직 없습니다.
- CI에 `build` 단계가 없어 빌드 타임 오류는 로컬/배포 시점에만 확인됩니다.
