import { generatePageMetadata } from "@/app/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles (RGPD) du site Les Récollets - Ensemble Scolaire Privé.",
  path: "/legal/confidentialite",
});

export default function ConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
