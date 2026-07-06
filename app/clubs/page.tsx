"use client";
import { useState } from "react";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import ClubForm from "@/components/ClubForm";
import Newsletter from "@/components/Newsletter";

export default function ClubsPage() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const [openNote, setOpenNote] = useState(false);

  const note = en
    ? "Several certification and labelling schemes can be mobilised at local, regional and national levels by organisations engaged in an environmental approach. However, Recycl'ace cannot guarantee that these schemes will be obtained, which remains subject to the applicable eligibility criteria and to the sovereign assessment of the competent authorities or bodies."
    : "Plusieurs dispositifs de certification et de labellisation peuvent être mobilisés aux niveaux local, régional et national par les organismes engagés dans une démarche environnementale. Toutefois, Recycl'ace ne saurait garantir l'obtention de ces dispositifs, laquelle demeure soumise au respect des critères d'éligibilité applicables ainsi qu'à l'appréciation souveraine des autorités ou organismes compétents.";

  const benefits = [
    { icon: "M11 20A7 7 0 0 1 4 13C4 8 8 4 20 4c0 12-4 16-9 16Z M8 16c2-4 5-6 9-7",
      title: en ? "Reduce your carbon footprint and showcase your CSR commitment to your members" : "Réduisez votre impact carbone et mettez en avant votre engagement RSE auprès de vos adhérents" },
    { icon: "M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z M8.5 13.5 7 22l5-3 5 3-1.5-8.5",
      title: en ? "Score points towards labels and certifications with engaged organisations" : "Marquez des points pour obtenir des labellisations et certifications auprès d'organismes engagés",
      hoverNote: true },
    { icon: "M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.6 5.7 21l2.3-7.2-6-4.4h7.6z",
      title: en ? "Offer gear in your own image thanks to your logo on the Ace Gourde" : "Proposez des équipements à votre image grâce à votre logo sur la Ace Gourde" },
  ];

  const aobucPhotos = ["/assets/aobuc/aobuc-1.jpg", "/assets/aobuc/aobuc-4.jpg", "/assets/aobuc/aobuc-3.jpg", "/assets/aobuc/aobuc-2.jpg"];
  const verbatims = en
    ? ["They love the Ace Gourde, both visually and in terms of usefulness.", "The team is very friendly, professional and available."]
    : ["Ils adorent la Ace Gourde, tant visuellement qu'en termes d'utilité.", "L'équipe est très sympathique, professionnelle et disponible."];

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
            <div key={i} onClick={() => b.hoverNote && setOpenNote((v) => !v)}
              className={`group relative overflow-hidden rounded-xl2 bg-white p-7 shadow-card ${b.hoverNote ? "cursor-pointer" : ""}`}>
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

      {/* USE CASE — AOBUC */}
      <section className="bg-sable/70 py-16 md:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{en ? "Club use case" : "Cas concret club"}</span>
            <h2 className="h-display mt-3 text-3xl text-encre md:text-4xl">{en ? "The AOBUC Tennis Club did it" : "Le Tennis Club de l'AOBUC l'a fait"}</h2>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="grid grid-cols-2 gap-3">
              {aobucPhotos.map((src, i) => (
                <div key={src} className={`relative overflow-hidden rounded-xl2 shadow-card ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"}`}>
                  <Image src={src} alt="AOBUC × Recycl'ace" fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-encre/80">
                {en
                  ? "The club ordered Ace Gourde bottles personalised with its own logo for all its members, to thank them for their commitment throughout the year and to highlight the club's CSR engagement. They wanted to give meaning to ball collection and raise players' awareness in a fun way."
                  : "Le club a commandé des Ace Gourdes personnalisées à son logo pour l'ensemble de ses adhérents, afin de les remercier de leur engagement sur l'année et de mettre en avant l'engagement RSE du club. Ils voulaient donner du sens à la collecte des balles et sensibiliser de façon ludique les joueurs."}
              </p>
              <p className="mt-4 text-encre/80">
                {en
                  ? "The Recycl'ace team also came on-site during a key club event to present the approach and run a stand, raising players' awareness in a fun way with concrete recycling outlets. The club is delighted with the operation."
                  : "L'équipe Recycl'ace est également venue sur place lors d'un événement clé du club pour présenter la démarche et animer un stand, sensibilisant de façon ludique les joueurs grâce à des exutoires concrets. Le club est ravi de cette action."}
              </p>

              <div className="mt-6 space-y-3">
                {verbatims.map((v) => (
                  <blockquote key={v} className="rounded-xl2 border-l-4 border-lime bg-white p-4 text-sm italic text-emeraude shadow-card">« {v} »</blockquote>
                ))}
              </div>

              <div className="mt-8 rounded-xl2 bg-foret p-6 text-center text-sable">
                <p className="font-display text-lg" style={{ fontWeight: 700 }}>
                  {en ? "Want to offer this gear to your members too?" : "Vous voulez vous aussi proposer ces équipements à vos adhérents ?"}
                </p>
                <a href="#club-form" className="btn-accent mt-4 inline-flex">{en ? "Contact us!" : "Contactez-nous !"}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x">
        <div className="flex flex-col items-center justify-between gap-5 rounded-xl2 bg-foret px-8 py-10 text-center text-sable md:flex-row md:text-left">
          <p className="font-display text-2xl" style={{ fontWeight: 800 }}>{t.clubs.cta}</p>
          <a href="#club-form" className="btn-accent shrink-0">{t.clubs.send}</a>
        </div>
      </section>

      <section id="club-form" className="container-x scroll-mt-24 py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          <ClubForm />
          <div className="flex flex-col justify-center">
            <Newsletter variant="club" />
          </div>
        </div>
      </section>
    </div>
  );
}
