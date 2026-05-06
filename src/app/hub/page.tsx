import type { Metadata } from "next";
import { findBy } from "@/lib/db";
import { HubLandingClient } from "./HubLandingClient";

export async function generateMetadata(): Promise<Metadata> {
  const page: any = await findBy("pages", "slug", "hub");
  return {
    title: page?.seoTitle || "Loyalty Hub | QBF Consulting",
    description:
      page?.seoDescription ||
      "The QBF loyalty community hub for practitioners. Frameworks, reports, and a global network.",
  };
}

export default async function HubLandingPage() {
  const page: any = (await findBy("pages", "slug", "hub")) || {};
  return (
    <HubLandingClient
      heroTitle={page.heroTitle || "The Loyalty Hub."}
      heroSubtitle={
        page.heroSubtitle ||
        "Free, gated resources for loyalty practitioners. Reports, frameworks, and templates to help you grow."
      }
      intro={page.intro || ""}
    />
  );
}
