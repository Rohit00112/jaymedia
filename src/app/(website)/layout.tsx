import LenisProvider from '@/components/motion/LenisProvider';
import { Navbar } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </LenisProvider>
  );
}

