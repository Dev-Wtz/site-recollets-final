import { generatePageMetadata } from "@/app/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Accessibilité",
  description:
    "Déclaration d'accessibilité du site Les Récollets - Ensemble Scolaire Privé. Conformité RGAA et contact.",
  path: "/legal/accessibilite",
});

export default function AccessibiliteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
