"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";

export default function CheckoutSuccess() {
  const { clear } = useCart();
  const { lang } = useLang();
  const en = lang === "en";
  useEffect(() => { clear(); }, []);
  return (
    <div className="container-x py-24 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lime/20 text-3xl text-emeraude">✓</div>
      <h1 className="h-display mt-6 text-3xl text-encre md:text-4xl">{en ? "Thank you for your order!" : "Merci pour votre commande !"}</h1>
      <p className="mx-auto mt-4 max-w-lg text-encre/70">{en ? "Your payment was confirmed. You'll receive a confirmation email with your invoice and estimated delivery (7-10 days)." : "Votre paiement est confirmé. Vous allez recevoir un e-mail récapitulatif avec votre facture et le délai de livraison estimé (7 à 10 jours)."}</p>
      <p className="mt-2 font-display text-lg text-lime" style={{ fontWeight: 700 }}>{en ? "The ball is in your court!" : "La balle est dans votre camp !"}</p>
      <Link href="/nos-equipements" className="btn-primary mt-8 inline-flex">{en ? "Continue shopping" : "Continuer mes achats"}</Link>
    </div>
  );
}
