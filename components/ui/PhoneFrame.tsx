import { MaybeImage } from "@/components/ui/MaybeImage";
import type { ImageContent } from "@/content/landing";
import { cn } from "@/lib/cn";

type PhoneFrameProps = ImageContent & {
  className?: string;
  priority?: boolean;
};

function ScreenSkeleton() {
  return (
    <div aria-hidden="true" className="flex h-full flex-col gap-3 px-[9%] pt-[18%]">
      <div className="h-2.5 w-1/3 rounded-full bg-surface/60" />
      <div className="h-5 w-3/4 rounded-full bg-surface/70" />
      <div className="mt-2 aspect-[4/5] w-full rounded-2xl bg-surface/45" />
      <div className="grid grid-cols-3 gap-2">
        <div className="aspect-square rounded-xl bg-surface/45" />
        <div className="aspect-square rounded-xl bg-surface/45" />
        <div className="aspect-square rounded-xl bg-surface/45" />
      </div>
      <div className="h-2.5 w-1/2 rounded-full bg-surface/60" />
    </div>
  );
}

/** 아이폰 프레임 안에 앱 화면 이미지. 이미지가 없으면 회색 플레이스홀더. */
export function PhoneFrame({ src, alt, className, priority }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] rounded-[2.6rem] bg-ink p-[3.5%] shadow-[0_50px_90px_-40px_rgba(20,20,20,0.55)] ring-1 ring-ink/10",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-surface">
        <MaybeImage
          src={src}
          alt={alt}
          sizes="(min-width: 768px) 280px, 230px"
          priority={priority}
          placeholder={<ScreenSkeleton />}
        />
        <span
          aria-hidden="true"
          className="absolute top-[1.8%] left-1/2 h-[3.4%] w-[32%] -translate-x-1/2 rounded-full bg-ink"
        />
      </div>
    </div>
  );
}
