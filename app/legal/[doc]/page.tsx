import { notFound } from "next/navigation";
import { legalDocs, getLegal } from "@/lib/legal";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ doc: d.slug }));
}

function isHeading(s: string) {
  if (/^\d+\.\s/.test(s)) return true;
  if (s.length < 55 && !/[.:;»]$/.test(s) && !/^[-•]/.test(s)) return true;
  return false;
}

export default function LegalPage({ params }: { params: { doc: string } }) {
  const doc = getLegal(params.doc);
  if (!doc) notFound();
  return (
    <div className="container-x max-w-3xl py-14 md:py-20">
      <h1 className="h-display text-3xl text-encre md:text-4xl">{doc.title}</h1>
      <p className="mt-2 text-sm text-encre/50">{doc.updated}</p>
      <div className="mt-8 space-y-3">
        {doc.paragraphs.map((p, i) =>
          isHeading(p) ? (
            <h2 key={i} className="pt-4 text-lg font-bold text-foret">{p}</h2>
          ) : (
            <p key={i} className="text-sm leading-relaxed text-encre/75">{p}</p>
          )
        )}
      </div>
    </div>
  );
}
