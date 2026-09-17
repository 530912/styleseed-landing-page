import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";

import { siteConfig } from "@/lib/site";

import "./globals.css";

/** 영문 디스플레이 서체: 폭(wdth) 축까지 불러와 Expanded / Condensed 로 써요. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f0eee6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={archivo.variable}>
      <body className="min-h-dvh bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
