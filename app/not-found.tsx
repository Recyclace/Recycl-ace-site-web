import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-6xl text-foret" style={{ fontWeight: 800 }}>404</p>
      <p className="mt-3 text-encre/60">Cette page n'existe pas / This page does not exist.</p>
      <Link href="/" className="btn-primary mt-6">Accueil / Home</Link>
    </div>
  );
}
