"use client";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { sendForm } from "@/lib/email";
import { Input, Textarea } from "./Field";

export default function ClubForm() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const f = new FormData(e.currentTarget);
    const fields = {
      club: String(f.get("club") || ""),
      contact: String(f.get("contact") || ""),
      phone: String(f.get("phone") || ""),
      email: String(f.get("email") || ""),
      message: String(f.get("message") || ""),
    };
    const res = await sendForm("club_requests", fields, `Nouvelle demande Club — ${fields.club}`);
    setLoading(false);
    if (res.ok) setSent(true);
  };

  if (sent)
    return <div className="card p-8 text-center"><p className="text-xl font-semibold text-foret">✓ {t.contact.sent}</p></div>;

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6 md:p-8">
      <h3 className="h-display text-xl text-encre">{t.clubs.formTitle}</h3>
      <Input label={`${t.clubs.fClub} *`} name="club" required />
      <Input label={t.clubs.fContact} name="contact" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label={t.clubs.fPhone} name="phone" type="tel" />
        <Input label={`${t.clubs.fEmail} *`} name="email" type="email" required />
      </div>
      <Textarea label={t.clubs.fMessage} name="message" />
      <button disabled={loading} className="btn-primary w-full disabled:opacity-60">{loading ? "…" : t.clubs.send}</button>
    </form>
  );
}
