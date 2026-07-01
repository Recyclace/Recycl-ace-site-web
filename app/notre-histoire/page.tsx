"use client";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function StoryPage() {
  const { lang } = useLang();
  const en = lang === "en";

  const founders = [
    {
      photo: "/assets/team/pierre.png",
      name: "Pierre Salaun",
      role: en
        ? "Co-founder of Recycl'ace, passionate about tennis & padel. In charge of business development and the environmental impact study."
        : "Co-fondateur de Recycl'ace, passionné de tennis & padel. Responsable du développement commercial et de l'étude d'impact environnemental.",
      quote: en
        ? "As a tennis player deeply aware of ecological issues, I created Recycl'Ace to promote more sustainable practices and reduce environmental impact."
        : "En tant que joueur de tennis profondément conscient des enjeux écologiques, j'ai créé Recycl'Ace pour promouvoir des pratiques plus durables et réduire l'impact environnemental.",
    },
    {
      photo: "/assets/team/iouri.png",
      name: "Iouri d'Adhémar",
      role: en
        ? "Co-founder of Recycl'ace, passionate about tennis & padel. In charge of strategic & business development."
        : "Co-fondateur de Recycl'ace, passionné de tennis & padel. Responsable du développement stratégique & commercial.",
      quote: en
        ? "Passionate about tennis and determined to help this sport take part in the ecological transition, I decided to embark on the Recycl'Ace adventure with Pierre."
        : "Passionné de tennis et déterminé à aider ce sport à s'intégrer dans la transition écologique, j'ai décidé de me lancer dans l'aventure Recycl'Ace avec Pierre.",
    },
  ];

  const icons: Record<string, string> = {
    innov: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2h6c0-.8.4-1.5 1-2A7 7 0 0 0 12 2Z",
    local: "M12 21s-6-5.7-6-10a6 6 0 0 1 12 0c0 4.3-6 10-6 10Z M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    transp: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  };
  const values = en
    ? [
        { k: "innov", t: "Continuous innovation", d: "We aim to optimise the recyclability rate of our products and explore new materials from sports waste to maximise positive environmental impact." },
        { k: "local", t: "Local & responsible manufacturing", d: "We have chosen to favour local production to reduce the carbon footprint of all our equipment and help develop regional industrial know-how." },
        { k: "transp", t: "Transparency", d: "We ensure full transparency about our production processes and associated emissions. Our equipment is notably subject to Life Cycle Assessments (LCA) justifying a strongly reduced carbon impact." },
      ]
    : [
        { k: "innov", t: "Innovation continue", d: "Nous visons une optimisation du taux de recyclabilité de nos produits et explorons de nouveaux matériaux issus de déchets sportifs pour maximiser l'impact environnemental positif." },
        { k: "local", t: "Fabrication locale et raisonnée", d: "Nous avons fait le choix de favoriser une production locale pour réduire l'empreinte carbone de l'ensemble de nos équipements et d'aider à développer les savoir-faire industriels régionaux." },
        { k: "transp", t: "Transparence", d: "Nous assurons une transparence totale par rapport à nos processus de production et aux émissions associées. Nos équipements sont notamment soumis à des Analyses de Cycle de Vie (ACV) permettant de justifier un impact carbone fortement réduit." },
      ];

  return (
    <div className="pb-10">
      {/* Bannière duo */}
      <section className="container-x py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="eyebrow">{en ? "Our story" : "Notre histoire"}</span>
            <h1 className="h-display mt-3 text-4xl text-encre md:text-5xl">
              {en ? <>Recycl'ace is, above all,<br />a duo of enthusiasts.</> : <>Recycl'ace, c'est avant tout<br />un duo de passionnés.</>}
            </h1>
            <p className="mt-5 text-xl text-encre/70">
              {en
                ? "Pierre and Iouri – two teammates who want to bring circularity to sport."
                : "Pierre et Iouri – deux coéquipiers qui veulent instaurer une circularité dans le sport."}
            </p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full shadow-soft">
            <Image src="/assets/team/duo.jpg" alt="Pierre & Iouri" fill sizes="(max-width:768px) 100vw, 40vw" className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Le récit */}
      <section className="bg-foret py-16 text-sable">
        <div className="container-x max-w-3xl">
          <span className="eyebrow text-lime">{en ? "How it began" : "Le commencement"}</span>
          <p className="mt-4 text-lg text-sable/85">
            {en
              ? "Faced with a largely underestimated environmental issue in the world of sport, two tennis enthusiasts, Pierre and Iouri, decide to act. The short lifespan of balls and their composition make tennis and padel particularly polluting disciplines. They create Recycl'ace with the will to demonstrate that a circular and innovative approach can give balls a second life, while offering players high-performance and durable equipment."
              : "Face à un constat environnemental largement sous-estimé dans le monde du sport, deux passionnés de tennis, Pierre et Iouri, décident d'agir. La faible durée de vie des balles et leur composition font du tennis et du padel des disciplines particulièrement polluantes. Ils créent Recycl'ace avec la volonté de démontrer qu'une approche circulaire et innovante peut permettre de donner une seconde vie aux balles, tout en proposant des équipements performants et durables aux joueurs."}
          </p>
        </div>
      </section>

      {/* Les fondateurs */}
      <section className="container-x py-16">
        <h2 className="h-display mb-10 text-center text-3xl text-encre">{en ? "The founders" : "Les fondateurs"}</h2>
        <div className="grid gap-10 md:grid-cols-2">
          {founders.map((f) => (
            <div key={f.name} className="card flex flex-col items-center p-8 text-center">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image src={f.photo} alt={f.name} fill sizes="160px" className="object-cover" />
              </div>
              <h3 className="h-display mt-5 text-xl text-encre">{f.name}</h3>
              <p className="mt-2 text-sm text-encre/65">{f.role}</p>
              <p className="mt-4 border-t border-foret/10 pt-4 text-sm italic text-emeraude">« {f.quote} »</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="container-x pb-8">
        <span className="eyebrow">{en ? "Our values" : "Nos valeurs"}</span>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.t} className="card p-7">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-lime/20 text-emeraude">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={icons[v.k]} /></svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foret">{v.t}</h3>
              <p className="mt-2 text-sm text-encre/70">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-12 text-center">
        <Link href="/clubs" className="btn-primary">{en ? "Are you a club? Contact us" : "Vous êtes un Club ? Contactez-nous"}</Link>
      </section>
    </div>
  );
}
