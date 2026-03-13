import { 
  Bus, 
  Zap, 
  Footprints, 
  Dog, 
  Wifi, 
  Heart, 
  Moon, 
  ShieldCheck, 
  MapPin,
  Car,
  Wind,
  LucideIcon 
} from 'lucide-react';
import React from 'react';

export type FilterKey = 
  | 'PURPLE_BUS' 
  | 'GOV_ELECTRIC' 
  | 'WALK_TO_UP' 
  | 'PET_FRIENDLY' 
  | 'HIGH_SPEED_INTERNET' 
  | 'KIND_OWNER' 
  | 'QUIET_ZONE'
  | 'VERIFIED'
  | 'ZONE_FRONT_UP'
  | 'ZONE_MAE_KA'
  | 'PARKING'
  | 'AIR_CON';

export interface FilterMetadata {
  label: string;
  icon: LucideIcon;
  color: 'purple' | 'green' | 'blue' | 'orange' | 'cyan' | 'pink' | 'slate' | 'gold' | 'red';
  description?: string;
}

export const UP_FILTERS: Record<FilterKey, FilterMetadata> = {
  PURPLE_BUS: { 
    label: 'ใกล้รถเมล์ม่วง', 
    icon: Bus, 
    color: 'purple',
    description: 'หอพักที่ตั้งอยู่บนเส้นทางเดินรถเมล์ม่วงของมหาวิทยาลัย'
  },
  GOV_ELECTRIC: { 
    label: 'ค่าไฟหลวง', 
    icon: Zap, 
    color: 'green',
    description: 'คิดค่าไฟฟ้าตามอัตราการไฟฟ้าส่วนภูมิภาค ไม่มีบวกเพิ่ม'
  },
  WALK_TO_UP: { 
    label: 'เดินไป ม. ได้', 
    icon: Footprints, 
    color: 'blue',
    description: 'ตั้งอยู่ใกล้ประตูทางเข้าหน้ามหาวิทยาลัยในระยะเดินเท้า'
  },
  PET_FRIENDLY: { 
    label: 'เลี้ยงสัตว์ได้', 
    icon: Dog, 
    color: 'orange',
    description: 'อนุญาตให้เลี้ยงสัตว์เลี้ยงได้ภายใต้เงื่อนไขของหอพัก'
  },
  HIGH_SPEED_INTERNET: { 
    label: 'อินเทอร์เน็ตความเร็วสูง', 
    icon: Wifi, 
    color: 'cyan',
    description: 'ยืนยันความเร็วอินเทอร์เน็ตที่เสถียรสำหรับการเรียนออนไลน์'
  },
  KIND_OWNER: { 
    label: 'เจ้าของหอใจดี', 
    icon: Heart, 
    color: 'pink',
    description: 'ได้รับคะแนนรีวิวสูงในด้านการดูแลและอัธยาศัยของผู้ดูแล'
  },
  QUIET_ZONE: { 
    label: 'โซนเงียบสงบ', 
    icon: Moon, 
    color: 'slate',
    description: 'ตั้งอยู่ในทำเลที่ไม่มีเสียงรบกวนจากร้านค้าหรือถนนใหญ่'
  },
  VERIFIED: { 
    label: 'ตรวจสอบแล้ว', 
    icon: ShieldCheck, 
    color: 'gold',
    description: 'หอพักที่ผ่านการตรวจสอบมาตรฐานจากทีมงาน UP Dorm Hub'
  },
  ZONE_FRONT_UP: { 
    label: 'โซนหน้า ม.', 
    icon: MapPin, 
    color: 'purple',
    description: 'พื้นที่บริเวณหน้ามหาวิทยาลัยพะเยา'
  },
  ZONE_MAE_KA: { 
    label: 'โซนแม่กา', 
    icon: MapPin, 
    color: 'blue',
    description: 'พื้นที่บริเวณตำบลแม่กา'
  },
  PARKING: { 
    label: 'มีที่จอดรถ', 
    icon: Car, 
    color: 'slate',
    description: 'มีพื้นที่จอดรถยนต์หรือรถจักรยานยนต์เพียงพอ'
  },
  AIR_CON: { 
    label: 'ห้องแอร์', 
    icon: Wind, 
    color: 'cyan',
    description: 'ห้องพักมีเครื่องปรับอากาศติดตั้งทุุกห้อง'
  },
};

/**
 * Helper component to render a standardized UI badge for a filter key.
 */
export const FilterBadge = ({ 
  filterKey, 
  showIcon = true,
  size = 'md'
}: { 
  filterKey: FilterKey; 
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const metadata = UP_FILTERS[filterKey];
  if (!metadata) return null;

  const colorMap = {
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    green: 'bg-green-50 text-green-700 border-green-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    pink: 'bg-pink-50 text-pink-700 border-pink-100',
    slate: 'bg-slate-50 text-slate-700 border-slate-100',
    gold: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-100',
  };

  const sizeMap = {
    sm: 'px-2 py-0.5 text-[9px] rounded-md gap-1',
    md: 'px-3 py-1 text-[11px] rounded-xl gap-1.5',
    lg: 'px-4 py-2 text-xs rounded-2xl gap-2',
  };

  const Icon = metadata.icon;

  return (
    <div className={`
      inline-flex items-center font-black uppercase tracking-wider border transition-all
      ${colorMap[metadata.color]}
      ${sizeMap[size]}
    `}>
      {showIcon && <Icon size={size === 'sm' ? 10 : size === 'md' ? 14 : 18} strokeWidth={2.5} />}
      {metadata.label}
    </div>
  );
};
