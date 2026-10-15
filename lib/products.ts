import { Lang } from "@/lib/i18n/dictionary";

export type Badge = { fr: string; en: string };
export type BadgeStyle = { bg: string; text: string };
export type ProductColor = { key: string; name: { fr: string; en: string }; hex: string; images: string[]; badge?: Badge; badgeStyle?: BadgeStyle };
export type Accordion = { title: { fr: string; en: string }; body: { fr: string; en: string } };
export type Product = {
  id: string; slug: string; name: { fr: string; en: string }; price: number;
  category: { fr: string; en: string }; description: { fr: string; en: string };
  colors: ProductColor[]; accordions: Accordion[];
  badge?: Badge; badgeStyle?: BadgeStyle;
  dualColor?: boolean; noColor?: boolean; defaultColorKey?: string;
  // Catalogue V6
  menuLabel?: { fr: string; en: string };   // libellé court pour le menu / la ligne de catalogue
  tagline?: { fr: string; en: string };      // ligne secondaire discrète ("Fait à partir de balles")
  volume?: string;                            // ex. "75 cl"
  madeInFrance?: boolean;                     // affiche la puce "Made in France"
  highlight?: boolean;                        // mise en avant (ex. Composez votre duo)
  cardImage?: string;                         // visuel de carte dédié (ex. duo = 2 gourdes)
  perItemCount?: number;                      // nb d'unités par article (duo = 2) -> badge ×2
};

// Styles de badges réutilisables
export const BADGE_STYLES: Record<string, BadgeStyle> = {
  bestseller: { bg: "#A8D05D", text: "#13302A" },   // lime
  nouveaute: { bg: "#0F6B5B", text: "#FFFFFF" },     // émeraude
  edition: { bg: "#B49AD6", text: "#2E2147" },       // parme
  composez: { bg: "#B5603A", text: "#FFFFFF" },      // terre battue
  clubs: { bg: "#B49AD6", text: "#3A2B57" },
};

