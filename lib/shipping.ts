// Grille de livraison — source unique de vérité (panier, checkout, Stripe).
// France :
//   - sous-total <= 20 €  -> 6,99 €
//   - sous-total  > 20 €  -> 3,99 €
//   - sous-total >= 75 €  -> OFFERTE
// Autres pays de vente : tarif forfaitaire configuré en admin (le franco s'applique à la France).

export const FREE_SHIPPING_THRESHOLD = 75;
export const FR_SMALL_FEE = 6.99;   // <= 20 €
export const FR_STD_FEE = 3.99;     // > 20 €
export const FR_SMALL_LIMIT = 20;

export function computeShipping(subtotal: number, country: string, shippingMap?: Record<string, number>): number {
  const c = (country || "FR").toUpperCase();
  if (c === "FR") {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    if (subtotal <= FR_SMALL_LIMIT) return FR_SMALL_FEE;
    return FR_STD_FEE;
  }
  // Autres pays : forfait configuré, offert au-delà du seuil également.
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return (shippingMap && shippingMap[c] != null) ? Number(shippingMap[c]) : 0;
}

// Montant restant pour atteindre la livraison gratuite (0 si déjà atteint).
export function remainingForFreeShipping(subtotal: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}
