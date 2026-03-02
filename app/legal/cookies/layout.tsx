import { generatePageMetadata } from "@/app/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Politique des cookies",
  description:
    "Politique des cookies et traceurs du site Les Récollets - Ensemble Scolaire Privé. Finalités, durées et consentement.",
  path: "/legal/cookies",
});

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
