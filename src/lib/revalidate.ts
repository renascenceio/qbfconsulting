import { revalidatePath } from "next/cache";

/** Maps a pages slug to all public paths that should revalidate when it changes. */
const PAGE_PATHS: Record<string, string[]> = {
  home: ["/"],
  services: ["/services", "/"],
  solutions: ["/solutions", "/"],
  "case-studies": ["/case-studies", "/"],
  blog: ["/blog", "/"],
  hub: ["/hub", "/"],
  about: ["/about", "/"],
  "about-company": ["/about/company", "/about"],
  "about-founder": ["/about/founder", "/about"],
  contact: ["/contact"],
  coverage: ["/coverage"],
  partners: ["/partners"],
  events: ["/events", "/"],
  media: ["/media"],
  careers: ["/careers"],
  "service-strategy": ["/services/loyalty-program-strategy", "/services"],
  "service-implementation": ["/services/loyalty-program-implementation", "/services"],
  "service-management": ["/services/loyalty-program-management", "/services"],
};

export function revalidatePageSlug(slug: string) {
  const paths = PAGE_PATHS[slug] || [`/${slug}`];
  paths.forEach((p) => safeRevalidate(p));
}

export function revalidateCollection(
  entity: "posts" | "case-studies" | "solutions" | "events" | "products" | "careers",
  slug?: string
) {
  const indexMap: Record<string, string> = {
    posts: "/blog",
    "case-studies": "/case-studies",
    solutions: "/solutions",
    events: "/events",
    products: "/",
    careers: "/careers",
  };
  safeRevalidate(indexMap[entity]);
  safeRevalidate("/");

  if (slug) {
    const detailMap: Record<string, string> = {
      posts: `/blog/${slug}`,
      "case-studies": `/case-studies/${slug}`,
      solutions: `/solutions/${slug}`,
      events: `/events/${slug}`,
      careers: `/careers/${slug}`,
    };
    if (detailMap[entity]) safeRevalidate(detailMap[entity]);
  }
}

/** Revalidate every page in the site (used for global content like translations/settings). */
export function revalidateAll() {
  try {
    revalidatePath("/", "layout");
  } catch {
    // ignore
  }
}

function safeRevalidate(p: string) {
  try {
    revalidatePath(p);
  } catch {
    // ignore — non-fatal
  }
}
