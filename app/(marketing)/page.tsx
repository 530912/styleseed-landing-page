import { AboutVideo } from "@/components/landing/AboutVideo";
import { ClosetParadox } from "@/components/landing/ClosetParadox";
import { Comparison } from "@/components/landing/Comparison";
import { Features } from "@/components/landing/Features";
import { FinalCta } from "@/components/landing/FinalCta";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Insight } from "@/components/landing/Insight";
import { Pricing } from "@/components/landing/Pricing";
import { UserTest } from "@/components/landing/UserTest";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClosetParadox />
      <Insight />
      <HowItWorks />
      <Features />
      <Comparison />
      <Pricing />
      <UserTest />
      <AboutVideo />
      <FinalCta />
    </>
  );
}
