import { GarmentPlaceholder } from "@/components/ui/GarmentPlaceholder";
import { MaybeImage } from "@/components/ui/MaybeImage";
import type { ImageContent } from "@/content/landing";
import { cn } from "@/lib/cn";

type PhoneFrameProps = ImageContent & {
  className?: string;
  priority?: boolean;
};

/** 앱 화면 이미지가 없을 때: 내 옷으로 만든 코디 카드 + Match Score 막대 */
function ScreenSkeleton() {
  return (
    <div aria-hidden="true" className="flex h-full flex-col gap-[7%] bg-bg px-[8%] pt-[20%]">
      <div className="h-[7px] w-1/3 rounded-full bg-ink/12" />
      <div className="-mt-[4%] h-3 w-[70%] rounded-full bg-ink/20" />
      <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-surface p-2">
        <div className="relative row-span-2 overflow-hidden rounded-[10px]">
          <GarmentPlaceholder garment="blazer" framed={false} className="bg-bg" />
        </div>
        <div className="relative aspect-square overflow-hidden rounded-[10px]">
          <GarmentPlaceholder garment="shirt" framed={false} className="bg-bg" />
        </div>
        <div className="relative aspect-square overflow-hidden rounded-[10px]">
          <GarmentPlaceholder garment="loafer" framed={false} className="bg-bg" />
        </div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
        <div className="h-full w-3/4 bg-accent" />
      </div>
      <div className="h-[7px] w-[58%] rounded-full bg-ink/12" />
    </div>
  );
}

/** 아이폰 프레임 안에 앱 화면 이미지. 이미지가 없으면 코디 화면 스켈레톤. */
export function PhoneFrame({ src, alt, className, priority }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] rounded-[2.4rem] bg-[#2a2a2a] p-[3.2%] shadow-[0_50px_80px_-40px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-bg">
        <MaybeImage
          src={src}
          alt={alt}
          sizes="(min-width: 768px) 250px, 200px"
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
