"use client";
import Image from "next/image";
import Link from "next/link";

type Badge = { label: string; bg: string; text: string };

export default function CatalogCard({
  href, image, title, subtitle, price, badge, madeInFrance = true,
}: {
  href: string; image: string; title: string; subtitle?: string; price?: string;
  badge?: Badge; madeInFrance?: boolean;
}) {
  return (
    <Link href={href} className="group flex w-[44vw] shrink-0 snap-start flex-col sm:w-[210px]">
      <div className="relative aspect-square overflow-hidden rounded-xl2 bg-sable shadow-card">
        <Image src={image} alt={title} fill sizes="(max-width:768px) 50vw, 22vw" className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
        {madeInFrance && (
          <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-semibold text-encre shadow-sm">
            <Image src="/assets/logos/flag-fr.svg" alt="" width={13} height={9} className="h-2.5 w-auto" />
            Made in France
          </span>
        )}
        {badge && (
          <span className="absolute right-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-sm" style={{ background: badge.bg, color: badge.text }}>
            {badge.label}
          </span>
        )}
      </div>
      <p className="mt-2.5 text-sm font-semibold text-encre group-hover:text-foret">{title}</p>
      {subtitle && <p className="text-xs text-encre/50">{subtitle}</p>}
      {price && <p className="mt-0.5 text-sm text-encre/70">{price}</p>}
    </Link>
  );
}
