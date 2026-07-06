"use client";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { clubs, shops } from "@/lib/clubs";

const ball = (fill: string, stroke: string) =>
  L.divIcon({
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    html: `<svg width="20" height="20" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="9" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
      <path d="M3.5 6 Q9 11 5 18" fill="none" stroke="#FBF8F0" stroke-width="1.4"/>
      <path d="M18.5 6 Q13 11 17 18" fill="none" stroke="#FBF8F0" stroke-width="1.4"/>
    </svg>`,
  });

const clubIcon = ball("#A8D05D", "#0F6B5B"); // vert lime — clubs partenaires
const shopIcon = ball("#B5603A", "#7A3A22");  // terre battue — magasins

export default function PartnersMap() {
  return (
    <MapContainer center={[46.7, 2.5]} zoom={5} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }} className="rounded-xl2">
      <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      {clubs.map((c, i) => (
        <Marker key={`c${i}`} position={[c.lat, c.lng]} icon={clubIcon}>
          <Tooltip direction="top" offset={[0, -8]}><span style={{ fontWeight: 700 }}>{c.city}</span></Tooltip>
        </Marker>
      ))}
      {shops.map((s, i) => (
        <Marker key={`s${i}`} position={[s.lat, s.lng]} icon={shopIcon}>
          <Tooltip direction="top" offset={[0, -8]}><span style={{ fontWeight: 700 }}>Magasin · {s.city}</span></Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
