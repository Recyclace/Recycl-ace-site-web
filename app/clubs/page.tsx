"use client";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import ClubForm from "@/components/ClubForm";

export default function ClubsPage() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const [openNote, setOpenNote] = useState(false);

  const note = en
    ? "Several certification and labelling schemes can be mobilised at local, regional and national levels by organisations engaged in an environmental approach. However, Recycl'Ace cannot guarantee that these schemes will be obtained, which remains subject to the applicable eligibility criteria and to the sovereign assessment of the competent authorities or bodies."
    : "Plusieurs dispositifs de certification et de labellisation peuvent être mobilisés aux niveaux local, régional et national par les organismes engagés dans une démarche environnementale. Toutefois, Recycl'Ace ne saurait garantir l'obtention de ces dispositifs, laquelle demeure soumise au respect des critères d'éligibilité applicables ainsi qu'à l'appréciation souveraine des autorités ou organismes compétents.";

  const benefits = [
    { icon: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6",
      title: en ? "Showcase your CSR commitment to your members" : "Mettez en avant votre engagement RSE auprès de vos adhérents" },
    { icon: "M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.6 5.7 21l2.3-7.2-6-4.4h7.6z",
      title: en ? "Score points towards labels for engaged organisations" : "Marquez des points pour obtenir des labellisations pour les organismes engagés",
      hoverNote: true },
    { icon: "M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5",
      title: en ? "Offer gear in your committee's colours, with your logo on the Ace Gourde" : "Proposez des équipements à l'image du comité avec votre logo sur la Ace Gourde" },
  ];

  return (
    <div className="pb-10">
      <section className="bg-marine py-20 text-sable">
        <div className="container-x max-w-3xl">
          <span className="eyebrow text-lime">{t.clubs.eyebrow}</span>
          <h1 className="h-display mt-3 text-4xl md:text-5xl">{t.clubs.title}</h1>
          <p className="mt-5 text-lg text-sable/80">{t.clubs.intro}</p>
          <a href="#club-form" className="btn-accent mt-8 inline-flex">{t.clubs.cta}</a>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {benefits.map((b, i) => (
            <div
              key={i}
              onClick={() => b.hoverNote && setOpenNote((v) => !v)}
              className={`group relative overflow-hidden rounded-xl2 bg-white p-7 shadow-card ${b.hoverNote ? "cursor-pointer" : ""}`}
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-foret/10 text-foret">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={b.icon} /></svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-encre">{b.title}</h3>
              {b.hoverNote && (
                <>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emeraude">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                    {en ? "Hover / tap for details" : "Survolez / touchez pour le détail"}
                  </p>
                  <div className={`absolute inset-0 flex items-center overflow-y-auto bg-foret p-5 text-[11px] leading-relaxed text-sable transition-opacity duration-200 ${openNote ? "opacity-100" : "pointer-events-none opacity-0"} group-hover:pointer-events-auto group-hover:opacity-100`}>
                    <p>{note}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="container-x">
        <div className="flex flex-col items-center justify-between gap-5 rounded-xl2 bg-foret px-8 py-10 text-center text-sable md:flex-row md:text-left">
          <p className="font-display text-2xl" style={{ fontWeight: 800 }}>{t.clubs.cta}</p>
          <a href="#club-form" className="btn-accent shrink-0">{t.clubs.send}</a>
        </div>
      </section>

      <section id="club-form" className="container-x scroll-mt-24 py-16">
        <div className="mx-auto max-w-2xl"><ClubForm /></div>
      </section>
    </div>
  );
}
