import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routes } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-10 px-5 text-center">
      <SectionHeading
        as="h1"
        align="center"
        label="404 · NOT FOUND"
        title={["찾으시는 페이지가", "**옷장에 없어요**"]}
        description="주소를 다시 확인하거나 홈에서 다시 시작해 주세요."
      />
      <ButtonLink href={routes.home} size="lg">
        홈으로 돌아가기
      </ButtonLink>
    </main>
  );
}
