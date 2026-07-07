import { supabase } from "@/lib/supabaseClient";

export type Review = { id: string; name: string; rating: number; text: string; approved: boolean; createdAt: number };

// Avis de référence (toujours affichés en plus de ceux de la base).
// Notes volontairement variées entre 4,5 et 5.
export const seedReviews: Review[] = [
  { id: "s1", name: "AOBUC Tennis Club", rating: 5, approved: true, createdAt: 0,
    text: "Le concept et le produit nous ont tapé dans l'œil." },
  { id: "s2", name: "CS Meaux", rating: 5, approved: true, createdAt: 0,
    text: "Une façon simple et sincère d'aborder les problématiques et les enjeux écologiques dans le tennis." },
  { id: "s3", name: "Jean T.", rating: 4.5, approved: true, createdAt: 0,
    text: "Des valeurs fortes autour du développement durable." },
  { id: "s4", name: "Virgile", rating: 5, approved: true, createdAt: 0,
    text: "Transparence dans le processus de production, sur les matériaux utilisés et sur la traçabilité." },
  { id: "s5", name: "JP", rating: 4.5, approved: true, createdAt: 0,
    text: "Très bonnes sensations au toucher avec l'anti-vibrateur, malgré un premier a priori qui s'est très vite effacé !" },
  { id: "s6", name: "Louis", rating: 5, approved: true, createdAt: 0,
    text: "Concept malin et bien exécuté. Enfin une marque de sport qui prend le sujet écolo au sérieux sans rien lâcher sur la qualité." },
  { id: "s7", name: "Marina D.", rating: 4.5, approved: true, createdAt: 0,
    text: "La gourde tient parfaitement au frais sur une partie et la prise en main avec le revêtement grip est vraiment agréable. Je la prends partout avec moi !" },
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
