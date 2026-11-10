import { Metadata } from 'next';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import ContactForm from '@/components/forms/ContactForm';
import Reveal from '@/components/motion/Reveal';
import { generatePageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us | Jay Media Management Biratnagar',
  description:
    'Get in touch with Jay Media Management Pvt. Ltd. near Traffic Chowk, Main Road, Biratnagar, Nepal. Inquire for event management, media production, and pageant sponsorships.',
});

const HOURS = [
  'Sunday — Friday',
  '10:00 AM — 6:00 PM',
  'Saturday by appointment',
];

export default function ContactPage() {
  const fullAddress = `${siteConfig.location.address}, ${siteConfig.location.city}, ${siteConfig.location.province}, ${siteConfig.location.country}`;
  const mapsHref = `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        eyebrow="Start a project"
        title={
          <>
            Tell us what you&apos;re{' '}
            <span className="serif italic text-accent">imagining.</span>
          </>
        }
        description="An ambitious event, a pageant partnership, or a campaign that needs a stage — share the shape of it and our Biratnagar production desk will take it from there."
        meta={[
          { label: 'Studio', value: 'Biratnagar, Nepal' },
          { label: 'Response', value: 'Within one business day' },
          { label: 'Working hours', value: 'Sun–Fri / 10–6 NST' },
          { label: 'New inquiries', value: 'Always welcome' },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="container-ed grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow flex items-center gap-2.5 text-accent">
                <span className="h-px w-6 bg-accent" aria-hidden="true" />
                01 / Production inquiry
              </span>
              <h2 className="display mt-5 max-w-[14ch] text-balance text-[clamp(2.1rem,4vw,4.1rem)] text-ink">
                The brief starts{' '}
                <span className="serif italic text-accent">here.</span>
              </h2>
              <p className="mt-5 max-w-lg text-pretty text-sm leading-relaxed text-muted md:text-base">
                The more we know about the room, the date, and the feeling you
                want to leave behind, the sharper our first response will be.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <div className="mt-10 rounded-[0.5rem] border border-line bg-card p-6 md:p-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-8 lg:sticky lg:top-28">
              <Reveal delay={70}>
                <div className="border-t-2 border-accent bg-paper-deep p-6 md:p-7">
                  <span className="eyebrow text-accent">Biratnagar studio</span>
                  <h2 className="display mt-4 max-w-[14ch] text-2xl text-ink md:text-3xl">
                    Central Mall, 1st Floor, Biratnagar.
                  </h2>

                  <dl className="mt-7 border-t border-line">
                    <div className="border-b border-line py-4">
                      <dt className="eyebrow flex items-center gap-2 text-faint">
                        <MapPin className="h-3 w-3 text-accent" />
                        Address
                      </dt>
                      <dd className="mt-2">
                        <a
                          href={mapsHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm leading-relaxed text-ink-soft transition-colors hover:text-accent"
                        >
                          {siteConfig.location.address}
                          <br />
                          {siteConfig.location.city},{' '}
                          {siteConfig.location.province}
                          <br />
                          {siteConfig.location.country}
                        </a>
                      </dd>
                    </div>

                    <div className="border-b border-line py-4">
                      <dt className="eyebrow flex items-center gap-2 text-faint">
                        <Mail className="h-3 w-3 text-accent" />
                        Email
                      </dt>
                      <dd className="mt-2">
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="break-all text-sm text-ink-soft transition-colors hover:text-accent"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </dd>
                    </div>

                    <div className="border-b border-line py-4">
                      <dt className="eyebrow flex items-center gap-2 text-faint">
                        <Phone className="h-3 w-3 text-accent" />
                        Phone
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-x-2 text-sm text-ink-soft">
                        <a
                          href={`tel:${siteConfig.contact.phone}`}
                          className="font-semibold transition-colors hover:text-accent"
                        >
                          {siteConfig.contact.phone}
                        </a>
                        <span className="text-muted">|</span>
                        <a
                          href={`tel:${siteConfig.contact.secondaryPhone}`}
                          className="font-semibold transition-colors hover:text-accent"
                        >
                          {siteConfig.contact.secondaryPhone}
                        </a>
                      </dd>
                    </div>

                    <div className="py-4">
                      <dt className="eyebrow text-faint">Hours</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {HOURS[0]}
                        <br />
                        {HOURS[1]}
                        <span className="mt-1 block text-xs text-muted">
                          {HOURS[2]}
                        </span>
                      </dd>
                    </div>
                  </dl>

                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline mt-5 w-full"
                  >
                    Open in maps
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={110}>
                <div className="rounded-[0.4rem] bg-forest p-6 text-cream md:p-7">
                  <span className="eyebrow text-gold">Brand partnerships</span>
                  <h3 className="display mt-4 text-2xl text-cream">
                    Pageant title &amp; category sponsorships.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">
                    Sponsoring Miss Koshi or Mr. and Miss Little Koshi offers
                    direct brand engagement with families across Eastern Nepal
                    through broadcast, billboards, and social streams.
                  </p>
                  <Link
                    href={`mailto:${siteConfig.contact.email}`}
                    className="mt-6 inline-flex items-center gap-2 border-b border-cream/35 pb-1 text-[13px] font-semibold text-cream transition-colors hover:border-cream"
                  >
                    Partnership desk
                    <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      <section className="overflow-hidden border-y border-line bg-paper-deep py-16 md:py-20">
        <div className="container-ed">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <span className="eyebrow flex items-center gap-2.5 text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              Find Us In Biratnagar
            </span>
            <span className="eyebrow text-faint">{siteConfig.location.coordinates}</span>
          </div>

          <div className="mt-8 overflow-hidden rounded-[12px] border border-line bg-white p-2 shadow-sm">
            <iframe
              title="Jay Media Management Pvt. Ltd. Location Map — Central Mall, Biratnagar"
              src={siteConfig.location.mapEmbedUrl}
              className="h-[380px] w-full rounded-[8px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="mt-10 grid gap-8 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <span className="eyebrow text-faint">Visit</span>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {siteConfig.location.address}
                <br />
                {siteConfig.location.city}, {siteConfig.location.province}
              </p>
            </div>

            <div>
              <span className="eyebrow text-faint">Write</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-3 block break-all text-sm text-ink-soft transition-colors hover:text-accent"
              >
                {siteConfig.contact.email}
              </a>
            </div>

            <div>
              <span className="eyebrow text-faint">Follow</span>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-soft">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  Facebook
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
