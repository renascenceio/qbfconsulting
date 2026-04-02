import Link from "next/link";
import { Linkedin } from "lucide-react";

export default function FounderPage() {
  return (
    <div className="section-padding">
      <div className="max-content">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Portrait Placeholder */}
          <div className="w-full lg:w-1/3 aspect-[4/5] bg-qbf-divider rounded-3xl overflow-hidden relative border border-qbf-divider">
            <div className="absolute inset-0 bg-qbf-orange/5"></div>
            <div className="absolute bottom-10 left-10 text-qbf-black">
              <h1 className="text-4xl font-display font-black mb-2">Founder Name</h1>
              <p className="text-lg font-bold text-qbf-orange">Chief Executive Officer</p>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-display font-black mb-8 text-qbf-black">Bio</h2>
                <div className="prose prose-lg text-qbf-gray space-y-6">
                  <p>
                    With over two decades of experience in the loyalty industry,
                    [Founder Name] has led some of the world's most successful
                    customer engagement programs.
                  </p>
                  <p>
                    A sought-after expert and speaker, they founded QBF Consulting
                    to bridge the gap between abstract strategy and operational
                    reality.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-display font-black mb-8 text-qbf-black">Credentials</h2>
                <ul className="space-y-6">
                  {[
                    { label: "Experience", value: "20+ Years" },
                    { label: "Clients", value: "50+ Global Brands" },
                    { label: "Countries", value: "15+ Markets" },
                    { label: "Certified", value: "CLMP Professional" },
                  ].map((item, index) => (
                    <li key={index} className="border-b border-qbf-divider pb-4">
                      <p className="text-sm font-bold uppercase tracking-wider text-qbf-orange mb-1">
                        {item.label}
                      </p>
                      <p className="text-2xl font-black text-qbf-black">
                        {item.value}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 pt-16 border-t border-qbf-divider">
              <Link
                href="https://linkedin.com"
                className="bg-[#0077B5] text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-3"
              >
                <Linkedin size={20} />
                Connect on LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
