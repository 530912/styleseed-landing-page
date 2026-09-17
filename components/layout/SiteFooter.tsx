import { footer } from "@/content/landing";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="overflow-hidden pt-8 pb-10 md:pb-12">
      <div className="flex flex-col gap-8 container-page lg:flex-row lg:items-end lg:justify-between">
        <p
          className="font-wide text-[11vw] leading-[0.85] font-black tracking-[-0.05em] font-stretch-expanded lg:text-[8vw] xl:text-[120px]"
        >
          {siteConfig.name}
          <span aria-hidden="true" className="ml-1 align-[0.9em] text-[0.4em] text-accent">
            ✦
          </span>
        </p>
        <div className="flex shrink-0 flex-col gap-2 text-sm text-muted lg:items-end lg:pb-1 lg:text-right">
          <p className="font-wide text-[11px] font-bold tracking-label text-ink font-stretch-expanded">
            {footer.tagline}
          </p>
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
