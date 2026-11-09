import { Metadata } from 'next';
import { ArrowUpRight, Mail, MapPin, Phone, Clock } from 'lucide-react';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import ContactForm from '@/components/forms/ContactForm';
import { generatePageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us | Jay Media Management Biratnagar',
  description:
    'Get in touch with Jay Media Management Pvt. Ltd. near Traffic Chowk, Main Road, Biratnagar, Nepal. Inquire for event management, media production, and pageant sponsorships.',
});

export default function ContactPage() {
  const fullAddress = `${siteConfig.location.address}, ${siteConfig.location.city}, ${siteConfig.location.province}, ${siteConfig.location.country}`;

  return (
    <div className="min-h-screen bg-surface text-paper">
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s make something{' '}
            <span className="serif text-coral">memorable.</span>
          </>
        }
        description="Have an ambitious event, pageant sponsorship, or media campaign in mind? Connect with our Biratnagar production team."
        image="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Corporate gala and live event production"
        compact
        meta={[
          { label: 'Studio', value: 'Biratnagar, Nepal' },
          { label: 'Response', value: 'Within one business day' },
          { label: 'Working hours', value: 'Sun–Fri / 10–6 NST' },
          { label: 'New inquiries', value: 'Welcome' },
        ]}
      />

      <section className="bg-surface py-16 md:py-24 lg:py-28">
        <div className="container-ed grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-coral" aria-hidden="true" />
              <span className="eyebrow text-coral">Production inquiry</span>
            </div>
            <h2 className="display mt-5 text-[clamp(2rem,4vw,4rem)]">
              Tell us what you&apos;re planning.
            </h2>
            <p className="mt-4 mb-9 max-w-lg text-sm leading-relaxed text-muted">
              Share the scope, date, and ambition. We will come back with the
              right production approach and a clear next step.
            </p>

            <ContactForm />
          </div>

          {/* Details */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-coral pt-5">
              <span className="eyebrow text-paper">Biratnagar studio</span>
              <h2 className="display mt-4 text-3xl text-paper md:text-4xl">
                Find us near Traffic Chowk.
              </h2>

              <div className="mt-7 space-y-5 text-sm leading-relaxed text-muted">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-paper"
                  >
                    {siteConfig.location.address}
                    <br />
                    {siteConfig.location.city}, {siteConfig.location.province}
                    <br />
                    {siteConfig.location.country}
                  </a>
                </div>

                <div className="flex items-start gap-3 border-t border-line pt-4">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  <div>
                    <span className="eyebrow block text-[8px] text-faint">
                      Email
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="mt-1 block text-paper transition-opacity hover:opacity-70"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-line pt-4">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  <div>
                    <span className="eyebrow block text-[8px] text-faint">
                      Phone
                    </span>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="mt-1 block text-paper transition-opacity hover:opacity-70"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-line pt-4">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  <div>
                    <span className="eyebrow block text-[8px] text-faint">
                      Hours
                    </span>
                    <p className="mt-1 text-paper">
                      Sunday – Friday, 10:00 AM – 6:00 PM
                    </p>
                    <p className="text-muted">Saturday by appointment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border border-line p-6">
              <span className="eyebrow text-coral">Brand partnerships</span>
              <h3 className="display mt-4 text-2xl text-paper">
                Pageant title &amp; category sponsorships.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Sponsoring Miss Koshi or Mr. and Miss Little Koshi offers direct
                brand engagement with families across Eastern Nepal through
                broadcast, billboards, and social streams.
              </p>
              <Link
                href={`mailto:${siteConfig.contact.email}`}
                className="text-link mt-6 text-paper"
              >
                Partnership desk
                <ArrowUpRight className="h-3.5 w-3.5 text-coral" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location strip */}
      <section className="overflow-hidden border-t border-line bg-surface-alt py-12 md:py-16">
        <div className="container-ed flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow text-faint">Studio coordinates</span>
            <p className="display mt-3 text-[clamp(1.8rem,4vw,4rem)] text-paper">
              Biratnagar / Koshi Province / Nepal
            </p>
          </div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline shrink-0 self-start md:self-auto"
          >
            Open in maps
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
