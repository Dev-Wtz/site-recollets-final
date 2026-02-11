import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <h1 className="font-[var(--font-playfair)] text-6xl sm:text-7xl md:text-8xl font-bold text-[#8C1515] mb-4">
              404
            </h1>
            <div className="w-24 h-1 bg-[#8C1515] mx-auto mb-6" />
            <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Page introuvable
            </h2>
            <p className="font-[var(--font-inter)] text-lg text-gray-700 mb-8">
              La page que vous recherchez n&apos;existe pas ou a été déplacée.
            </p>
          </div>

          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[#8C1515] text-white font-[var(--font-inter)] font-semibold rounded-lg hover:bg-[#a01919] transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
