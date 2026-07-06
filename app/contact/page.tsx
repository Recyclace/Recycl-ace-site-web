"use client";
import { useLang } from "@/context/LanguageContext";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const { t, lang } = useLang();
  const en = lang === "en";
  return (
    <div className="container-x py-14 md:py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h1 className="h-display mt-3 text-4xl text-encre md:text-5xl">
            {en ? "The ball is in your court!" : "La balle est dans votre camp !"}
          </h1>
          <p className="mt-5 text-lg text-encre/70">{t.contact.intro}</p>

          <div className="mt-10 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-emeraude">{t.contact.infoTitle}</h2>
            <a href="mailto:recyclace@gmail.com" className="flex items-center gap-3 text-lg text-encre hover:text-foret">
              <span className="text-emeraude">✉</span> recyclace@gmail.com
            </a>
            <a href="tel:+33686380896" className="flex items-center gap-3 text-lg text-encre hover:text-foret">
              <span className="text-emeraude">☎</span> +33 6 86 38 08 96
            </a>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://www.instagram.com/recycl_ace/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="grid h-11 w-11 place-items-center rounded-full border border-foret/20 text-foret transition-colors hover:border-emeraude hover:text-emeraude">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/recyclace" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-full border border-foret/20 text-foret transition-colors hover:border-emeraude hover:text-emeraude">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C20.4 8.65 22 10.6 22 14.1V21h-4v-6.1c0-1.46-.03-3.34-2.04-3.34-2.04 0-2.36 1.6-2.36 3.24V21H9z" /></svg>
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
