# STYLESEED Web

내 옷장 속 옷으로 되고 싶은 스타일을 먼저 완성하고, 정말 필요한 옷만 사게 돕는 AI 퍼스널 스타일링 서비스의 웹사이트예요.
현재는 PRD의 **Phase 1 (소개 랜딩 페이지)** 까지 구현되어 있어요.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 실행
npm run lint
```

## 자주 바꾸는 곳

| 무엇을 | 어디서 |
|---|---|
| 랜딩 카피 · 통계 · 가격 · 영상 URL | `content/landing.ts` (`**강조**` 부분은 로즈핑크) |
| 로그인/회원가입 준비 중 문구 | `content/auth.ts` |
| 네비게이션 · 문의 이메일 · 메타 설명 | `lib/site.ts` |
| 색상 · 폰트 토큰 | `app/globals.css` 의 `@theme` |
| 앱 화면 · 옷 · Core 이미지 | `public/images/...` (경로는 `content/landing.ts` 참고, 파일이 없으면 회색 플레이스홀더) |
| OG 이미지 | `app/opengraph-image.tsx` 삭제 후 `app/opengraph-image.png`(1200×630) 추가 |

## 구조

```
app/
  (marketing)/   공개 영역: 헤더·푸터·Lenis·마우스 파티클 레이아웃 + "/" 랜딩
  (auth)/        /login, /signup (Phase 2에서 Supabase Auth로 교체)
components/
  landing/       섹션별 컴포넌트 (Hero, ClosetParadox, Insight, ...)
  layout/        SiteHeader, SiteFooter, HeaderAuthActions(로그인 상태 전환 자리)
  motion/        SmoothScroll, CursorSparkles, Reveal, CountUp, Parallax
  ui/            Section, SectionHeading, Button, PhoneFrame, MaybeImage, ComingSoon
content/         카피 데이터
lib/             사이트 설정, 유틸, 미디어쿼리 훅
```

로그인 후 페이지(`/closet`, `/today`, `/stores`, `/plus`, `/account`)는 이후 단계에서 `app/(app)/` 그룹으로 추가할 예정이에요.
