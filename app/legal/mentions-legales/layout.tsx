import { generatePageMetadata } from "@/app/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site Les Récollets - Ensemble Scolaire Privé. Éditeur, hébergeur, directeur de la publication et contact.",
  path: "/legal/mentions-legales",
});

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
