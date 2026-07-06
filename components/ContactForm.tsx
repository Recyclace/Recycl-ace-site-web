"use client";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { sendForm } from "@/lib/email";
import { Input, Textarea } from "./Field";

export default function ContactForm() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const f = new FormData(e.currentTarget);
    const fields = {
      name: String(f.get("name") || ""),
      email: String(f.get("email") || ""),
      subject: String(f.get("subject") || ""),
      message: String(f.get("message") || ""),
    };
    const res = await sendForm("contacts", fields, `Contact site — ${fields.subject || fields.name}`);
    setLoading(false);
    if (res.ok) setSent(true);
  };

  if (sent)
    return <div className="card p-8 text-center"><p className="text-xl font-semibold text-foret">✓ {t.contact.sent}</p></div>;

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6 md:p-8">
      <Input label={t.contact.fName} name="name" required />
      <Input label={t.contact.fEmail} name="email" type="email" required />
      <Input label={t.contact.fSubject} name="subject" required />
      <Textarea label={t.contact.fMessage} name="message" required />
      <button disabled={loading} className="btn-primary w-full disabled:opacity-60">{loading ? "…" : t.contact.send}</button>
    </form>
  );
}
