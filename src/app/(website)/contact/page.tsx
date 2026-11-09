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
    <div className="bg-warm-ivory text-ink min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-ink text-white pt-40 pb-20 sm:pt-48 sm:pb-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-dark-surface to-ink opacity-90" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="section-label text-coral font-medium tracking-[0.25em] mb-4 block">
            GET IN TOUCH
          </span>
          <h1 className="editorial-headline text-white text-5xl sm:text-6xl lg:text-8xl max-w-5xl leading-[0.95] mb-6">
            LET&apos;S CREATE SOMETHING MEMORABLE.
          </h1>
          <p className="text-muted-grey text-lg sm:text-xl max-w-2xl font-body leading-relaxed">
            Have an ambitious event, pageant sponsorship, or media campaign in mind? Connect with our Biratnagar
            production team today.
          </p>
        </div>
      </section>

      {/* ─── Contact Form & Info Grid ────────────────────────── */}
      <section className="py-20 lg:py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="text-xs uppercase font-display tracking-widest text-coral font-semibold block mb-2">
                PRODUCTION INQUIRY
              </span>
              <h2 className="editorial-headline text-ink text-3xl sm:text-4xl">
                Send Us Your Project Brief
              </h2>
            </div>

            <ContactForm />
          </div>

          {/* Contact Details & Location Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Headquarters Card */}
            <div className="bg-white border border-ink/10 p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-ink mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-coral" /> Biratnagar Headquarters
              </h3>

              <div className="space-y-4 text-sm font-body text-ink/80">
                <div>
                  <span className="text-xs uppercase font-display tracking-widest text-ink/50 block mb-1">
                    Registered Address
                  </span>
                  <p className="font-medium text-ink">
                    Jay Media Management Pvt. Ltd.
                  </p>
                  <p>{siteConfig.location.address}</p>
                  <p>{siteConfig.location.city}, {siteConfig.location.province}</p>
                  <p>{siteConfig.location.country}</p>
                </div>

                <div className="pt-4 border-t border-ink/10">
                  <span className="text-xs uppercase font-display tracking-widest text-ink/50 block mb-1">
                    Electronic Mail
                  </span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-coral hover:underline font-medium"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>

                <div className="pt-4 border-t border-ink/10">
                  <span className="text-xs uppercase font-display tracking-widest text-ink/50 block mb-1">
                    Phone Inquiries
                  </span>
                  <p className="text-ink/80">{siteConfig.contact.phone}</p>
                </div>

                <div className="pt-4 border-t border-ink/10 flex items-start gap-2">
                  <Clock className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  <div className="text-xs text-ink/70">
                    <p className="font-semibold text-ink">Operating Hours</p>
                    <p>Sunday – Friday: 10:00 AM – 6:00 PM NST</p>
                    <p>Saturday: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Sponsorship Notice */}
            <div className="bg-dark-surface text-white p-8 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-coral/10 rounded-full blur-2xl" />
              <span className="text-xs uppercase font-display tracking-widest text-coral font-semibold block mb-2">
                BRAND PARTNERSHIPS
              </span>
              <h4 className="font-display text-xl font-bold mb-3">
                Pageant Title &amp; Category Sponsorships
              </h4>
              <p className="text-muted-grey text-xs sm:text-sm font-body leading-relaxed mb-4">
                Sponsoring <em>Miss Koshi</em> or <em>Mr. and Miss Little Koshi</em> offers direct brand engagement with
                hundreds of thousands of families across Eastern Nepal via television broadcasts, billboards, and social
                streams.
              </p>
              <div className="text-xs font-display text-white/60">
                Direct Inquiries: <span className="text-coral">management@jaymediamanagement.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
