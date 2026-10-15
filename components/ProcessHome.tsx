"use client";
import { useLang } from "@/context/LanguageContext";
import BallAnatomy from "@/components/BallAnatomy";

export default function ProcessHome() {
  const { lang } = useLang();
  const en = lang === "en";

  const steps = en
    ? [
        { n: "01", t: "Ball collection", d: "We rely on the existing collection network to recover used tennis & padel balls." },
        { n: "02", t: "Equipment design", d: "We design our gear in-house, aiming for iconic pieces inspired by the sport." },
        { n: "03", t: "Local production", d: "Responsible, local production with a French manufacturer and short supply chains." },
        { n: "04", t: "Distribution", d: "The gear is put back into players' hands — a complete loop of circularity in sport." },
      ]
    : [
        { n: "01", t: "Collecte des balles", d: "Nous nous appuyons sur le réseau de collecte existant pour récupérer les balles de tennis & padel usagées." },
        { n: "02", t: "Design des équipements", d: "Nous concevons nos équipements en interne, iconiques et inspirés du milieu du sport." },
        { n: "03", t: "Production locale", d: "Production raisonnée et locale, avec un industriel français au savoir-faire unique et des circuits courts." },
        { n: "04", t: "Distribution", d: "Les équipements reviennent dans les mains des joueurs : une boucle de circularité complète." },
      ];

  return (
    <section id="notre-procede" className="scroll-mt-24 bg-gradient-to-b from-foret to-encre py-16 text-sable md:py-24">
      <div className="container-x">
        {/* Haut : 17M + schéma de la balle */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow text-lime">{en ? "Our process" : "Notre procédé"}</span>
            <h2 className="h-display mt-3 text-4xl leading-[1.05] md:text-5xl">
              {en ? <>17 million balls<br />thrown away every year.</> : <>17 millions de balles<br />jetées chaque année.</>}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-sable/80">
              {en
                ? "Every year in France, around 17 million tennis balls are thrown away and incinerated. We recover their rubber core to give it a second life: new, durable and high-performance sports gear, made locally."
                : "Chaque année en France, près de 17 millions de balles de tennis sont jetées et incinérées. Nous récupérons leur noyau en caoutchouc pour lui donner une seconde vie : de nouveaux équipements sportifs durables et performants, fabriqués localement."}
            </p>
            <p className="mt-4 font-display text-lg text-lime" style={{ fontWeight: 700 }}>
              {en ? "The ball is in your court!" : "La balle est dans votre camp !"}
            </p>
          </div>

          <div className="rounded-[1.75rem] bg-encre/40 p-5 ring-1 ring-sable/10 md:p-7">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[.18em] text-lime">{en ? "The raw material" : "La matière première"}</p>
            <p className="mb-4 text-sm text-sable/75">
              {en ? "A ball = nylon felt + a rubber core. It's precisely this core that we recycle." : "Une balle = feutrine en nylon + noyau en caoutchouc. C'est précisément ce noyau que l'on recycle."}
            </p>
            <BallAnatomy />
          </div>
        </div>

        {/* Bas : les 4 étapes + seconde vie, dans le même ensemble */}
        <div className="mt-14 border-t border-sable/15 pt-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <h3 className="h-display text-2xl md:text-3xl">{en ? "A second life for every ball" : "Une seconde vie pour chaque balle"}</h3>
            <p className="max-w-sm text-sm text-sable/70">{en ? "From the court back to the court — a complete circular loop." : "Du court au court — une boucle circulaire complète."}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-lime/30 pt-5">
                <span className="font-display text-lime" style={{ fontWeight: 800 }}>{s.n}</span>
                <h4 className="mt-2 text-lg font-semibold">{s.t}</h4>
                <p className="mt-2 text-sm text-sable/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
