# Recycl'ace — Site vitrine & e-commerce

Site Next.js 14 (App Router) + Tailwind CSS, avec panier, i18n FR/EN,
espace admin, et intégrations Supabase + Stripe.

## Démarrer
```bash
npm install
cp .env.example .env.local   # puis renseigner les clés
npm run dev                  # http://localhost:3000
```

## Charte graphique
Couleurs et typo (Poppins) définies dans `tailwind.config.ts` + `app/globals.css`
(variables CSS miroir). Issues de la charte officielle Recycl'ace v1.0.

## Structure
- `app/` — pages (Accueil, Nos équipements, Notre procédé, Notre histoire, Clubs, Contact, Admin)
- `components/` — Header, Footer, CartDrawer, Hero, carte clubs (Leaflet), carousel, formulaires…
- `context/` — `LanguageContext` (switch FR/EN instantané), `CartContext` (panier + badge)
- `lib/` — `products.ts` (catalogue), `i18n/dictionary.ts`, `clubs.ts`, `supabaseClient.ts`
- `supabase/schema.sql` — schéma de base de données

## Backend
- **Supabase** : exécuter `supabase/schema.sql`, puis renseigner `NEXT_PUBLIC_SUPABASE_URL` / `..._ANON_KEY`.
  Sans clés, le site fonctionne en mode démo (catalogue local, formulaires simulés).
- **Stripe** : renseigner `STRIPE_SECRET_KEY`. Le bouton « Continuer vers mon panier »
  crée une session Stripe Checkout. Sans clé, message d'info.
- **Admin** : `/admin`, code défini par `NEXT_PUBLIC_ADMIN_CODE` (défaut `recyclace2026`).

## Vidéo bannière
Placer une version web optimisée (H.264, < 15 Mo) dans `public/assets/videos/hero.mp4`.
En attendant, une photo (`court-play.jpg`) sert d'arrière-plan.

## Déploiement
Compatible Vercel (recommandé). `npm run build` puis déployer.
