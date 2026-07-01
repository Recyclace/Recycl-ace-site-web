"use client";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

export default function ProcessPage() {
  const { lang } = useLang();
  const en = lang === "en";

  const steps = [
    {
      n: "01",
      title: en ? "Ball collection" : "Collecte des balles",
      body: en
        ? "Recycl'ace relies on the existing collection network, orchestrated by a dedicated eco-organisation, to recover the balls."
        : "Recycl'ace s'appuie sur le réseau de collecte existant orchestré par un écoorganisme spécifique, pour récupérer les balles.",
      img: "/assets/savoir/collecte.jpg",
    },
    {
      n: "02",
      title: en ? "Equipment design" : "Design des équipements",
      body: en
        ? "Recycl'ace designs its gear in-house, aiming for iconic pieces inspired by the world of tennis."
        : "Recycl'ace design ses équipements en interne et cherche à ce qu'ils soient iconiques, inspirés du milieu du tennis.",
      img: "/assets/savoir/design.jpg",
    },
    {
      n: "03",
      title: en ? "Production" : "Production",
      body: en
        ? "Recycl'ace chose local, responsible production with a French manufacturer with unique know-how, favouring short supply chains."
        : "Recycl'ace a fait le choix d'une production locale et raisonnée avec un industriel français bénéficiant d'un savoir-faire unique et favorisant les circuits courts.",
      img: "/assets/savoir/production.jpg",
    },
    {
      n: "04",
      title: en ? "Distribution" : "Distribution",
      body: en
        ? "Recycl'ace puts the gear back into players' hands, closing a complete loop of circularity in sport."
        : "Recycl'ace remet les équipements dans les mains des joueurs, ce qui permet d'instaurer une boucle de circularité complète dans le sport.",
      img: "/assets/photos/court-serve.jpg",
    },
  ];

  return (
    <div className="pb-10">
      {/* Intro : le problème */}
      <section className="bg-foret py-20 text-sable">
        <div className="container-x max-w-3xl">
          <span className="eyebrow text-lime">{en ? "A major ecological problem" : "Un problème écologique majeur"}</span>
          <h1 className="h-display mt-3 text-4xl md:text-5xl">
            {en ? "17 million balls thrown away every year." : "17 millions de balles jetées chaque année."}
          </h1>
          <p className="mt-5 text-lg text-sable/80">
            {en
              ? "Every year in France, around 17 million tennis balls are thrown away and incinerated — a major ecological problem. We set out to bring circularity to sport by recycling these balls into new, durable and high-performance sports equipment."
              : "Chaque année en France, près de 17 millions de balles de tennis sont jetées et incinérées, ce qui représente un problème écologique majeur. Nous cherchons à instaurer une circularité dans le sport en recyclant ces balles en nouveaux équipements sportifs durables et performants."}
          </p>
          <p className="mt-4 font-display text-lg text-lime" style={{ fontWeight: 700 }}>
            {en ? "The ball is in your court!" : "La balle est dans votre camp !"}
          </p>
        </div>
      </section>

      {/* Anatomie d'une balle */}
      <section className="container-x py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="h-display text-2xl text-encre md:text-3xl">
              {en ? "What is a tennis ball made of?" : "De quoi est constituée une balle de tennis ?"}
            </h2>
            <p className="mt-4 text-encre/70">
              {en
                ? "Two main materials: an outer felt (the fibre surface) and a rubber core. Both can be recovered and given a second life — that's the heart of our process."
                : "Deux matériaux principaux : la feutrine (la surface en fibre) et un cœur en caoutchouc. Les deux peuvent être valorisés et retrouver une seconde vie — c'est tout l'enjeu de notre procédé."}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl2 bg-sable shadow-card">
            <Image src="/assets/savoir/anatomie-balle.svg" alt={en ? "Tennis ball anatomy" : "Anatomie d'une balle de tennis"} width={640} height={420} className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* 4 piliers */}
      <section className="container-x pb-8">
        <div className="space-y-16">
          {steps.map((s, i) => (
            <div key={i} className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 bg-sable shadow-card">
                <Image src={s.img} alt={s.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-contain p-2" />
              </div>
              <div>
                <span className="font-display text-3xl text-lime" style={{ fontWeight: 800, WebkitTextStroke: "1px #1F4A38" }}>{s.n}</span>
                <h2 className="h-display mt-2 text-2xl text-encre md:text-3xl">{s.title}</h2>
                <p className="mt-3 text-encre/70">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
