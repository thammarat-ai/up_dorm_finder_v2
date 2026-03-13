'use client';

import { TagKey, DORM_TAGS } from '@/lib/tags';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface DormTagProps {
  tagKey: TagKey;
  clickable?: boolean;
}

export default function DormTag({ tagKey, clickable = false }: DormTagProps) {
  const tag = DORM_TAGS[tagKey];
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  if (!tag) return null;

  const currentTags = searchParams.get('tag')?.split(',').filter(Boolean) || [];
  const isActive = currentTags.includes(tagKey);

  const handleClick = () => {
    if (!clickable) return;
    
    const params = new URLSearchParams(searchParams.toString());
    let newTags = [...currentTags];

    if (isActive) {
      newTags = newTags.filter((t) => t !== tagKey);
    } else {
      newTags.push(tagKey);
    }

    if (newTags.length > 0) {
      params.set('tag', newTags.join(','));
    } else {
      params.delete('tag');
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const Icon = tag.icon;

  return (
    <button
      onClick={handleClick}
      disabled={!clickable}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all
        ${tag.bgClass} ${tag.colorClass} ${tag.borderClass}
        ${clickable ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-default'}
        ${isActive ? 'ring-2 ring-offset-1 ring-up-purple shadow-md scale-105' : 'opacity-90'}
      `}
    >
      <Icon size={12} strokeWidth={3} />
      {tag.label}
    </button>
  );
}