export const products: Product[] = [
  {
    "id": "ace-gourde",
    "slug": "ace-gourde",
    "name": {
      "fr": "Ace Gourde",
      "en": "Ace Gourde"
    },
    "menuLabel": { "fr": "Gourdes Ace", "en": "Ace bottles" },
    "tagline": { "fr": "Fait à partir de balles", "en": "Made from recycled balls" },
    "volume": "75 cl",
    "madeInFrance": true,
    "price": 29.95,
    "category": {
      "fr": "Gourde 100% écoconçue",
      "en": "100% eco-designed bottle"
    },
    "description": {
      "fr": "La première gourde dont le revêtement est fabriqué à partir de balles de tennis et de padel recyclées, éco-conçue en France.",
      "en": "The first bottle whose coating is made from recycled tennis and padel balls, eco-designed in France."
    },
    "colors": [
      {
        "key": "bleu",
        "name": {
          "fr": "Bleu Nuit",
          "en": "Night Blue"
        },
        "hex": "#0D1B3D",
        "images": [
          "/assets/produits/gourde-bleu-front.jpg",
          "/assets/produits/gourde-bleu-back.jpg",
          "/assets/produits/gourde-bleu-sp1.jpg",
          "/assets/produits/gourde-bleu-sp2.jpg",
          "/assets/produits/gourde-bleu-pack.jpg"
        ]
      },
      {
        "key": "turquoise",
        "name": {
          "fr": "Turquoise",
          "en": "Turquoise"
        },
        "hex": "#19A7A0",
        "images": [
          "/assets/produits/gourde-turquoise-front.jpg",
          "/assets/produits/gourde-turquoise-back.jpg",
          "/assets/produits/gourde-turquoise-sp1.jpg",
          "/assets/produits/gourde-turquoise-sp2.jpg",
          "/assets/produits/gourde-turquoise-pack.jpg"
        ]
      },
      {
        "key": "terre",
        "name": {
          "fr": "Terre Battue",
          "en": "Clay"
        },
        "hex": "#B5603A",
        "badge": { "fr": "Best seller", "en": "Best seller" },
        "badgeStyle": { "bg": "#A8D05D", "text": "#13302A" },
        "images": [
          "/assets/produits/gourde-terre-front.jpg",
          "/assets/produits/gourde-terre-back.jpg",
          "/assets/produits/gourde-terre-sp1.jpg",
          "/assets/produits/gourde-terre-sp2.jpg",
          "/assets/produits/gourde-terre-pack.jpg"
        ]
      },
      {
        "key": "lavande",
        "name": {
          "fr": "Lavande",
          "en": "Lavender"
        },
        "hex": "#B9A6D6",
        "badge": { "fr": "Exclusivité", "en": "Exclusive" },
        "badgeStyle": { "bg": "#B49AD6", "text": "#2E2147" },
        "images": [
          "/assets/produits/gourde-lavande-front.jpg",
          "/assets/produits/gourde-lavande-back.jpg",
          "/assets/produits/gourde-lavande-pack.jpg"
        ]
      }
    ],
    "accordions": [
      {
        "title": {
          "fr": "Description",
          "en": "Description"
        },
        "body": {
          "fr": "La Ace Gourde est la première gourde dont le revêtement est fabriqué à partir de balles de tennis et de padel recyclées, éco-conçue en France.\nLe revêtement anti-chocs prolonge la durée de vie de la gourde, améliore la prise en main et réduit son impact carbone. Il a la forme d'un grip de raquette, pour une meilleure sensation en main.\nRecycl'ace a réalisé une Analyse Cycle de Vie (ACV) démontrant un impact environnemental environ 3× moindre qu'une gourde classique comparable.",
          "en": "The Ace Gourde is the first bottle whose coating is made from recycled tennis and padel balls, eco-designed in France.\nThe shock-absorbing coating extends the bottle's lifespan, improves grip and cuts its carbon footprint. Shaped like a racket grip, it offers a better feel in hand.\nRecycl'ace carried out a Life Cycle Assessment (LCA) showing an environmental impact around 3× lower than a comparable classic bottle."
        }
      },
      {
        "title": {
          "fr": "Avantages produit",
          "en": "Product benefits"
        },
        "body": {
          "fr": "- Revêtement anti-chocs\n- Durée de vie accrue\n- Meilleure prise en main (revêtement en forme de grip de raquette)\n- Empreinte carbone fortement réduite (étude ACV réalisée)",
          "en": "- Shock-absorbing coating\n- Increased lifespan\n- Better grip (racket-grip-shaped coating)\n- Strongly reduced carbon footprint (LCA study carried out)"
        }
      },
      {
        "title": {
          "fr": "Fiche technique",
          "en": "Specifications"
        },
        "body": {
          "fr": "- Poids : 250 g\n- Contenance : 75 cl\n- Corps en aluminium 100% recyclé : n'altère pas les goûts ni les odeurs\n- Revêtement caoutchouc, jusqu'à 30% issu de balles de tennis recyclées (+ caoutchoucs naturel et synthétique)\n- Sans BPA ni phtalates\n- Revêtement intérieur vernis polyamide, sans résine époxy\n- Hauteur : 24 cm · Diamètre : 7,5 cm",
          "en": "- Weight: 250 g\n- Capacity: 75 cl\n- 100% recycled aluminium body: keeps taste and odour neutral\n- Rubber coating, up to 30% from recycled tennis balls (+ natural and synthetic rubber)\n- BPA & phthalate free\n- Polyamide varnish inner lining, epoxy-resin free\n- Height: 24 cm · Diameter: 7.5 cm"
        }
      },
      {
        "title": {
          "fr": "Conseils d'utilisation",
          "en": "Usage tips"
        },
        "body": {
          "fr": "- Avant la première utilisation, laver à l'eau savonneuse et sécher tête en bas\n- Ne pas utiliser au micro-ondes\n- Lavage à la main recommandé\n- Ne pas congeler\n- Éviter les liquides chauds ou bouillants",
          "en": "- Before first use, wash with soapy water and dry upside down\n- Do not microwave\n- Hand washing recommended\n- Do not freeze\n- Avoid hot or boiling liquids"
        }
      }
    ]
  },
  {
    "id": "ace-vibe",
    "slug": "ace-vibe",
    "defaultColorKey": "lavande",
    "name": {
      "fr": "Ace Vibe",
      "en": "Ace Vibe"
    },
    "menuLabel": { "fr": "Ace Vibe", "en": "Ace Vibe" },
    "tagline": { "fr": "Fait à partir de balles", "en": "Made from recycled balls" },
    "madeInFrance": true,
    "badge": { "fr": "Nouveauté", "en": "New" },
    "badgeStyle": { "bg": "#0F6B5B", "text": "#FFFFFF" },
    "price": 9.99,
    "category": {
      "fr": "Anti-vibrateur",
      "en": "Dampener"
    },
    "description": {
      "fr": "L'anti-vibrateur éco-conçu, moulé à partir de balles de tennis et de padel recyclées, développé en France.",
      "en": "The eco-designed dampener, moulded from recycled tennis and padel balls, developed in France."
    },
    "colors": [
      {
        "key": "bleu",
        "name": {
          "fr": "Bleu Nuit",
          "en": "Night Blue"
        },
        "hex": "#0D1B3D",
        "images": [
          "/assets/produits/vibe-bleu-pack.jpg",
          "/assets/produits/vibe-bleu-sp1.jpg",
          "/assets/produits/vibe-bleu-sp2.jpg",
          "/assets/produits/vibe-bleu-sp3.jpg",
          "/assets/produits/vibe-bleu-packseul.jpg",
          "/assets/produits/vibe-bleu-solo.jpg"
        ]
      },
      {
        "key": "turquoise",
        "name": {
          "fr": "Turquoise",
          "en": "Turquoise"
        },
        "hex": "#19A7A0",
        "images": [
          "/assets/produits/vibe-turquoise-pack.jpg",
          "/assets/produits/vibe-turquoise-sp1.jpg",
          "/assets/produits/vibe-turquoise-sp2.jpg",
          "/assets/produits/vibe-turquoise-sp3.jpg",
          "/assets/produits/vibe-turquoise-packseul.jpg",
          "/assets/produits/vibe-turquoise-solo.jpg"
        ]
      },
      {
        "key": "terre",
        "name": {
          "fr": "Terre Battue",
          "en": "Clay"
        },
        "hex": "#B5603A",
        "images": [
          "/assets/produits/vibe-terre-pack.jpg",
          "/assets/produits/vibe-terre-sp1.jpg",
          "/assets/produits/vibe-terre-sp2.jpg",
          "/assets/produits/vibe-terre-sp3.jpg",
          "/assets/produits/vibe-terre-packseul.jpg",
          "/assets/produits/vibe-terre-solo.jpg"
        ]
      },
      {
        "key": "lavande",
        "name": {
          "fr": "Lavande",
          "en": "Lavender"
        },
        "hex": "#B9A6D6",
        "images": [
          "/assets/produits/vibe-lavande-pack.jpg",
          "/assets/produits/vibe-lavande-sp1.jpg",
          "/assets/produits/vibe-lavande-sp2.jpg",
          "/assets/produits/vibe-lavande-sp3.jpg",
          "/assets/produits/vibe-lavande-packseul.jpg",
          "/assets/produits/vibe-lavande-solo.jpg"
        ]
      }
    ],
    "accordions": [
      {
        "title": {
          "fr": "Description",
          "en": "Description"
        },
        "body": {
          "fr": "Le Ace Vibe est un anti-vibrateur éco-conçu, fabriqué à partir de balles de tennis et de padel recyclées, développé en France par Recycl'ace.\nPensé pour améliorer le confort de jeu, il absorbe efficacement les vibrations à l'impact, réduisant les sensations désagréables dans le bras tout en préservant les performances du joueur.\nSon matériau recyclé lui confère une excellente durabilité et un toucher unique. Léger et facile à installer, il s'intègre parfaitement à votre raquette sans altérer son équilibre.",
          "en": "The Ace Vibe is an eco-designed dampener, made from recycled tennis and padel balls, developed in France by Recycl'ace.\nDesigned to improve playing comfort, it effectively absorbs impact vibrations, reducing unpleasant sensations in the arm while preserving performance.\nIts recycled material gives it excellent durability and a unique feel. Light and easy to install, it fits perfectly on your racket without affecting its balance."
        }
      },
      {
        "title": {
          "fr": "Avantages produit",
          "en": "Product benefits"
        },
        "body": {
          "fr": "- Réduction efficace des vibrations pour un meilleur confort de jeu\n- Conçu à partir de balles de tennis et de padel recyclées\n- Démarche éco-responsable, impact environnemental réduit\n- Léger et discret, n'altère pas l'équilibre de la raquette\n- Bonne durabilité grâce à un matériau robuste\n- Fabrication française",
          "en": "- Effective vibration reduction for better comfort\n- Made from recycled tennis and padel balls\n- Eco-responsible approach, reduced impact\n- Light and discreet, doesn't affect racket balance\n- Good durability thanks to a robust material\n- French manufacturing"
        }
      },
      {
        "title": {
          "fr": "Fiche technique",
          "en": "Specifications"
        },
        "body": {
          "fr": "- Poids : 3 g\n- Diamètre : 2,9 cm · Hauteur : 0,8 cm\n- Conforme aux normes européennes (REACH)\n- Composition : caoutchouc issu de balles de tennis & padel recyclées, caoutchouc synthétique et naturel\n- Produit à faible impact écologique",
          "en": "- Weight: 3 g\n- Diameter: 2.9 cm · Height: 0.8 cm\n- Compliant with European standards (REACH)\n- Composition: rubber from recycled tennis & padel balls, synthetic and natural rubber\n- Low ecological impact"
        }
      },
      {
        "title": {
          "fr": "Conseils d'utilisation",
          "en": "Usage tips"
        },
        "body": {
          "fr": "- Installer l'anti-vibrateur entre les cordes centrales, en bas du tamis\n- Vérifier régulièrement son bon maintien avant de jouer\n- Nettoyer à l'aide d'un chiffon humide si nécessaire\n- Ne pas mâcher ni avaler · tenir hors de portée des jeunes enfants\n- Éviter une exposition prolongée à des températures extrêmes",
          "en": "- Install the dampener between the central strings, at the bottom of the string bed\n- Regularly check it is properly secured before playing\n- Clean with a damp cloth if needed\n- Do not chew or swallow · keep away from children\n- Avoid prolonged exposure to extreme temperatures"
        }
      }
    ]
  },
  {
    "id": "ace-pack",
    "slug": "ace-pack",
    "defaultColorKey": "terre",
    "name": {
      "fr": "Pack Ace",
      "en": "Ace Pack"
    },
    "menuLabel": { "fr": "Pack Ace", "en": "Ace Pack" },
    "madeInFrance": true,
    "price": 34.99,
    "category": {
      "fr": "La gourde + l'anti-vibrateur",
      "en": "Bottle + dampener"
    },
    "description": {
      "fr": "Le combo essentiel : la Ace Gourde accompagnée d'une boîte d'Ace Vibe. L'équipement complet du joueur éco-responsable.",
      "en": "The essential combo: the Ace Gourde paired with a box of Ace Vibe. The complete kit for the eco-responsible player."
    },
    "colors": [
      {
        "key": "bleu",
        "name": {
          "fr": "Bleu Nuit",
          "en": "Night Blue"
        },
        "hex": "#0D1B3D",
        "images": [
          "/assets/produits/pack-bleu-main.jpg",
          "/assets/produits/pack-bleu-1.jpg"
        ]
      },
      {
        "key": "turquoise",
        "name": {
          "fr": "Turquoise",
          "en": "Turquoise"
        },
        "hex": "#19A7A0",
        "images": [
          "/assets/produits/pack-turquoise-main.jpg",
          "/assets/produits/pack-turquoise-1.jpg"
        ]
      },
      {
        "key": "terre",
        "name": {
          "fr": "Terre Battue",
          "en": "Clay"
        },
        "hex": "#B5603A",
        "images": [
          "/assets/produits/pack-terre-main.jpg",
          "/assets/produits/pack-terre-1.jpg"
        ]
      },
      {
        "key": "lavande",
        "name": {
          "fr": "Lavande",
          "en": "Lavender"
        },
        "hex": "#B9A6D6",
        "images": [
          "/assets/produits/pack-lavande-main.jpg",
          "/assets/produits/pack-lavande-1.jpg"
        ]
      }
    ],
    "accordions": [
      {
        "title": {
          "fr": "Description",
          "en": "Description"
        },
        "body": {
          "fr": "Le combo essentiel pour jouer durable : la Ace Gourde et une boîte d'Ace Vibe, façonnées dans nos balles de tennis et de padel recyclées, fabriquées en France.\nLe geste éco-responsable complet, dans un coloris coordonné au choix.",
          "en": "The essential combo to play sustainably: the Ace Gourde and a box of Ace Vibe, crafted from our recycled tennis and padel balls, made in France.\nThe complete eco-responsible kit, in a coordinated colour of your choice."
        }
      },
      {
        "title": {
          "fr": "Contenu du pack",
          "en": "Pack contents"
        },
        "body": {
          "fr": "- 1 Ace Gourde (75 cl · aluminium 100% recyclé · revêtement balles recyclées)\n- 1 Ace Vibe (anti-vibrateur · caoutchouc de balles recyclées)\n- Coloris coordonné au choix · fabrication française",
          "en": "- 1 Ace Gourde (75 cl · 100% recycled aluminium · recycled-ball coating)\n- 1 Ace Vibe (dampener · recycled-ball rubber)\n- Coordinated colour of your choice · French manufacturing"
        }
      }
    ]
  },
  {
    "id": "ace-gourde-pack-duo",
    "slug": "ace-gourde-pack-duo",
    "defaultColorKey": "turquoise",
    "name": {
      "fr": "Composez votre duo",
      "en": "Build your duo"
    },
    "menuLabel": { "fr": "Composez votre duo", "en": "Build your duo" },
    "price": 49.99,
    "category": {
      "fr": "Duo de gourdes à personnaliser",
      "en": "Customisable bottle duo"
    },
    "badge": { "fr": "Composez-le", "en": "Build it" },
    "badgeStyle": { "bg": "#B5603A", "text": "#FFFFFF" },
    "madeInFrance": true,
    "dualColor": true,
    "highlight": true,
    "perItemCount": 2,
    "cardImage": "/assets/produits/duo-hero.jpg",
    "description": {
      "fr": "Deux Ace Gourde, deux coloris à choisir indépendamment : à partager en double ou à offrir.",
      "en": "Two Ace Gourde, two colours chosen independently: to share in doubles or to gift."
    },
    "colors": [
      {
        "key": "bleu",
        "name": {
          "fr": "Bleu Nuit",
          "en": "Night Blue"
        },
        "hex": "#0D1B3D",
        "images": [
          "/assets/produits/gourde-bleu-front.jpg"
        ]
      },
      {
        "key": "turquoise",
        "name": {
          "fr": "Turquoise",
          "en": "Turquoise"
        },
        "hex": "#19A7A0",
        "images": [
          "/assets/produits/gourde-turquoise-front.jpg"
        ]
      },
      {
        "key": "terre",
        "name": {
          "fr": "Ocre Terre Battue",
          "en": "Clay Ochre"
        },
        "hex": "#B5603A",
        "images": [
          "/assets/produits/gourde-terre-front.jpg"
        ]
      },
      {
        "key": "lavande",
        "name": {
          "fr": "Lavande",
          "en": "Lavender"
        },
        "hex": "#B9A6D6",
        "images": [
          "/assets/produits/gourde-lavande-front.jpg"
        ]
      }
    ],
    "accordions": [
      {
        "title": {
          "fr": "Description",
          "en": "Description"
        },
        "body": {
          "fr": "Deux Ace Gourde dans un pack avantageux, avec choix indépendant des deux coloris. Le geste éco-responsable se joue à deux.\nChaque gourde conserve toutes les qualités de la Ace Gourde : aluminium 100% recyclé, revêtement issu de balles recyclées, éco-conçue en France.",
          "en": "Two Ace Gourde in a great-value pack, with two independently chosen colours. The eco gesture is better played as a pair.\nEach bottle keeps all the qualities of the Ace Gourde: 100% recycled aluminium, recycled-ball coating, eco-designed in France."
        }
      },
      {
        "title": {
          "fr": "Contenu du pack",
          "en": "Pack contents"
        },
        "body": {
          "fr": "- 2 Ace Gourde (75 cl chacune)\n- Aluminium 100% recyclé · revêtement balles recyclées\n- Choix indépendant des 2 coloris\n- Fabrication française",
          "en": "- 2 Ace Gourde (75 cl each)\n- 100% recycled aluminium · recycled-ball coating\n- Independent choice of the 2 colours\n- French manufacturing"
        }
      }
    ]
  },
  {
    "id": "ace-vibe-boite-50",
    "slug": "ace-vibe-boite-de-50",
    "name": {
      "fr": "Ace Vibe — Boîte de 50",
      "en": "Ace Vibe — Box of 50"
    },
    "price": 119.99,
    "category": {
      "fr": "Lot de 50",
      "en": "Pack of 50"
    },
    "madeInFrance": true,
    "noColor": true,
    "badge": {
      "fr": "Pour les clubs",
      "en": "For clubs"
    },
    "badgeStyle": {
      "bg": "#B49AD6",
      "text": "#3A2B57"
    },
    "description": {
      "fr": "La solution clubs : 50 anti-vibrateurs Ace Vibe pour équiper vos adhérents, animer un tournoi ou valoriser votre démarche RSE.",
      "en": "The club solution: 50 Ace Vibe dampeners to equip your members, run a tournament or showcase your CSR approach."
    },
    "colors": [
      {
        "key": "assorti",
        "name": {
          "fr": "Assortiment",
          "en": "Assorted"
        },
        "hex": "#A8D05D",
        "images": [
          "/assets/produits/lot-1.jpg",
          "/assets/produits/lot-special.jpg",
          "/assets/produits/lot-2.jpg"
        ]
      }
    ],
    "accordions": [
      {
        "title": {
          "fr": "Description",
          "en": "Description"
        },
        "body": {
          "fr": "50 anti-vibrateurs Ace Vibe conditionnés pour les clubs : idéal pour équiper vos adhérents, doter un tournoi ou animer un évènement.\nPersonnalisation possible sur devis. Chaque Ace Vibe est façonné en France à partir de balles de tennis et de padel recyclées.",
          "en": "50 Ace Vibe dampeners packaged for clubs: ideal to equip your members, supply a tournament or animate an event.\nCustomisation available on quote. Each Ace Vibe is crafted in France from recycled tennis and padel balls."
        }
      },
      {
        "title": {
          "fr": "Avantages",
          "en": "Benefits"
        },
        "body": {
          "fr": "- 50 × Ace Vibe\n- Personnalisation possible sur devis\n- Idéal tournois, dotations et cadeaux d'adhésion\n- Valorise votre démarche RSE\n- Fabrication française",
          "en": "- 50 × Ace Vibe\n- Customisation available on quote\n- Ideal for tournaments, gifts and membership perks\n- Showcases your CSR approach\n- French manufacturing"
        }
      },
      {
        "title": {
          "fr": "Fiche technique",
          "en": "Specifications"
        },
        "body": {
          "fr": "- 50 anti-vibrateurs (3 g · Ø 2,9 cm)\n- Caoutchouc issu de balles de tennis & padel recyclées\n- Conforme REACH · faible impact écologique",
          "en": "- 50 dampeners (3 g · Ø 2.9 cm)\n- Rubber from recycled tennis & padel balls\n- REACH compliant · low ecological impact"
        }
      }
    ]
  }
]
;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const tField = <T,>(obj: { fr: T; en: T }, lang: Lang): T => obj[lang];
