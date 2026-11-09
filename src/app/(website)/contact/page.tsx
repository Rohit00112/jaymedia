import { Metadata } from 'next';
import { MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import { generatePageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us | Jay Media Management Biratnagar',
  description:
    'Get in touch with Jay Media Management Pvt. Ltd. near Traffic Chowk, Main Road, Biratnagar, Nepal. Inquire for event management, media production, and pageant sponsorships.',
});

export default function ContactPage() {
  return (
    <div className="bg-black text-white min-h-screen font-rubik">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-black text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c0c11] to-black opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 bg-[#01402b]/80 border border-[#01402b] text-[#eef9ff] text-xs font-rubik font-medium tracking-widest uppercase rounded-[50px]">
              Biratnagar Desk
            </span>
            <span className="section-label text-coral font-medium tracking-[0.2em]">
              GET IN TOUCH
            </span>
          </div>
          <h1 className="editorial-headline text-white text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-6 font-rubik">
            LET&apos;S CREATE SOMETHING MEMORABLE.
          </h1>
          <p className="text-[#eef9ff]/80 text-lg sm:text-xl max-w-2xl font-rubik leading-relaxed">
            Have an ambitious event, pageant sponsorship, or media campaign in mind? Connect with our Biratnagar
            production team today.
          </p>
        </div>
      </section>

      {/* ─── Contact Form & Info Grid ────────────────────────── */}
      <section className="py-20 lg:py-32 px-6 sm:px-10 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="text-xs uppercase font-rubik tracking-wider text-coral font-semibold block mb-2">
                PRODUCTION INQUIRY
              </span>
              <h2 className="editorial-headline text-white text-3xl sm:text-4xl font-rubik">
                Send Us Your Project Brief
              </h2>
            </div>

            <ContactForm />
          </div>

          {/* Contact Details & Location Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Headquarters Card */}
            <div className="bg-[#0c0c11] border border-white/10 p-8 rounded-[10px] shadow-xl">
              <h3 className="font-rubik text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-coral" /> Biratnagar Headquarters
              </h3>

              <div className="space-y-4 text-sm font-rubik text-[#eef9ff]/80">
                <div>
                  <span className="text-xs uppercase font-rubik tracking-wider text-[#eef9ff]/50 block mb-1">
                    Registered Address
                  </span>
                  <p className="font-bold text-white">
                    Jay Media Management Pvt. Ltd.
                  </p>
                  <p>{siteConfig.location.address}</p>
                  <p>{siteConfig.location.city}, {siteConfig.location.province}</p>
                  <p>{siteConfig.location.country}</p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-xs uppercase font-rubik tracking-wider text-[#eef9ff]/50 block mb-1">
                    Electronic Mail
                  </span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-coral hover:underline font-medium"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-xs uppercase font-rubik tracking-wider text-[#eef9ff]/50 block mb-1">
                    Phone Inquiries
                  </span>
                  <p className="text-[#eef9ff] font-medium">{siteConfig.contact.phone}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-start gap-2">
                  <Clock className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  <div className="text-xs text-[#eef9ff]/70">
                    <p className="font-semibold text-white">Operating Hours</p>
                    <p>Sunday – Friday: 10:00 AM – 6:00 PM NST</p>
                    <p>Saturday: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Sponsorship Notice */}
            <div className="bg-[#0c0c11] text-white p-8 border border-white/10 rounded-[10px] relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-coral/10 rounded-full blur-2xl" />
              <span className="text-xs uppercase font-rubik tracking-wider text-coral font-semibold block mb-2">
                BRAND PARTNERSHIPS
              </span>
              <h4 className="font-rubik text-xl font-bold mb-3 text-white">
                Pageant Title &amp; Category Sponsorships
              </h4>
              <p className="text-[#eef9ff]/70 text-xs sm:text-sm font-rubik leading-relaxed mb-4">
                Sponsoring <em>Miss Koshi</em> or <em>Mr. and Miss Little Koshi</em> offers direct brand engagement with
                hundreds of thousands of families across Eastern Nepal via television broadcasts, billboards, and social
                streams.
              </p>
              <div className="text-xs font-rubik text-[#eef9ff]/60">
                Direct Inquiries: <span className="text-coral font-medium">management@jaymediamanagement.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
