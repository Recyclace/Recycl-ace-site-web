import { redirect } from "next/navigation";

// La rubrique "Notre procédé" est désormais intégrée à la page d'accueil.
export default function ProcessPageRedirect() {
  redirect("/#notre-procede");
}
