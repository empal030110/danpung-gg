## 단풍지지 (danpung-gg)

메이플스토리 넥슨 오픈 API를 활용한 캐릭터 정보 검색 서비스입니다. 캐릭터 이름만 검색하면 스탯, 장비, 유니온, 업적, 랭킹 정보를 한 번에 확인할 수 있으며, PWA와 Capacitor 기반 iOS/Android 앱으로도 제공됩니다.

### 서비스
- 웹: `https://www.danpung.shop`
- 앱: Capacitor로 감싼 iOS/Android 네이티브 앱 (원격 URL 모드로 위 웹 서비스를 그대로 로드)

---

## 기술 스택
- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript
- **UI**: Tailwind CSS v4 (커스텀 브레이크포인트 `pc: 940px`)
- **State**: Zustand (즐겨찾기/최근 검색어, `localStorage` 영속화)
- **PWA**: next-pwa + 수동 서비스워커 등록 (App Router는 자동 등록 스크립트를 넣어주지 않아 `ServiceWorkerRegister` 컴포넌트로 직접 등록)
- **Native App**: Capacitor 8 (iOS/Android) — 정적 export가 아닌 `server.url` 원격 모드 (서버 사이드 API 키를 쓰는 구조라 웹 서버를 그대로 로드)
- **Analytics/Ads**: @vercel/analytics, Google AdSense
- **Icons/UX**: react-icons, react-spinners

---

## 주요 기능

### 캐릭터 검색 (`/user/[name]`)
- 기본 정보: 직업, 서버, 레벨, 길드, 생성일, 종합/월드 랭킹, 인기도, 전투력
- 스탯: 기본 스탯 / 상세 스탯 / 하이퍼 스탯(프리셋 1·2·3) / HEXA 스탯
- 장비: 장비 프리셋 1·2·3, 세트효과, 스타포스, 잠재/에디셔널 옵션
- 어빌리티: 프리셋 1·2·3 전환
- 심볼: 아케인/어센틱 심볼
- 스킬: 5차/6차 스킬, 장착 링크 스킬(프리셋 자동 판별)
- 유니온: 유니온 레벨/등급, 유니온 공격대원 효과(프리셋 전환), 챔피언 배치, 아티팩트 효과
- 코디: 장착 코디, 코디 프리셋 1·2·3
- 펫, 안드로이드, 칭호
- 업적 랭킹, 무릉도장 랭킹 (당일 데이터 미집계 시 전날 데이터로 자동 재시도)
- 즐겨찾기 / 최근 검색어 (로컬 저장, 서버 전송 없음)

### 메인 대시보드 (`/`)
- 무릉도장/더시드/업적 랭킹 1위 하이라이트
- 공지사항/업데이트 목록

### 기타
- 라이트/다크 테마 토글
- 개인정보처리방침 (`/privacy`)

---

