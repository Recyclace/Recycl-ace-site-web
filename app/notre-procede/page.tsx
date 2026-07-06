"use client";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import BallAnatomy from "@/components/BallAnatomy";

export default function ProcessPage() {
  const { lang } = useLang();
  const en = lang === "en";

  const steps = [
    { n: "01", title: en ? "Ball collection" : "Collecte des balles",
      body: en ? "Recycl'ace relies on the existing collection network, orchestrated by a dedicated eco-organisation, to recover the balls."
        : "Recycl'ace s'appuie sur le réseau de collecte existant orchestré par un écoorganisme spécifique, pour récupérer les balles.",
      img: "/assets/savoir/collecte.jpg" },
    { n: "02", title: en ? "Equipment design" : "Design des équipements",
      body: en ? "Recycl'ace designs its gear in-house, aiming for iconic pieces inspired by the world of tennis."
        : "Recycl'ace design ses équipements en interne et cherche à ce qu'ils soient iconiques, inspirés du milieu du tennis.",
      img: "/assets/savoir/design.jpg" },
    { n: "03", title: en ? "Production" : "Production",
      body: en ? "Recycl'ace chose local, responsible production with a French manufacturer with unique know-how, favouring short supply chains."
        : "Recycl'ace a fait le choix d'une production locale et raisonnée avec un industriel français bénéficiant d'un savoir-faire unique et favorisant les circuits courts.",
      img: "/assets/savoir/production.jpg" },
    { n: "04", title: en ? "Distribution" : "Distribution",
      body: en ? "Recycl'ace puts the gear back into players' hands, closing a complete loop of circularity in sport."
        : "Recycl'ace remet les équipements dans les mains des joueurs, ce qui permet d'instaurer une boucle de circularité complète dans le sport.",
      img: "/assets/photos/court-serve.jpg" },
  ];

  return (
    <div className="pb-4">
      <section className="bg-foret py-20 text-sable">
        <div className="container-x max-w-3xl">
          <span className="eyebrow text-lime">{en ? "A major ecological problem" : "Un problème écologique majeur"}</span>
          <h1 className="h-display mt-3 text-4xl md:text-5xl">
            {en ? "17 million balls thrown away every year." : "17 millions de balles jetées chaque année."}
          </h1>
          <p className="mt-5 text-lg text-sable/80">
            {en
              ? "Every year in France, around 17 million tennis balls are thrown away and incinerated — a major ecological problem. We set out to bring circularity to sport by recycling the balls into new, durable and high-performance sports equipment."
              : "Chaque année en France, près de 17 millions de balles de tennis sont jetées et incinérées, ce qui représente un problème écologique majeur. Nous cherchons à instaurer une circularité dans le sport en recyclant les balles en nouveaux équipements sportifs durables et performants."}
          </p>
          <p className="mt-4 font-display text-lg text-lime" style={{ fontWeight: 700 }}>
            {en ? "The ball is in your court!" : "La balle est dans votre camp !"}
          </p>
        </div>
      </section>

      {/* Matière première — schéma interactif sur fond vert foncé */}
      <section className="bg-encre py-16 text-sable md:py-20">
        <div className="container-x grid items-center gap-8 md:grid-cols-2">
          <div>
            <span className="eyebrow text-lime">{en ? "The raw material" : "La matière première"}</span>
            <h2 className="h-display mt-3 text-3xl md:text-4xl">
              {en ? "What is a tennis ball made of?" : "De quoi est constituée une balle de tennis ?"}
            </h2>
            <p className="mt-4 text-sable/80">
              {en
                ? "The ball is made of two main materials: the felt — the yellow cover, made of nylon — and the rubber core. It's precisely this core that we recycle."
                : "La balle est constituée de deux matériaux principaux : la feutrine, qui est l'enveloppe jaune, constituée de nylon, et le noyau en caoutchouc. C'est précisément ce noyau qu'on recycle."}
            </p>
            <p className="mt-3 text-sm text-lime/80">{en ? "Hover / tap the circles to learn more." : "Survolez / touchez les cercles pour en savoir plus."}</p>
          </div>
          <BallAnatomy />
        </div>
      </section>

      {/* 4 étapes */}
      <section className="container-x py-16 md:py-20">
        <div className="mb-12 text-center">
          <span className="eyebrow">{en ? "Our process" : "Notre processus"}</span>
          <h2 className="h-display mt-3 text-3xl text-encre md:text-4xl">{en ? "A second life for every ball" : "Une seconde vie pour l'ensemble des balles"}</h2>
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="group flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl2 shadow-card">
                <Image src={s.img} alt={s.title} fill sizes="(max-width:640px) 100vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-foret font-display text-sm text-lime" style={{ fontWeight: 800 }}>{s.n}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-encre">{s.title}</h3>
              <p className="mt-2 text-sm text-encre/70">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
