"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Track() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return; // on ne compte pas l'admin
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer: typeof document !== "undefined" ? document.referrer : null }),
    }).catch(() => {});
  }, [pathname]);
  return null;
}
