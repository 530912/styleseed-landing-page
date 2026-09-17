import type { Metadata } from "next";

import { ComingSoon } from "@/components/ui/ComingSoon";
import { comingSoon } from "@/content/auth";

const copy = comingSoon.login;

export const metadata: Metadata = {
  title: copy.metaTitle,
  robots: { index: false },
};

export default function LoginPage() {
  return <ComingSoon label={copy.label} title={copy.title} description={copy.description} />;
}
