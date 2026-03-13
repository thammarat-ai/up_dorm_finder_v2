'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Home, Map as MapIcon, Heart, User, Search, SlidersHorizontal, LayoutGrid } from 'lucide-react';
import { useState, Suspense } from 'react';
import SearchSidebar from '@/components/SearchSidebar';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function Header() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <LayoutGrid className="text-up-purple" size={24} />
              <h1 className="text-xl font-black text-up-purple tracking-tight">UP Dorm Hub</h1>
            </Link>
            <button className="p-2 bg-gray-100 rounded-full text-gray-500">
              <User size={20} />
            </button>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 bg-gray-100 rounded-2xl flex items-center px-4 py-3 text-gray-400">
              <Search size={18} className="mr-2 text-up-purple" />
              <input 
                type="text" 
                placeholder="ค้นหาชื่อหอพัก หรือโซน..." 
                className="bg-transparent border-none outline-none text-gray-700 w-full text-sm font-medium"
                defaultValue={searchParams.get('q') || ''}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden bg-up-purple text-white p-3 rounded-2xl shadow-lg shadow-up-purple/20 transition-transform active:scale-90 relative"
            >
              <SlidersHorizontal size={20} />
              {(searchParams.get('minPrice') || searchParams.get('maxPrice') || searchParams.get('tag') || searchParams.get('type')) && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-up-gold rounded-full border-2 border-white shadow-sm" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-[3rem] shadow-2xl overflow-hidden transition-transform animate-in slide-in-from-bottom duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
               <h2 className="text-xl font-black text-up-purple">ตัวกรอง</h2>
               <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 rounded-full">
                 <Search size={20} className="rotate-45" /> {/* Close icon lookalike or use X */}
               </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              <SearchSidebar isMobile onClose={() => setIsFilterOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 pb-24`} suppressHydrationWarning>
        <Suspense fallback={<header className="h-20 bg-white animate-pulse" />}>
          <Header />
        </Suspense>

        {children}

        {/* Sticky Bottom Navigation */}
        <nav className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-8 py-4 z-40 safe-area-bottom shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <Link href="/" className="flex flex-col items-center gap-1 text-up-purple">
              <Home size={24} strokeWidth={2.5} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
            </Link>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-up-purple transition-colors">
              <MapIcon size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Map</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-up-purple transition-colors">
              <Heart size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Saved</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-up-purple transition-colors">
              <User size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
            </button>
          </div>
        </nav>
      </body>
    </html>
  );
}
