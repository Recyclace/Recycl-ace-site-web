import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase (navigateur, clé anon — publique et protégée par les règles RLS).
 * Les valeurs par défaut pointent vers le projet Recycl'ace ; on peut les surcharger via
 * les variables d'environnement NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://efugddifeqyvhbrtefid.supabase.co";
const anon =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdWdkZGlmZXF5dmhicnRlZmlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3OTk1MzksImV4cCI6MjA5ODM3NTUzOX0.8A93mgkt0uHQZCjC65tMNzeYrZRHvKKcQmMoG4XmNJI";

export const supabase = createClient(url, anon);
export const hasSupabase = true;
