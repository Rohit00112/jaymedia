import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { siteConfig } from '@/config/site';

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-paper py-16 md:py-20">
      <div className="container-ed">
        <div className="relative overflow-hidden rounded-[0.5rem] bg-forest px-6 py-12 text-cream md:px-12 md:py-16">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[100px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/30 to-transparent"
            aria-hidden="true"
          />

          <div className="relative flex items-center justify-between gap-6 border-b border-cream/15 pb-4">
            <span className="eyebrow flex items-center gap-2.5 text-gold">
              <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
              Next / Start a project
            </span>
            <span className="eyebrow hidden text-cream/70 sm:block">
              26.45° N / 87.27° E
            </span>
          </div>

          <div className="relative mt-10 grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 className="display max-w-[14ch] text-balance text-[clamp(2.4rem,5.6vw,5.6rem)] text-cream">
                  Let&apos;s make something{' '}
                  <span className="serif italic text-gold">unforgettable.</span>
                </h2>
              </Reveal>
            </div>

            <div className="self-end lg:col-span-4">
              <Reveal delay={100}>
                <p className="max-w-sm text-pretty text-sm leading-relaxed text-cream/70 md:text-[0.95rem]">
                  Tell us what you are imagining. We will bring the stage, the
                  production, and the crew to make it real.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link href="/contact" className="btn btn-white">
                    Start a conversation
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 border-b border-cream/35 pb-1 text-[13px] font-semibold text-cream transition-colors duration-300 hover:border-cream"
                  >
                    View capabilities
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="relative mt-12 grid gap-6 border-t border-cream/15 pt-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
              <div>
                <span className="eyebrow block text-cream/70">Studio</span>
                <p className="mt-2 text-sm text-cream/85">
                  {siteConfig.location.address}, {siteConfig.location.city}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
              <div>
                <span className="eyebrow block text-cream/70">Email</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-2 inline-block break-all text-sm text-cream/85 transition-colors duration-300 hover:text-cream"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            <div>
              <span className="eyebrow block text-cream/70">Follow</span>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-cream/85">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-cream"
                >
                  Facebook
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-cream"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
