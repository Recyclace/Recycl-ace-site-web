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

  // 2 rangées : image (même format 4:5) + texte, à la même hauteur (items-stretch), avec touches peps
  const rows = [
    {
      img: "/assets/aobuc/aobuc-members.jpg",
      tint: "bg-lime/12",
      text: "text-encre/85",
      imgClass: "object-cover object-center",
      body: en
        ? "The club ordered Ace Gourde bottles personalised with its own logo for all its members, to thank them for their commitment throughout the year and to highlight the club's CSR engagement. They wanted to give meaning to ball collection and raise players' awareness in a fun way."
        : "Le club a commandé des Ace Gourdes personnalisées à son logo pour l'ensemble de ses adhérents, afin de les remercier de leur engagement sur l'année et de mettre en avant l'engagement RSE du club. Ils voulaient donner du sens à la collecte des balles et sensibiliser de façon ludique les joueurs.",
    },
    {
      img: "/assets/aobuc/aobuc-intervention.jpg",
      tint: "bg-sauge",
      text: "text-foret",
      imgClass: "object-cover object-top",
      reverse: true,
      body: en
        ? "The Recycl'ace team also came on-site during a key club event to present the approach and run a stand, raising players' awareness in a fun way with concrete recycling outlets. The club is delighted with the operation."
        : "L'équipe Recycl'ace est également venue sur place lors d'un événement clé du club pour présenter la démarche et animer un stand, sensibilisant de façon ludique les joueurs grâce à des exutoires concrets. Le club est ravi de cette action.",
    },
  ];

  const verbatims = en
    ? ["The concept and the product caught our eye.", "Players love the Ace Gourde, both visually and in everyday use.", "The team is very friendly, professional and available.", "Finally, gear that makes sense and champions circularity in sport."]
    : ["Le concept et le produit nous ont tapé dans l'œil.", "Les joueurs adorent la Ace Gourde, tant visuellement qu'en termes d'utilisation.", "L'équipe est très sympathique, professionnelle et disponible.", "Enfin des équipements qui ont du sens et qui valorisent la circularité dans le sport."];
  const vTints = ["border-lime", "border-terre", "border-emeraude", "border-parme"];

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

      {/* RETOUR TERRAIN — AOBUC */}
      <section className="bg-sable/70 py-16 md:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{en ? "Field feedback" : "Retour terrain"}</span>
            <h2 className="h-display mt-3 text-3xl text-encre md:text-4xl">{en ? "The AOBUC Tennis Club's feedback" : "Le retour d'expérience du Tennis Club de l'AOBUC"}</h2>
          </div>

          <div className="mx-auto mt-12 max-w-5xl space-y-6">
            {rows.map((r, i) => (
              <div key={i} className={`grid items-stretch gap-6 md:grid-cols-2 ${r.reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative min-h-[300px] w-full overflow-hidden rounded-xl2 bg-sable shadow-card">
                  <Image src={r.img} alt="AOBUC × Recycl'ace" fill sizes="(max-width:768px) 100vw, 45vw" className={r.imgClass} />
                </div>
                <div className={`flex items-center rounded-xl2 ${r.tint} p-6 text-center md:p-8 md:text-left`}>
                  <p className={r.text}>{r.body}</p>
                </div>
              </div>
            ))}

            {/* Verbatims peps */}
            <div className="pt-4">
              <p className="mb-4 text-center eyebrow">{en ? "In their words" : "Ils en parlent"}</p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {verbatims.map((v, i) => (
                  <blockquote key={i} className={`flex flex-col items-center rounded-xl2 border-t-4 ${vTints[i]} bg-white p-6 text-center shadow-card transition-transform hover:-translate-y-1`}>
                    <span className="font-display text-4xl leading-none text-lime" style={{ fontWeight: 800 }}>“</span>
                    <p className="mt-2 text-sm font-medium italic text-emeraude">{v}</p>
                  </blockquote>
                ))}
              </div>
            </div>

            <div className="rounded-xl2 bg-foret p-6 text-center text-sable">
              <p className="font-display text-lg" style={{ fontWeight: 700 }}>
                {en ? "Want to offer this gear to your members too?" : "Vous voulez vous aussi proposer ces équipements à vos adhérents ?"}
              </p>
              <a href="#club-form" className="btn-accent mt-4 inline-flex">{en ? "Contact us!" : "Contactez-nous !"}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire pleine largeur + newsletter clubs en dessous */}
      <section id="club-form" className="container-x scroll-mt-24 py-16">
        <div className="mx-auto max-w-4xl space-y-8">
          <ClubForm />
          <Newsletter variant="club" />
        </div>
      </section>
    </div>
  );
}
