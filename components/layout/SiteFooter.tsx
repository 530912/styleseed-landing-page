import { Logo } from "@/components/layout/Logo";
import { footer } from "@/content/landing";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="text-[11px] font-semibold tracking-label text-muted">
            {footer.tagline}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted md:items-end">
          <p>
            {footer.contactLabel}{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="rounded-sm font-medium text-ink underline-offset-4 hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
          <p>
            <small className="text-sm">{footer.copyright}</small>
          </p>
        </div>
      </div>
    </footer>
  );
}
