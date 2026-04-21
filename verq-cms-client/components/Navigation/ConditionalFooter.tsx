'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  // Hide footer on individual work pages
  if (/^\/works\/.+/.test(pathname)) return null;
  return (
    <div className="bg-[#101010] relative z-50">
      <Footer />
    </div>
  );
}
