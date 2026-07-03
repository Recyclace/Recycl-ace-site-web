import { supabase } from "@/lib/supabaseClient";

export type Review = { id: string; name: string; rating: number; text: string; approved: boolean; createdAt: number };

// Avis de référence (toujours affichés en plus de ceux de la base)
export const seedReviews: Review[] = [
  { id: "s1", name: "Camille R.", rating: 5, approved: true, createdAt: 0,
    text: "La gourde tient parfaitement au frais toute la journée et la prise en main avec le revêtement grip est vraiment agréable. Je ne joue plus sans." },
  { id: "s2", name: "Thomas L.", rating: 5, approved: true, createdAt: 0,
    text: "Le design m'a tapé dans l'œil dès la première photo. Savoir qu'elle est faite à partir de balles recyclées, c'est la cerise sur le gâteau." },
  { id: "s3", name: "Sarah M.", rating: 5, approved: true, createdAt: 0,
    text: "Concept malin et bien exécuté. Enfin une marque de sport qui prend le sujet écolo au sérieux sans rien lâcher sur la qualité." },
  { id: "s4", name: "Nicolas B.", rating: 5, approved: true, createdAt: 0,
    text: "Commandé un pack pour le club, tout le monde a accroché. Solide, élégant et fabriqué en France : rien à redire." },
];

// Avis validés publics (Supabase)
export async function loadApprovedReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews").select("*").eq("approved", true).order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((r: any) => ({ id: r.id, name: r.name, rating: r.rating, text: r.text, approved: r.approved, createdAt: new Date(r.created_at).getTime() }));
}

// Soumission d'un avis (non validé par défaut)
export async function submitReview(name: string, rating: number, text: string) {
  const { error } = await supabase.from("reviews").insert({ name, rating, text, approved: false });
  return { ok: !error, error: error?.message };
}
