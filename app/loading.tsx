export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block relative w-20 h-20">
          <div className="absolute border-4 border-[#8C1515] border-t-transparent rounded-full w-20 h-20 animate-spin" />
        </div>
        <p className="mt-4 font-[var(--font-inter)] text-gray-600">
          Chargement...
        </p>
      </div>
    </div>
  );
}
