'use client';

import { X, Bus, Zap, ShieldCheck, Dog, Car, Wifi, MapPin } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterPanel({ isOpen, onClose }: FilterPanelProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === 'false') {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string | null) => {
    router.push(`${pathname}?${createQueryString(name, value)}`, { scroll: false });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="px-6 py-4 bg-up-purple text-white flex justify-between items-center">
            <h2 className="text-xl font-bold">Search Filters</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
            {/* Budget Filters */}
            <section>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Zap size={16} /> Budget Persona
              </h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer">
                  <span className="font-medium text-gray-700">Gov. Electricity Rates</span>
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded-lg accent-up-purple"
                    checked={searchParams.get('govElect') === 'true'}
                    onChange={(e) => handleFilterChange('govElect', e.target.checked ? 'true' : null)}
                  />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer">
                  <span className="font-medium text-gray-700">No Maintenance Fee</span>
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded-lg accent-up-purple"
                    checked={searchParams.get('noMaint') === 'true'}
                    onChange={(e) => handleFilterChange('noMaint', e.target.checked ? 'true' : null)}
                  />
                </label>
              </div>
            </section>

            {/* Mobility Filters */}
            <section>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Bus size={16} /> Mobility Persona
              </h3>
              <div className="space-y-6">
                <label className="flex items-center justify-between p-4 bg-up-purple/5 border border-up-purple/10 rounded-2xl cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Bus className="text-up-purple" size={20} />
                    <span className="font-bold text-up-purple">Purple Bus Access</span>
                  </div>
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded-lg accent-up-purple"
                    checked={searchParams.get('purpleBus') === 'true'}
                    onChange={(e) => handleFilterChange('purpleBus', e.target.checked ? 'true' : null)}
                  />
                </label>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Distance to Front Gate</span>
                    <span className="text-sm font-bold text-up-purple">{searchParams.get('dist') || '2'} km</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="5" 
                    step="0.5"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-up-purple"
                    value={searchParams.get('dist') || '2'}
                    onChange={(e) => handleFilterChange('dist', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Lifestyle Filters */}
            <section>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <ShieldCheck size={16} /> Lifestyle Persona
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'pet', label: 'Pet-friendly', icon: <Dog size={18} /> },
                  { id: 'park', label: 'Car Parking', icon: <Car size={18} /> },
                  { id: 'wifi', label: 'High-speed Internet', icon: <Wifi size={18} /> },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 p-4 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-md accent-up-purple"
                      checked={searchParams.get(item.id) === 'true'}
                      onChange={(e) => handleFilterChange(item.id, e.target.checked ? 'true' : null)}
                    />
                    <span className="text-gray-400">{item.icon}</span>
                    <span className="font-medium text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <div className="absolute bottom-0 inset-x-0 p-6 bg-white border-t border-gray-100">
            <button 
              onClick={() => {
                router.push(pathname);
                onClose();
              }} 
              className="w-full bg-up-purple text-white font-black py-4 rounded-2xl shadow-lg shadow-up-purple/20"
            >
              See Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
