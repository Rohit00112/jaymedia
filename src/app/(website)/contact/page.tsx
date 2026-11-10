import { Metadata } from 'next';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
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

export default function ContactPage() {
  const fullAddress = `${siteConfig.location.address}, ${siteConfig.location.city}, ${siteConfig.location.province}, ${siteConfig.location.country}`;
  const mapsHref = `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        eyebrow="Contact Us"
        title="Get in touch with our team."
        description="Whether you are planning a live event, inquiring about concert sponsorships, or registering for a production, our Biratnagar office is here to help."
        meta={[
          { label: 'Office', value: 'Central Mall, Biratnagar' },
          { label: 'Response Time', value: 'Within 1 business day' },
          { label: 'Hours', value: 'Sun–Fri, 10 AM – 6 PM' },
          { label: 'Phone', value: '9851143338 / 9802708000' },
        ]}
      />

      <section className="border-b border-line py-16 md:py-20">
        <div className="container-ed grid gap-10 lg:grid-cols-12">
          {/* Inquiry Form */}
          <Reveal className="lg:col-span-7">
            <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-ink">
                Send an Inquiry
              </h2>
              <p className="mt-1 text-sm text-muted">
                Share your event details, target dates, or sponsorship questions
                below.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          {/* Office Details */}
          <Reveal delay={0.08} as="aside" className="space-y-6 lg:col-span-5">
            <div className="rounded-xl border border-line bg-paper-deep/60 p-6 sm:p-7">
              <span className="text-xs font-semibold uppercase tracking-wider text-forest">
                Headquarters
              </span>
              <h2 className="mt-1.5 text-xl font-semibold text-ink">
                Central Mall, 1st Floor, Biratnagar
              </h2>

              <dl className="mt-5 divide-y divide-line text-sm">
                <div className="flex items-start gap-3 py-3.5 first:pt-0">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                  <div>
                    <dt className="text-xs font-medium text-muted">Address</dt>
                    <dd className="mt-0.5 text-ink">
                      <a
                        href={mapsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-forest"
                      >
                        {siteConfig.location.address},{' '}
                        {siteConfig.location.city},{' '}
                        {siteConfig.location.province},{' '}
                        {siteConfig.location.country}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-3.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                  <div>
                    <dt className="text-xs font-medium text-muted">Phone</dt>
                    <dd className="mt-0.5 flex flex-wrap gap-x-2 font-medium text-ink">
                      <a
                        href={`tel:${siteConfig.contact.phone}`}
                        className="transition-colors hover:text-forest"
                      >
                        {siteConfig.contact.phone}
                      </a>
                      <span className="text-muted">/</span>
                      <a
                        href={`tel:${siteConfig.contact.secondaryPhone}`}
                        className="transition-colors hover:text-forest"
                      >
                        {siteConfig.contact.secondaryPhone}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-3.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                  <div>
                    <dt className="text-xs font-medium text-muted">Email</dt>
                    <dd className="mt-0.5 text-ink">
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="break-all transition-colors hover:text-forest"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-3.5 last:pb-0">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                  <div>
                    <dt className="text-xs font-medium text-muted">
                      Working Hours
                    </dt>
                    <dd className="mt-0.5 text-ink">
                      Sunday &ndash; Friday, 10:00 AM &ndash; 6:00 PM
                      <span className="block text-xs text-muted">
                        Saturday by appointment
                      </span>
                    </dd>
                  </div>
                </div>
              </dl>

              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline mt-6 w-full"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="card-hover rounded-xl border border-line bg-white p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-forest">
                Brand Partnerships
              </span>
              <h3 className="mt-1.5 text-lg font-semibold text-ink">
                Concert &amp; pageant sponsorships.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Partnering on Eastern Echoes, Miss Koshi, or Nepal Kids Idol
                connects your brand with audiences across Koshi Province and
                national television.
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-link mt-4"
              >
                <span>Email partnership desk</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="bg-paper-deep/50 py-14 md:py-16">
        <div className="container-ed">
          <Reveal className="overflow-hidden rounded-xl border border-line bg-white">
            <iframe
              title="Jay Media Management Pvt. Ltd. Location Map — Central Mall, Biratnagar"
              src={siteConfig.location.mapEmbedUrl}
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
