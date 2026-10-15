"use client";
import { useEffect, useState } from "react";
import { clubs, shops } from "@/lib/clubs";
import { supabase } from "@/lib/supabaseClient";
import { FRANCE_PATHS } from "@/lib/franceGeo";

// Carte de France fixe (SVG autonome, sans API externe) aux couleurs Recycl'ace.
// Contour issu de données ouvertes (world.geo.json). Points projetés depuis lat/lng réelles.

const W = 1000, H = 980;
const LON_MIN = -5.2, LON_MAX = 9.7, LAT_MIN = 41.2, LAT_MAX = 51.3;
const px = (lon: number) => ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W;
const py = (lat: number) => ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;

type Pt = { kind: string; city: string; lat: number; lng: number };

function Pin({ x, y, fill, stroke, label }: { x: number; y: number; fill: string; stroke: string; label: string }) {
  return (
    <g className="cursor-default">
      <title>{label}</title>
      <circle cx={x} cy={y} r="11" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <path d={`M${x - 7} ${y - 4} Q${x} ${y} ${x - 4} ${y + 6}`} fill="none" stroke="#FBF8F0" strokeWidth="1.6" />
      <path d={`M${x + 7} ${y - 4} Q${x} ${y} ${x + 4} ${y + 6}`} fill="none" stroke="#FBF8F0" strokeWidth="1.6" />
    </g>
  );
}

export default function FranceMap() {
  const [pts, setPts] = useState<Pt[] | null>(null);
  useEffect(() => {
    let on = true;
    supabase.from("map_points").select("kind,city,lat,lng").then(({ data }) => {
      if (on && data && data.length) setPts(data as any);
    }, () => {});
    return () => { on = false; };
  }, []);

  const clubPts: Pt[] = pts ? pts.filter((p) => p.kind === "club") : clubs.map((c) => ({ ...c, kind: "club" }));
  const shopPts: Pt[] = pts ? pts.filter((p) => p.kind === "shop") : shops.map((s) => ({ kind: "shop", city: s.city, lat: s.lat, lng: s.lng }));

  return (
    <div className="relative h-full w-full bg-[#eef3ee]">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Carte de France — clubs & magasins Recycl'ace">
        <defs>
          <linearGradient id="fr-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DCE8DC" /><stop offset="100%" stopColor="#CBDCC9" />
          </linearGradient>
        </defs>
        {FRANCE_PATHS.map((d, i) => (
          <path key={i} d={d} fill="url(#fr-fill)" stroke="#1F4A38" strokeWidth="2.5" strokeLinejoin="round" />
        ))}
        {clubPts.map((c, i) => <Pin key={`c${i}`} x={px(Number(c.lng))} y={py(Number(c.lat))} fill="#A8D05D" stroke="#0F6B5B" label={c.city} />)}
        {shopPts.map((s, i) => <Pin key={`s${i}`} x={px(Number(s.lng))} y={py(Number(s.lat))} fill="#B5603A" stroke="#7A3A22" label={`Magasin · ${s.city}`} />)}
      </svg>
    </div>
  );
}
