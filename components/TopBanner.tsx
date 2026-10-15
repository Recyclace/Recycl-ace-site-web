"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";

function IconLock() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
}
function IconTruck() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M1 4h13v11H1z" /><path d="M14 8h4l3 3v4h-7" /><circle cx="6" cy="18" r="2" /><circle cx="17.5" cy="18" r="2" /></svg>;
}
function IconGift() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="8" width="18" height="4" /><path d="M12 8v13M5 12v9h14v-9" /><path d="M12 8C12 8 11 3 8 3a2.5 2.5 0 0 0 0 5zM12 8s1-5 4-5a2.5 2.5 0 0 1 0 5z" /></svg>;
}

export default function TopBanner() {
  const { lang } = useLang();
  const en = lang === "en";
  const items = [
    { icon: <IconLock />, fr: "Paiement 100% sécurisé", en: "100% secure payment" },
    { icon: <IconTruck />, fr: "Livraison partout en France", en: "Delivery across France" },
    { icon: <IconGift />, fr: `Livraison offerte dès ${FREE_SHIPPING_THRESHOLD} €`, en: `Free shipping from ${FREE_SHIPPING_THRESHOLD} €` },
  ];
  const [i, setI] = useState(0);

  // Un seul message à la fois, qui tourne toutes les 6 secondes
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  const it = items[i];
  return (
    <div className="w-full bg-foret text-sable">
      <div className="container-x flex h-9 items-center justify-center overflow-hidden text-xs font-medium">
        <span key={i} className="inline-flex animate-fadeUp items-center gap-2 text-sable/90">
          <span className="text-lime">{it.icon}</span>{en ? it.en : it.fr}
        </span>
      </div>
    </div>
  );
}
