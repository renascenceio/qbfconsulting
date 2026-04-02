import Link from "next/link";

export default function PartnersPage() {
  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-tight">
            Our <br />
            <span className="text-qbf-orange">Partners.</span>
          </h1>
          <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
            We collaborate with industry leaders and technology providers to
            deliver world-class loyalty solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-32">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div
              key={i}
              className="aspect-square bg-white border border-qbf-divider rounded-2xl flex items-center justify-center p-8 hover:shadow-xl hover:shadow-black/5 transition-all group cursor-pointer"
            >
              <div className="text-3xl font-display font-black text-qbf-gray/20 group-hover:text-qbf-orange transition-colors">
                LOGO {i}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-qbf-black text-white p-12 md:p-20 rounded-[3rem] text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-8">
            Become a Partner.
          </h2>
          <p className="text-xl text-qbf-gray mb-12 max-w-2xl mx-auto">
            Ready to collaborate with QBF Consulting? We are always looking
            for new partnerships to grow the loyalty ecosystem.
          </p>
          <Link
            href="/contact?type=partnership"
            className="bg-qbf-orange text-white px-10 py-5 rounded-full text-xl font-bold hover:opacity-90 transition-opacity inline-block"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}
