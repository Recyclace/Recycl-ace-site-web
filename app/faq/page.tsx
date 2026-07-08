import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";
import { seedFaq } from "@/lib/faq";

export const revalidate = 300;
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.recyclace.com";

export const metadata: Metadata = {
  title: "FAQ — questions fréquentes",
  description: "Fabrication, performance, matériaux, livraison : toutes les réponses à vos questions sur les équipements Recycl'ace.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  let faqs = seedFaq as { question: string; answer: string }[];
  try {
    const { data } = await supabase.from("faq").select("question, answer").eq("active", true).order("sort");
    if (data && data.length) faqs = data;
  } catch {}

  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <div className="container-x py-16 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <span className="eyebrow">FAQ</span>
        <h1 className="h-display mt-3 text-3xl text-encre md:text-4xl">Questions fréquentes</h1>
        <div className="mt-8 divide-y divide-foret/10 border-t border-foret/10">
          {faqs.map((f, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-encre">
                {f.question}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-foret/20 text-foret transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 whitespace-pre-line text-encre/70">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
