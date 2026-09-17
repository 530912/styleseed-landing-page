import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comingSoon } from "@/content/auth";
import { routes } from "@/lib/site";

type ComingSoonProps = {
  label: string;
  title: [string, string];
  description: string;
};

export function ComingSoon({ label, title, description }: ComingSoonProps) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-10 px-5 py-24 text-center">
      <SectionHeading
        as="h1"
        align="center"
        label={label}
        title={title}
        description={description}
      />
      <ButtonLink href={routes.home} variant="primary" size="lg">
        {comingSoon.backToHome}
      </ButtonLink>
    </div>
  );
}
