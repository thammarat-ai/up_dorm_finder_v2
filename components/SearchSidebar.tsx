'use client';

import { useState, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Check, Dog, Bus, Zap, Footprints, Users, UserRound, Building2 } from 'lucide-react';

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function SearchSidebar({ isMobile, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for price inputs
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  // Update URL params
  const updateParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  const handlePriceChange = () => {
    updateParams({ minPrice, maxPrice });
  };

  const toggleMultiFilter = (key: string, value: string) => {
    const currentParam = searchParams.get(key);
    let newValues = currentParam ? currentParam.split(',') : [];

    if (newValues.includes(value)) {
      newValues = newValues.filter((v) => v !== value);
    } else {
      newValues.push(value);
    }

    updateParams({ [key]: newValues.length > 0 ? newValues.join(',') : null });
  };

  const isChecked = (key: string, value: string) => {
    const currentParam = searchParams.get(key);
    if (!currentParam) return false;
    return currentParam.split(',').includes(value);
  };

  const SidebarContent = (
    <div className={`flex flex-col gap-8 bg-white ${isMobile ? 'p-6' : 'p-0'}`}>
      {/* Price Range Section */}
      <section>
        <h3 className="text-sm font-bold text-gray-800 mb-4">ช่วงราคา (ต่อเดือน)</h3>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1">
            <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">ต่ำสุด</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">฿</span>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                onBlur={handlePriceChange}
                placeholder="0"
                className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-up-purple outline-none"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">สูงสุด</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">฿</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                onBlur={handlePriceChange}
                placeholder="10,000"
                className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-up-purple outline-none"
              />
            </div>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="10000"
          step="500"
          value={maxPrice || 10000}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            updateParams({ maxPrice: e.target.value });
          }}
          className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-up-purple"
        />
      </section>

      {/* Popular Filters Section */}
      <section>
        <h3 className="text-sm font-bold text-gray-800 mb-4">ตัวกรองยอดนิยม (ม.พะเยา)</h3>
        <div className="space-y-3">
          {[
            { id: 'PURPLE_BUS_NEAR', icon: <Bus size={16} />, label: 'รถเมล์ม่วงผ่าน' },
            { id: 'WALK_TO_UP', icon: <Footprints size={16} />, label: 'เดินไป ม. ได้' },
            { id: 'GOV_ELECTRIC', icon: <Zap size={16} />, label: 'ค่าไฟหลวง' },
            { id: 'PET_FRIENDLY', icon: <Dog size={16} />, label: 'เลี้ยงสัตว์ได้' },
          ].map((filter) => (
            <label key={filter.id} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => toggleMultiFilter('tag', filter.id)}
                className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                  isChecked('tag', filter.id)
                    ? 'bg-up-purple border-up-purple'
                    : 'border-gray-300 group-hover:border-up-purple'
                }`}
              >
                {isChecked('tag', filter.id) && <Check size={14} className="text-white" />}
              </div>
              <div className="flex items-center gap-2">
                {filter.icon && (
                  <span className={`${isChecked('tag', filter.id) ? 'text-up-purple' : 'text-gray-400'} group-hover:text-up-purple transition-colors`}>
                    {filter.icon}
                  </span>
                )}
                <span className={`text-sm font-medium transition-colors ${isChecked('tag', filter.id) ? 'text-up-purple' : 'text-gray-600'}`}>
                  {filter.label}
                </span>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Property Type Section */}
      <section>
        <h3 className="text-sm font-bold text-gray-800 mb-4">ประเภทที่พัก</h3>
        <div className="space-y-3">
          {[
            { id: 'MIXED', label: 'หอพักรวม', count: 120, icon: <Users size={16} /> },
            { id: 'FEMALE', label: 'หอพักหญิง', count: 45, icon: <UserRound size={16} /> },
            { id: 'APARTMENT', label: 'อพาร์ตเมนต์', count: 30, icon: <Building2 size={16} /> },
          ].map((type) => (
            <label key={type.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div
                  onClick={() => toggleMultiFilter('type', type.id)}
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                    isChecked('type', type.id)
                      ? 'bg-up-purple border-up-purple'
                      : 'border-gray-300 group-hover:border-up-purple'
                  }`}
                >
                  {isChecked('type', type.id) && <Check size={14} className="text-white" />}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`${isChecked('type', type.id) ? 'text-up-purple' : 'text-gray-400'} group-hover:text-up-purple transition-colors`}>
                    {type.icon}
                  </span>
                  <span className={`text-sm font-medium transition-colors ${isChecked('type', type.id) ? 'text-up-purple' : 'text-gray-600'}`}>
                    {type.label}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-400 font-bold bg-gray-50 px-2 py-0.5 rounded-full">
                {type.count}
              </span>
            </label>
          ))}
        </div>
      </section>

      {isMobile && (
        <button
          onClick={onClose}
          className="mt-4 w-full bg-up-purple text-white font-bold py-4 rounded-xl shadow-lg shadow-up-purple/20"
        >
          ดูผลลัพธ์
        </button>
      )}
    </div>
  );

  if (isMobile) return SidebarContent;

  return (
    <aside className="w-64 shrink-0 sticky top-32 h-fit hidden lg:block">
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-up-purple tracking-tight">ตัวกรอง</h2>
          <button
            onClick={() => router.push(pathname)}
            className="text-xs font-bold text-up-purple hover:underline"
          >
            ล้างทั้งหมด
          </button>
        </div>
        {SidebarContent}
      </div>
    </aside>
  );
}