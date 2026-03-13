'use client';

import React, { Suspense, useMemo } from 'react';
import { MapPin, ShieldCheck, Bus, Zap, ChevronRight, BadgeAlert, Dog, Footprints } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter} from 'next/navigation';
import { MOCK_DORMS } from '@/lib/mockDorms';
import { getDistanceFromGate } from '@/lib/utils';
import DormTag from '@/components/DormTag';
import SearchSidebar from '@/components/SearchSidebar';

function DormDirectory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const activeTags = useMemo(() => searchParams.get('tag')?.split(',').filter(Boolean) || [], [searchParams]);
  const activeTypes = useMemo(() => searchParams.get('type')?.split(',').filter(Boolean) || [], [searchParams]);
  const minPrice = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '100000');

  const filteredDorms = useMemo(() => {
    return MOCK_DORMS.filter((dorm) => {
      
      const q = searchParams.get('q')?.toLowerCase();
      if (q && !dorm.name.toLowerCase().includes(q) && !dorm.zone.toLowerCase().includes(q)) return false;

      if (dorm.monthlyPrice < minPrice || dorm.monthlyPrice > maxPrice) return false;


      if (activeTypes.length > 0) {
        const matchType = activeTypes.some(type => {
          if (type === 'FEMALE') return dorm.name.includes('หญิง');
          if (type === 'MIXED') return !dorm.name.includes('หญิง');
          
          return true;
        });
        if (!matchType) return false;
      }

      if (activeTags.length > 0) {
        const isMatchAll = activeTags.every((tag) => {
          switch (tag) {
            case 'GOV_ELECTRIC':
              return dorm.electricityType === 'GOVERNMENT_RATE';
            case 'PURPLE_BUS_NEAR':
              return (dorm.purpleBusDist || 1000) <= 300;
            case 'PET_FRIENDLY':
              return !!dorm.rules?.pets;
            case 'WALK_TO_UP':
              return dorm.zone === 'FRONT_UP_LEFT' || dorm.zone === 'FRONT_UP_RIGHT';
            case 'HIGH_SPEED_WIFI':
              return (dorm.internetScore || 0) >= 4.5;
            case 'KIND_OWNER':
              return (dorm.ownerScore || 0) >= 4.5;
            case 'QUIET_ZONE':
              return (dorm.noiseScore || 0) >= 4.5;
            default:
              return true;
          }
        });
        if (!isMatchAll) return false;
      }

      return true;
    });
  }, [searchParams, activeTags, activeTypes, minPrice, maxPrice]);

  const calculateMatchScore = (dorm: typeof MOCK_DORMS[0]) => {
    const base = 70;
    const internetBonus = (dorm.internetScore || 0) * 4;
    const verifiedBonus = dorm.isVerified ? 10 : 0;
    const busBonus = (dorm.purpleBusDist || 1000) < 300 ? 5 : 0;
    return Math.min(99, Math.round(base + internetBonus + verifiedBonus + busBonus));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Smart Tags Row */}
      <div className="sticky top-[132px] z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 overflow-x-auto no-scrollbar py-4 px-6">
        <div className="max-w-7xl mx-auto flex gap-3 whitespace-nowrap">
          <DormTag tagKey="PURPLE_BUS_NEAR" clickable />
          <DormTag tagKey="GOV_ELECTRIC" clickable />
          <DormTag tagKey="PET_FRIENDLY" clickable />
          <DormTag tagKey="WALK_TO_UP" clickable />
          <DormTag tagKey="HIGH_SPEED_WIFI" clickable />
          <DormTag tagKey="KIND_OWNER" clickable />
          <DormTag tagKey="QUIET_ZONE" clickable />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 py-6 px-4 lg:px-6">
        <SearchSidebar />

        <main className="flex-1 pb-32">
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-xl font-black text-up-purple uppercase tracking-tight">
              {searchParams.toString() ? 'ผลการกรอง' : 'รายชื่อหอพักแนะนำ'}
            </h2>
            <span className="text-xs font-bold text-gray-400 bg-white border border-gray-100 shadow-sm px-4 py-1.5 rounded-full">
              {filteredDorms.length} แห่ง
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            {filteredDorms.map((dorm) => {
              const matchScore = calculateMatchScore(dorm);
              const distanceText = getDistanceFromGate(dorm.lat, dorm.lng);
              const formattedPrice = dorm?.monthlyPrice?.toLocaleString() || '0';

              return (
                <Link key={dorm.id} href={`/dorm/${dorm.id}`}>
                  <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600`}
                        alt={dorm.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {dorm.isVerified && (
                        <div className="absolute top-5 left-5 bg-up-gold text-up-purple p-2 rounded-2xl shadow-lg border border-white/20">
                          <ShieldCheck size={20} strokeWidth={3} />
                        </div>
                      )}
                      <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-[1.25rem] flex items-center gap-2 shadow-lg">
                        <BadgeAlert size={15} className="text-up-gold animate-pulse" />
                        <span className="text-xs font-black text-up-purple uppercase tracking-tight">
                          {matchScore}% Match
                        </span>
                      </div>
                    </div>

                    <div className="p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                          <MapPin size={12} className="text-up-gold" />
                          {dorm.zone.replace(/_/g, ' ')} • <span className="text-up-purple font-black">{distanceText}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight group-hover:text-up-purple transition-colors">{dorm.name}</h3>

                        <div className="flex flex-wrap gap-2">
                          {dorm.electricityType === 'GOVERNMENT_RATE' && (
                            <div className="flex items-center gap-1.5 text-[10px] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-xl border border-green-100">
                              <Zap size={12} /> ค่าไฟหลวง
                            </div>
                          )}
                          {(dorm.purpleBusDist || 1000) < 300 && (
                            <div className="flex items-center gap-1.5 text-[10px] font-black text-up-purple bg-up-purple/5 px-3 py-1.5 rounded-xl border border-up-purple/10">
                              <Bus size={12} /> ใกล้รถม่วง
                            </div>
                          )}
                          {dorm.rules?.pets && (
                            <div className="flex items-center gap-1.5 text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl border border-up-purple/10">
                              <Dog size={12} /> เลี้ยงสัตว์ได้
                            </div>
                          )}
                          {(dorm.zone === 'FRONT_UP_LEFT' || dorm.zone === 'FRONT_UP_RIGHT') && (
                            <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-up-purple/10">
                              <Footprints size={12} /> เดินไป ม. ได้
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-8 flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-up-purple">฿{formattedPrice}</span>
                          <span className="text-xs text-gray-400 font-bold uppercase">/เดือน</span>
                        </div>
                        <div className="bg-gray-50 text-up-purple p-3 rounded-2xl group-hover:bg-up-purple group-hover:text-white transition-all shadow-sm">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredDorms.length === 0 && (
            <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BadgeAlert size={40} className="text-gray-200" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">ไม่พบข้อมูลหอพักที่ตรงตามเงื่อนไข</h3>
              <p className="text-sm text-gray-500 mb-8">ลองปรับเปลี่ยนตัวกรอง หรือค้นหาใหม่อีกครั้ง</p>
              <button
                onClick={() => router.push('/')}
                className="bg-up-purple text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-up-purple/20 transition-transform active:scale-95"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-up-purple font-black animate-pulse uppercase tracking-widest text-sm">กำลังโหลดข้อมูลหอพัก...</div>}>
      <DormDirectory />
    </Suspense>
  );
}
