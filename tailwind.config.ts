import type { Config } from "tailwindcss";

/**
 * CHARTE GRAPHIQUE RECYCL'ACE — v1.0
 * Palette première (60·30·10) + ligne secondaire.
 * Pour ajuster une teinte : modifier ici ET dans app/globals.css (variables CSS).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Palette première ---
        foret:    "#1F4A38", // Vert Forêt — primaire / signature
        encre:    "#13302A", // Encre Forêt — texte sombre
        marine:   "#0D1B3D", // Bleu Marine — ancrage / confiance
        anthracite:"#2F2F2F",// Gris Anthracite — neutre / technique
        creme:    "#F2E7D6", // Crème — premium / base
        terre:    "#B5603A", // Terre Battue — argile / chaleur
        // --- Ligne secondaire (accents, CTA, chiffres) ---
        lime:     "#A8D05D", // Vert Lime — punch (sur fond foncé uniquement)
        emeraude: "#0F6B5B", // Vert Émeraude — fraîcheur / vivacité
        sauge:    "#A8B5A1", // Vert Sauge — appui / douceur
        parme:    "#D6C6E7", // Violet Parme — pop
        // --- Fonds ---
        sable:    "#FBF8F0", // fond de page clair (crème léger)
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
      },
      fontWeight: {
        display: "800",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(19,48,42,0.25)",
        card: "0 4px 24px -8px rgba(19,48,42,0.18)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        drawerIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        drawerIn: "drawerIn .35s cubic-bezier(.22,1,.36,1)",
        fadeUp: "fadeUp .7s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
