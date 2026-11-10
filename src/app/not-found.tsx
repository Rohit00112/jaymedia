import Link from 'next/link';
import { ArrowLeft, Calendar, Newspaper, Users, Mail, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/navigation';
import { Footer } from '@/components/footer';

export const metadata = {
  title: 'Page Not Found (404) | Jay Media Management',
  description:
    'The requested page or record could not be found on the official Jay Media Management website.',
};

export default function NotFound() {
  const quickLinks = [
    {
      title: 'Upcoming Concerts & Events',
      description: 'Stadium live shows, Miss Koshi, and youth reality auditions.',
      href: '/events',
      icon: Calendar,
    },
    {
      title: 'Official News & Press',
      description: 'Production dispatches, press coverage, and announcements.',
      href: '/news',
      icon: Newspaper,
    },
    {
      title: 'Leadership & Roster',
      description: 'Meet Chairman Jay Raj Roy and CEO Neesha Khatiwada.',
      href: '/team',
      icon: Users,
    },
    {
      title: 'Contact & Inquiries',
      description: 'Reach our Central Mall studio in Biratnagar directly.',
      href: '/contact',
      icon: Mail,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-[75vh] bg-paper text-ink">
        <section className="relative overflow-hidden border-b border-line py-20 md:py-28">
          <div className="container-ed relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
              The page you requested does not exist.
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
              The page you requested may have been relocated, archived, or the
              URL might have been mistyped.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/" className="btn btn-primary">
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Homepage</span>
              </Link>
              <Link href="/events" className="btn btn-outline">
                <span>Explore Events</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16">
          <div className="container-ed mx-auto max-w-4xl">
            <h2 className="text-center font-mono text-xs uppercase tracking-wider text-muted">
              Suggested Destinations
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-xl border border-line bg-paper-deep p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/40 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-soft text-forest">
                        <Icon className="h-4 w-4" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
                    </div>
                    <h3 className="mt-3 font-semibold text-ink group-hover:text-forest">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

