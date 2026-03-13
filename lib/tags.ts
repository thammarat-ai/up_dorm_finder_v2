import { Zap, Bus, Footprints, Dog, Wifi, Heart, Moon, LucideIcon } from 'lucide-react';

export type TagKey = 
  | 'GOV_ELECTRIC' 
  | 'PURPLE_BUS_NEAR' 
  | 'WALK_TO_UP' 
  | 'PET_FRIENDLY' 
  | 'HIGH_SPEED_WIFI' 
  | 'KIND_OWNER' 
  | 'QUIET_ZONE';

export interface TagInfo {
  label: string;
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

export const DORM_TAGS: Record<TagKey, TagInfo> = {
  GOV_ELECTRIC: {
    label: 'ค่าไฟไฟหลวง',
    icon: Zap,
    colorClass: 'text-green-600',
    bgClass: 'bg-green-50',
    borderClass: 'border-green-100',
  },
  PURPLE_BUS_NEAR: {
    label: 'ใกล้รถเมล์ม่วง',
    icon: Bus,
    colorClass: 'text-up-purple',
    bgClass: 'bg-up-purple/5',
    borderClass: 'border-up-purple/10',
  },
  WALK_TO_UP: {
    label: 'เดินไป ม. ได้',
    icon: Footprints,
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-100',
  },
  PET_FRIENDLY: {
    label: 'เลี้ยงสัตว์ได้',
    icon: Dog,
    colorClass: 'text-orange-600',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-100',
  },
  HIGH_SPEED_WIFI: {
    label: 'เน็ตแรง (ยืนยันแล้ว)',
    icon: Wifi,
    colorClass: 'text-cyan-600',
    bgClass: 'bg-cyan-50',
    borderClass: 'border-cyan-100',
  },
  KIND_OWNER: {
    label: 'เจ้าของหอใจดี',
    icon: Heart,
    colorClass: 'text-pink-600',
    bgClass: 'bg-pink-50',
    borderClass: 'border-pink-100',
  },
  QUIET_ZONE: {
    label: 'โซนเงียบสงบ',
    icon: Moon,
    colorClass: 'text-slate-600',
    bgClass: 'bg-slate-50',
    borderClass: 'border-slate-100',
  },
};
