import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-coral text-ink">
      <span
        className="display text-outline-dark pointer-events-none absolute -bottom-10 -right-6 hidden text-[26vw] leading-none opacity-40 lg:block"
        aria-hidden="true"
      >
        JAY
      </span>

      <div className="container-ed relative z-10 py-16 md:py-24">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-ink/60" aria-hidden="true" />
          <span className="eyebrow text-ink/85">Start a project</span>
        </div>

        <div className="mt-8 grid items-end gap-12 lg:grid-cols-12">
          <h2 className="display max-w-[13ch] text-[clamp(3rem,8.2vw,8rem)] lg:col-span-8">
            Let&apos;s make
            <br />
            <span className="serif text-[0.95em]">something</span>
            <br />
            unforgettable.
          </h2>

          <div className="flex flex-col items-start gap-7 lg:col-span-4 lg:pb-3">
            <p className="max-w-sm text-sm leading-relaxed text-ink/85 md:text-base">
              Tell us what you are imagining. We will bring the stage, the
              production, and the crew to make it real.
            </p>
            <Link href="/contact" className="btn btn-dark w-full sm:w-auto">
              Request a proposal
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-ink/20 pt-8 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink/60" />
            <div>
              <span className="eyebrow block text-ink/80">Studio</span>
              <p className="mt-2 text-sm text-ink">
                {siteConfig.location.address}, {siteConfig.location.city}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ink/60" />
            <div>
              <span className="eyebrow block text-ink/80">Email</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-2 block text-sm text-ink transition-opacity hover:opacity-70"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          <div>
            <span className="eyebrow block text-ink/80">Follow</span>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                Facebook
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
