"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

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
];

export const UpcomingEvents = () => {
  return (
    <section className="section-padding bg-qbf-white border-t border-qbf-divider">
      <div className="max-content">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-black text-qbf-black mb-6">
              Upcoming <br /> Events.
            </h2>
            <p className="text-xl text-qbf-gray">
              Join us for workshops, webinars, and certification programs.
            </p>
          </div>
          <Link
            href="/events"
            className="text-qbf-orange font-bold text-sm hover:underline"
          >
            View All Events →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.015 }}
              className="bg-white p-8 md:p-12 rounded-3xl border border-qbf-divider group hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer relative overflow-hidden"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