## 프로젝트 구조
```
mapleGG/
  api/
    getDate.ts                 # 날짜 유틸 (KST 기준 오늘/어제)
    key.ts                     # Nexon Open API Key (환경변수에서 로드)
    ssrFetcher.ts              # 서버사이드 fetch 래퍼 (API 키 헤더 + 429 재시도 + 1시간 캐시)
    ssrRankingFetcher.ts       # 랭킹류 조회 래퍼 (당일 데이터 미집계 시 전날 날짜로 자동 재시도)
    cutOptionName.ts           # 옵션명 축약 (보스 몬스터 데미지 → 보공 등)
    formatStatValue.ts         # 스탯 숫자 포맷팅
    url/apiUrl.ts              # 엔드포인트 생성기 (랭킹/캐릭터/유니온/아이템/공지 등)
  app/
    (main)/page.tsx            # 메인: 랭킹 TOP 3 + 공지/업데이트, 검색바
    (main)/components/         # RankBox, InformationBox
    user/[name]/page.tsx       # 캐릭터 상세 페이지 (SSR, API 병렬 조회)
    user/[name]/components/    # UserHeader/UserBasicStat/UserItem/UserSkill/UserUnion 등 23개 섹션 컴포넌트
    user/userProps/props.ts    # 상세 페이지 타입 정의
    privacy/page.tsx           # 개인정보처리방침
    layout.tsx                 # 글로벌 레이아웃/메타/PWA·서비스워커/광고 스크립트
    robots.ts, sitemap.ts
    globals.css                # Tailwind 4 전역 스타일, 커스텀 브레이크포인트 정의
  components/
    Header.tsx, SearchBar.tsx, SearchForm.tsx, SearchDropdown.tsx
    PresetTabs.tsx              # 프리셋 전환 공용 탭 컴포넌트
    NotInfoText.tsx, ErrorPage.tsx, UserErrorPage.tsx
    ServiceWorkerRegister.tsx   # App Router용 수동 서비스워커 등록
    header/                     # NavBar, HeaderSearchBar, ThemeBtn
  store/
    useFavoriteStore.ts         # 즐겨찾기 (zustand + localStorage)
    useRecentSearchStore.ts     # 최근 검색어 (zustand + localStorage)
  public/
    manifest.json, icons/, main/header.png, danpungGG.png 등
  resources/                    # Capacitor 앱 아이콘/스플래시 원본 이미지
  ios/, android/                # Capacitor 네이티브 프로젝트 (원격 URL 모드)
  capacitor.config.ts
  next.config.ts                # 이미지 도메인, PWA 구성
  tsconfig.json, eslint.config.mjs, tailwind/postcss 설정
```

---

## 라우트 개요
- `/` 메인 대시보드
- `/user/[name]` 캐릭터 상세
- `/privacy` 개인정보처리방침

---

## Nexon Open API 연동
모든 API 호출은 서버 컴포넌트에서 수행되며, 헤더에 `x-nxopen-api-key`를 포함합니다.

- 키 위치: `api/key.ts` (환경변수 `NX_OPEN_API_KEY`)
- 공통 fetch: `api/ssrFetcher.ts` — 1시간 캐시(`revalidate: 3600`), HTTP 429 시 최대 2회 재시도
- 랭킹류 fetch: `api/ssrRankingFetcher.ts` — 당일 데이터가 아직 집계 전(`OPENAPI00009`)이면 전날 날짜로 자동 재시도
- 엔드포인트 조립: `api/url/apiUrl.ts`

**성능**: 캐릭터 상세 페이지는 ocid 조회 이후 나머지 19개 API 호출을 서로 독립적으로 `Promise.all`로 병렬 요청합니다 (순차 요청 대비 응답 시간 대폭 단축). 메인 페이지의 랭킹 TOP 3 조회(랭킹→ocid→유저정보 체인)도 체인 간에는 병렬로 처리됩니다.

---

## 실행 방법
사전 준비: Node 18+ 권장, pnpm/yarn/npm 중 택1

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

4) 프로덕션 빌드/실행
```bash
npm run build
npm start
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
- 날짜 유틸: `getToDate()` / `getYdayDate()`는 KST 기준 오늘/어제, 랭킹 API 쿼리에 사용됩니다.
- 타입: 캐릭터 상세 페이지 타입은 `app/user/userProps/props.ts`에 정의되어 있습니다.
- UI/상태: 프리셋 전환(어빌리티/장비/하이퍼스탯/유니온/코디 등)은 클라이언트 컴포넌트에서 `useState` + `PresetTabs` 공용 컴포넌트로 처리합니다.
- 즐겨찾기/최근검색어: `store/`의 zustand 스토어가 `localStorage`에 영속화하며 서버로 전송하지 않습니다.
- 다크모드: `components/header/ThemeBtn.tsx`에서 `document.documentElement`에 `dark` 클래스를 토글.
- 반응형: Tailwind 커스텀 브레이크포인트 `pc`(940px)를 기준으로 모바일/데스크탑 레이아웃을 분기합니다.

---

## 알려진 제한사항
- 테스트 코드(단위/통합)가 아직 없습니다.
