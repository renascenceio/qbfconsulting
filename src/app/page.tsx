import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { MediaStrip } from "@/components/home/MediaStrip";
import { CaseStudies } from "@/components/home/CaseStudies";
import { HubTeaser } from "@/components/home/HubTeaser";
import { LatestJournal } from "@/components/home/LatestJournal";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { CTABand } from "@/components/home/CTABand";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
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
