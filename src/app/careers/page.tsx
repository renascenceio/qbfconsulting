import type { Metadata } from "next";
import { findBy } from "@/lib/db";
import { CareersClient } from "./CareersClient";

export async function generateMetadata(): Promise<Metadata> {
  const page: any = await findBy("pages", "slug", "careers");
  return {
    title: page?.seoTitle || "Careers | QBF Consulting",
    description: page?.seoDescription || "Career opportunities at QBF Consulting.",
  };
}

export default async function CareersCategoryPage() {
  const page: any = (await findBy("pages", "slug", "careers")) || {};
  return (
    <CareersClient
      heroTitle={page.heroTitle || "Join the team."}
      heroSubtitle={
        page.heroSubtitle ||
        "We are looking for passionate loyalty practitioners to join our growing team and build the future of customer engagement."
      }
      intro={page.intro || ""}
    />
  );
}
