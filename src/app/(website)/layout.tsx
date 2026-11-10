import LenisProvider from '@/components/motion/LenisProvider';
import ScrollProgress from '@/components/motion/ScrollProgress';
import { Navbar } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-paper"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </LenisProvider>
  );
}
