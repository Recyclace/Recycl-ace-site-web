"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";

export default function CookieConsent() {
  const { lang } = useLang();
  const en = lang === "en";
  const [show, setShow] = useState(false);

  useEffect(() => {
    try { if (!localStorage.getItem("ra_cookies")) setShow(true); } catch {}
  }, []);
  const choose = (v: "accept" | "refuse") => {
    try { localStorage.setItem("ra_cookies", v); } catch {}
    setShow(false);
  };
  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl animate-fadeUp rounded-xl2 bg-encre/95 p-4 text-sable shadow-soft backdrop-blur sm:inset-x-auto sm:right-4 sm:left-auto sm:w-[26rem]">
      <p className="text-sm text-sable/85">
        {en
          ? "We use cookies to improve your experience. "
          : "Nous utilisons des cookies pour améliorer votre expérience. "}
        <Link href="/legal/politique-de-cookies" className="underline hover:text-lime">
          {en ? "Learn more" : "En savoir plus"}
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => choose("accept")} className="btn-accent px-4 py-2 text-xs">{en ? "Accept" : "Accepter"}</button>
        <button onClick={() => choose("refuse")} className="btn-outline border-sable/40 px-4 py-2 text-xs text-sable hover:bg-sable hover:text-encre">{en ? "Decline" : "Refuser"}</button>
      </div>
    </div>
  );
}
