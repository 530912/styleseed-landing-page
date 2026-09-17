import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { authLinks } from "@/lib/site";

type HeaderAuthActionsProps = {
  layout?: "inline" | "stacked";
  onNavigate?: () => void;
};

/**
 * 헤더 오른쪽 계정 영역.
 * Phase 2: Supabase 세션을 받아 로그인 상태면 "내 옷장" 등으로 바꾸는 곳이에요.
 */
export function HeaderAuthActions({ layout = "inline", onNavigate }: HeaderAuthActionsProps) {
  const stacked = layout === "stacked";

  return (
    <div className={cn("flex gap-2", stacked && "flex-col")}>
      <ButtonLink
        href={authLinks.login.href}
        variant={stacked ? "outline" : "ghost"}
        size={stacked ? "lg" : "sm"}
        onClick={onNavigate}
      >
        {authLinks.login.label}
      </ButtonLink>
      <ButtonLink
        href={authLinks.signup.href}
        variant="primary"
        size={stacked ? "lg" : "sm"}
        onClick={onNavigate}
      >
        {authLinks.signup.label}
      </ButtonLink>
    </div>
  );
}
