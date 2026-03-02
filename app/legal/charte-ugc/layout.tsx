import { generatePageMetadata } from "@/app/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Charte des contenus utilisateurs (UGC)",
  description:
    "Charte UGC du site Les Récollets : règles pour les contenus publiés par les utilisateurs, droit à l'image et modération.",
  path: "/legal/charte-ugc",
});

export default function CharteUGCLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
