import { FeatureIndex } from "@/components/landing/FeatureIndex";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/content/landing";

export function Features() {
  return (
    <Section id="features" labelledBy="features-title">
      <FeatureIndex heading={<SectionHeading id="features-title" {...features.heading} />} />
    </Section>
  );
}
