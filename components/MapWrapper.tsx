'use client';

import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/DormMap'), { 
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-[2rem] flex items-center justify-center text-gray-400">
      Loading Map...
    </div>
  )
});

interface MapWrapperProps {
  location: { lat: number; lng: number };
  name: string;
}

export default function MapWrapper({ location, name }: MapWrapperProps) {
  return <LeafletMap location={location} name={name} />;
}
