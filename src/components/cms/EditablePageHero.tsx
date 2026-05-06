import { findBy } from "@/lib/db";

type PageContent = {
  slug: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  intro?: string;
};

type Props = {
  slug: string;
  fallback: { heroTitle: string; heroSubtitle: string; intro?: string };
  align?: "left" | "center";
  variant?: "default" | "compact";
};

export function EditablePageHero({ slug, fallback, align = "left", variant = "default" }: Props) {
  const page = findBy<PageContent>("pages", "slug", slug);
  const heroTitle = page?.heroTitle || fallback.heroTitle;
  const heroSubtitle = page?.heroSubtitle || fallback.heroSubtitle;
  const intro = page?.intro || fallback.intro;

  const isCenter = align === "center";
  const isCompact = variant === "compact";

  return (
    <section
      className={
        isCompact
          ? "pt-32 pb-16 bg-qbf-white border-b border-qbf-divider"
          : "pt-40 pb-20 bg-qbf-white border-b border-qbf-divider"
      }
    >
      <div className="max-content">
        <div className={isCenter ? "max-w-4xl mx-auto text-center" : "max-w-4xl"}>
          <h1
            className={
              isCompact
                ? "text-4xl md:text-6xl font-display font-black text-qbf-black mb-6 leading-[1.05] tracking-tight text-balance"
                : "text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-[1.05] tracking-tight text-balance"
            }
          >
            {heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-qbf-gray leading-relaxed text-pretty max-w-3xl mx-[inherit]">
            {heroSubtitle}
          </p>
          {intro ? (
            <p className="mt-6 text-base md:text-lg text-qbf-gray/90 leading-relaxed max-w-3xl">
              {intro}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
