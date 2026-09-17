import { Logo } from "@/components/layout/Logo";

/** 로그인 · 회원가입 레이아웃. Phase 2에서 Supabase Auth 화면이 들어와요. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex h-16 w-full max-w-6xl items-center px-5 md:px-8">
        <Logo />
      </header>
      <main className="flex flex-1 items-center justify-center">{children}</main>
    </div>
  );
}
