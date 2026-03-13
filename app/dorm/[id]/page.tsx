import React from 'react';
import { MapPin, Phone, ArrowLeft, CheckCircle, Info, Star, Map as MapIcon, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_DORMS } from '@/lib/mockDorms';
import MapWrapper from '@/components/MapWrapper';
import DormTag from '@/components/DormTag';
import { TagKey } from '@/lib/tags';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DormDetailsPage({ params }: PageProps) {
  const { id } = await params;
  // Use MOCK_DORMS and string comparison for IDs
  const dorm = MOCK_DORMS.find((d) => d.id === id);

  if (!dorm) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Detail Header */}
      <div className="bg-up-purple text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-up-gold hover:text-white transition-colors mb-8 font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Directory
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-up-gold/80 text-sm font-bold uppercase tracking-widest mb-2">
                <MapPin size={16} />
                {dorm.zone.replace(/_/g, ' ')}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl md:text-5xl font-extrabold">{dorm.name}</h1>
                {dorm.isVerified && (
                  <div className="bg-up-gold text-up-purple p-2 rounded-2xl shadow-lg shrink-0">
                    <ShieldCheck size={24} strokeWidth={3} />
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 ${
                  dorm.monthlyPrice > 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                }`}>
                  <CheckCircle size={16} />
                  Available Now
                </div>
                <div className="flex items-center gap-1 text-up-gold">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s} 
                      size={16} 
                      fill={s <= (dorm.ownerScore || 0) ? "currentColor" : "none"} 
                    />
                  ))}
                  <span className="text-white text-sm ml-2">({dorm.ownerScore}/5)</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/20 text-center min-w-[220px]">
              <p className="text-up-gold text-[10px] font-black uppercase tracking-widest mb-1">Monthly Rent</p>
              <div className="flex items-center justify-center gap-1">
                <span className="text-4xl font-black text-white">฿{dorm.monthlyPrice}</span>
              </div>
              <p className="text-white/60 text-[10px] font-bold mt-2 uppercase">Deposit: ฿{dorm.deposit}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Gallery Placeholder */}
          <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
            <img 
              src={`https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1200`}
              alt={dorm.name} 
              className="w-full aspect-[16/9] object-cover"
            />
          </div>

          {/* Quick Stats / Tags Row */}
          <div className="flex flex-wrap gap-3">
             {dorm.electricityType === 'GOVERNMENT_RATE' && <DormTag tagKey="GOV_ELECTRIC" />}
             {(dorm.purpleBusDist || 1000) < 300 && <DormTag tagKey="PURPLE_BUS_NEAR" />}
             {dorm.rules?.pets && <DormTag tagKey="PET_FRIENDLY" />}
             {(dorm.internetScore || 0) > 4.5 && <DormTag tagKey="HIGH_SPEED_WIFI" />}
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-up-purple mb-8 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-up-gold rounded-full"></div>
              Dormitory Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">In-Room Amenities</h3>
                <div className="space-y-3">
                  {Object.entries(dorm.inRoom || {}).map(([key, value]) => (
                    value && (
                      <div key={key} className="flex items-center gap-3 text-gray-700 font-bold text-sm">
                        <CheckCircle size={14} className="text-green-500" />
                        {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      </div>
                    )
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Security & Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {dorm.securityFeatures.map((feature, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-500 border border-gray-100">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <h3 id="map-section" className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MapIcon size={24} className="text-up-purple" />
              Location on Map
            </h3>
            <MapWrapper location={{ lat: dorm.lat, lng: dorm.lng }} name={dorm.name} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border-2 border-up-gold/10 sticky top-32">
            <h3 className="text-2xl font-black text-up-purple mb-8">Contact Owner</h3>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4 p-5 bg-up-purple/5 rounded-[2rem] border border-up-purple/10">
                <div className="bg-up-purple p-4 rounded-2xl text-white shadow-lg shadow-up-purple/20">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Mobile Number</p>
                  <p className="text-xl font-black text-up-purple tracking-tight">081-XXX-XXXX</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-up-purple hover:bg-up-purple-light text-white font-black py-5 rounded-[2rem] transition-all shadow-xl shadow-up-purple/20 mb-4 text-sm uppercase tracking-widest">
              Message via Line
            </button>
            
            <a href="#map-section" className="w-full bg-white border-2 border-up-gold text-up-purple hover:bg-up-gold/10 font-black py-5 rounded-[2rem] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-center">
              View Directions
            </a>
          </div>

          <div className="bg-gradient-to-br from-up-purple to-up-purple-light p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
            <h4 className="text-xl font-black mb-3">UP Student Verified</h4>
            <p className="text-sm text-purple-100/80 leading-relaxed font-medium">
              This property has been inspected for fair electricity rates and safety standards.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
