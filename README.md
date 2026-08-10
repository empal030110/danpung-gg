## 단풍지지 (mapleGG)

메이플스토리 오픈 API를 활용한 유저/랭킹 조회 및 통계 뷰어입니다. 캐릭터 검색을 통해 기본 정보, 유니온, 어빌리티, 장비 프리셋, 칭호, 안드로이드를 열람할 수 있습니다. PWA를 적용해 설치형처럼 사용할 수 있습니다.

### 데모
- 서비스: `https://www.danpung.shop`

---

## 기술 스택
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: Tailwind CSS v4
- **PWA**: next-pwa
- **Analytics**: @vercel/analytics
- **Icons/UX**: react-icons, react-spinners

---

## 주요 기능
- **검색**: 캐릭터명으로 검색하여 상세 페이지 진입 (`/user/[name]`)
- **메인 대시보드**: 무릉/더시드/업적 랭킹 1위 하이라이트 + 공지/업데이트 목록
- **캐릭터 상세**:
  - 기본 정보: 직업, 서버, 레벨, 생성일, 길드, 프로필 이미지 등
  - 랭킹: 전체/월드 랭킹, 인기도, 유니온 레벨, 전투력
  - 어빌리티: 1/2/3 프리셋 전환, 등급 색상 구분
  - 장비: 1/2/3 프리셋 전환, 무보엠/방어구/장신구 섹션, 잠재/에디 옵션 색상 표기, 스타포스 강화 노출
  - 칭호/안드로이드: 보유 시 카드 형태로 노출
- **테마**: 라이트/다크 모드 토글
---

## 프로젝트 구조
```
mapleGG/
  api/
    getDate.ts                 # 날짜 유틸 (KST 기준 오늘/어제)
    key.ts                     # Nexon Open API Key (개발 시 교체 필요)
    ssrFetcher.ts              # 서버사이드 fetch 래퍼 (API 키 헤더 포함)
    url/apiUrl.ts              # 엔드포인트 생성기 (랭킹/캐릭터/유니온/아이템/공지 등)
  app/
    (main)/page.tsx            # 메인: 랭킹 TOP/공지/업데이트, 검색바
    (main)/components/         # RankBox, InformationBox
    user/[name]/page.tsx       # 캐릭터 상세 페이지 (SSR)
    user/[name]/components/    # UserHeader/UserSet/UserAbility/UserItem/ItemBox
    user/[name]/utils/         # filterItem (장비 슬롯 필터)
    user/userProps/props.ts    # 상세 페이지 타입들
    layout.tsx                 # 글로벌 레이아웃/메타/PWA head
    globals.css                # Tailwind 4 전역 스타일
  components/
    Header.tsx, SearchBar.tsx, header/ThemeBtn.tsx
  public/
    manifest.json, icons/, main/header.png, danpungGG.png 등
  next.config.ts               # 이미지 도메인, PWA 구성
  tsconfig.json, eslint.config.mjs, tailwind/postcss 설정
```

---

## 라우트 개요
- `/` 메인 대시보드: 랭킹 1위 요약, 공지/업데이트 5개씩 노출
- `/user/[name]` 캐릭터 상세: 기본/랭킹/유니온/전투력/어빌리티/장비/칭호/안드로이드

---

## Nexon Open API 연동
모든 API 호출은 서버 컴포넌트에서 `ssrFetcher`를 통해 수행되며, 헤더에 `x-nxopen-api-key`를 포함합니다.

- 키 위치: `api/key.ts`
- 헤더 설정: `api/ssrFetcher.ts`
- 엔드포인트 조립: `api/url/apiUrl.ts`

---

## 실행 방법
사전 준비: Node 18+ 권장, pnpm/yarn/npm 중 택1

1) 의존성 설치
```bash
npm install
# 또는
yarn
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
- 플러그인: `next-pwa`
- 개발환경: PWA 비활성화 (next.config.ts의 `disable: process.env.NODE_ENV === "development"`)
- 프로덕션: `public/manifest.json`/`public/icons/*` 기반으로 설치 가능

---

## 코드 가이드/패턴
- 데이터 패턴: `ssrFetcher`는 응답을 배열 형태로 정규화하여 `[data]` 또는 `data[]` 형태를 일관되게 반환합니다.
- 날짜 유틸: `getToDate()`는 KST 기준 오늘, 랭킹 API 쿼리에 사용됩니다.
- 타입: 상세 페이지 타입은 `app/user/userProps/props.ts`에 정의되어 있습니다.
- UI/상태: 프리셋 전환(어빌리티/장비)은 클라이언트 컴포넌트에서 `useState`로 처리합니다.
- 다크모드: `components/header/ThemeBtn.tsx`에서 `document.documentElement`에 `dark` 클래스를 토글.

---
