import { generatePageMetadata } from "@/app/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Conditions générales d'utilisation (CGU)",
  description:
    "Conditions générales d'utilisation du site Les Récollets - Ensemble Scolaire Privé. Acceptation, usage et responsabilités.",
  path: "/legal/cgu",
});

export default function CGULayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
