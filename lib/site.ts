/** 사이트 전역 설정: 이름, URL, 메타, 네비게이션, 문의 채널 */

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "STYLESEED",
  url: resolveSiteUrl(),
  title: "STYLESEED — 새로 사기 전에, 이미 가진 옷부터",
  description:
    "내 옷장 속 옷으로 되고 싶은 스타일을 먼저 완성하고, 정말 필요한 옷만 사게 돕는 AI 퍼스널 스타일링 서비스예요.",
  contactEmail: "hello@styleseed.kr",
};

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "서비스 소개", href: "/#how" },
  { label: "기능", href: "/#features" },
  { label: "요금제", href: "/#pricing" },
];

export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
};

export const authLinks = {
  login: { label: "로그인", href: routes.login },
  signup: { label: "무료로 시작하기", href: routes.signup },
};
