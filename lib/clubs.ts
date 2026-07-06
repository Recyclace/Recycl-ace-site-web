export type Club = { city: string; lat: number; lng: number };

// 30 clubs partenaires ayant déployé la gamme Ace
export const clubs: Club[] = [
  { city: "Toulouse", lat: 43.5647, lng: 1.4944 },
  { city: "Toulouse", lat: 43.961, lng: 1.4153 },
  { city: "Toulouse", lat: 43.6113, lng: 1.5176 },
  { city: "Toulouse", lat: 43.3398, lng: 1.4542 },
  { city: "Toulouse", lat: 43.7138, lng: 1.6903 },
  { city: "Toulouse", lat: 43.2638, lng: 1.2791 },
  { city: "Montpellier", lat: 43.6108, lng: 3.8767 },
  { city: "Toulon", lat: 42.8786, lng: 6.1138 },
  { city: "Toulon", lat: 43.2403, lng: 5.6531 },
  { city: "Nice", lat: 43.9995, lng: 7.5409 },
  { city: "Nice", lat: 43.8026, lng: 7.3313 },
  { city: "Limoges", lat: 45.8336, lng: 1.2611 },
  { city: "Nantes", lat: 47.2184, lng: -1.5536 },
  { city: "Angers", lat: 47.2729, lng: -0.8542 },
  { city: "Angers", lat: 47.4954, lng: -0.8275 },
  { city: "Strasbourg", lat: 48.5734, lng: 7.7521 },
  { city: "Lyon", lat: 45.5781, lng: 4.6809 },
  { city: "Lyon", lat: 45.482, lng: 4.8141 },
  { city: "Metz", lat: 49.0836, lng: 6.3812 },
  { city: "Metz", lat: 49.1308, lng: 6.2599 },
  { city: "Metz", lat: 49.1192, lng: 6.2732 },
  { city: "Paris", lat: 48.8208, lng: 2.1659 },
  { city: "Paris", lat: 49.2746, lng: 2.7686 },
  { city: "Paris", lat: 49.1424, lng: 2.5268 },
  { city: "Paris", lat: 48.7014, lng: 2.1251 },
  { city: "Paris", lat: 48.6794, lng: 1.9912 },
  { city: "Paris", lat: 49.0803, lng: 2.2685 },
  { city: "Paris", lat: 49.1477, lng: 2.2569 },
  { city: "Paris", lat: 49.2414, lng: 2.6439 },
  { city: "Paris", lat: 48.4371, lng: 2.1084 },
];

export type Shop = { name: string; city: string; lat: number; lng: number };

// Magasins spécialisés référençant la gamme Ace (points de vente physiques)
export const shops: Shop[] = [
  { name: "Magasin partenaire", city: "Limoges", lat: 45.8336, lng: 1.2611 },
  { name: "Magasin partenaire", city: "Nice", lat: 43.7009, lng: 7.2683 },
  { name: "Magasin partenaire", city: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Magasin partenaire", city: "Neuilly-sur-Seine", lat: 48.8846, lng: 2.2685 },
  { name: "Magasin partenaire", city: "Boulogne-Billancourt", lat: 48.8355, lng: 2.2400 },
  { name: "Magasin partenaire", city: "Vincennes", lat: 48.8478, lng: 2.4386 },
];
