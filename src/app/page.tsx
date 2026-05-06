import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { MediaStrip } from "@/components/home/MediaStrip";
import { CaseStudies } from "@/components/home/CaseStudies";
import { HubTeaser } from "@/components/home/HubTeaser";
import { LatestJournal } from "@/components/home/LatestJournal";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { CTABand } from "@/components/home/CTABand";
import { findBy } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const page: any = await findBy("pages", "slug", "home");
  return {
    title: page?.seoTitle || "QBF Consulting | Loyalty Strategy, Implementation & Management",
    description:
      page?.seoDescription ||
      "QBF Consulting designs, builds, and runs loyalty programs for ambitious global brands.",
  };
}

export default async function Home() {
  const page: any = (await findBy("pages", "slug", "home")) || {};

  return (
    <div className="overflow-x-hidden">
      <Hero
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
        intro={page.intro}
      />
      <WhatWeDo />
      <MediaStrip />
      <CaseStudies />
      <HubTeaser />
      <LatestJournal />
      <UpcomingEvents />
      <CTABand />
    </div>
  );
}
