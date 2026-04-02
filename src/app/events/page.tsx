import Link from "next/link";
import { Calendar, MapPin, Search } from "lucide-react";

export default function EventsCategoryPage() {
  const events = [
    {
      title: "The CLMP Certification Workshop",
      type: "Workshop",
      date: "Jun 24, 2024",
      time: "09:00 AM - 05:00 PM",
      location: "London, UK",
      slug: "clmp-certification-workshop",
    },
    {
      title: "The Future of Retail Loyalty",
      type: "Webinar",
      date: "Jul 12, 2024",
      time: "10:00 AM - 11:30 AM",
      location: "Online",
      slug: "future-of-retail-loyalty",
    },
    {
      title: "Loyalty Expo 2024",
      type: "Conference",
      date: "Sep 15, 2024",
      time: "09:00 AM - 06:00 PM",
      location: "San Francisco, USA",
      slug: "loyalty-expo-2024",
    },
  ];

  return (
    <div className="section-padding bg-qbf-white min-h-screen">
      <div className="max-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-black text-qbf-black mb-8 leading-tight">
              Our <br />
              <span className="text-qbf-orange">Events.</span>
            </h1>
            <p className="text-2xl text-qbf-gray leading-relaxed max-w-2xl">
              Join us for workshops, webinars, and certification programs to
              elevate your loyalty expertise.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full bg-white border border-qbf-divider px-12 py-4 rounded-full text-lg focus:outline-none focus:border-qbf-orange transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qbf-gray" size={20} />
          </div>
        </div>

        <div className="mb-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide border-b border-qbf-divider">
          {[
            "All",
            "Workshops",
            "Webinars",
            "CLMP",
            "Conferences",
            "Other"
          ].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 rounded-full font-bold text-sm hover:text-qbf-orange transition-all whitespace-nowrap"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white p-8 md:p-12 rounded-[3rem] border border-qbf-divider group hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8 relative z-10">
                <span className="bg-qbf-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {event.type}
                </span>
                <div className="text-right">
                  <p className="text-3xl font-display font-black text-qbf-black">
                    {event.date.split(" ")[1]}
                  </p>
                  <p className="text-sm font-bold uppercase tracking-wider text-qbf-orange">
                    {event.date.split(" ")[0]}
                  </p>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-black text-qbf-black mb-8 leading-tight group-hover:text-qbf-orange transition-colors">
                {event.title}
              </h3>
              <div className="flex flex-col md:flex-row gap-6 mb-10 text-qbf-gray font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{event.location}</span>
                </div>
              </div>
              <Link
                href={`/events/${event.slug}`}
                className="bg-qbf-orange text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-opacity inline-block"
              >
                Register Now
              </Link>
            </div>
          ))}
        </div>

        <div className="pt-20 border-t border-qbf-divider">
          <h2 className="text-3xl font-display font-black text-qbf-black mb-8">
            Past Events
          </h2>
          <div className="flex overflow-x-auto gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide opacity-60 grayscale hover:grayscale-0 transition-all">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="min-w-[70vw] md:min-w-[400px] bg-white p-8 rounded-3xl border border-qbf-divider"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-qbf-gray mb-4">Past Event • Feb 2024</p>
                <h3 className="text-2xl font-display font-bold text-qbf-black mb-4">The Psychology of Engagement Workshop</h3>
                <Link href="/events" className="text-qbf-black font-bold text-sm">View Recap →</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
