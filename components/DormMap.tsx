'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default Leaflet marker icon not showing correctly in Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface DormMapProps {
  location: { lat: number; lng: number };
  name: string;
}

export default function DormMap({ location, name }: DormMapProps) {
  useEffect(() => {
    // Ensuring the map resizes correctly on mount
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div className="h-[400px] w-full rounded-[2rem] overflow-hidden shadow-inner border border-gray-200">
      <MapContainer 
        center={[location.lat, location.lng]} 
        zoom={15} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lng]} icon={icon}>
          <Popup>
            <div className="font-bold text-up-purple">{name}</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
