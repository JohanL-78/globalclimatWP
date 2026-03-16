export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-[#121212] border-t border-gray-200 dark:border-white/10 py-12 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-4xl md:text-5xl font-medium mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Global Climat
          </h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400 max-w-md">
            Veille scientifique et actualités sur le changement climatique.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-neutral-400 mb-4">Contact</h4>
          <p className="text-lg text-gray-900 dark:text-white">globalclimat@proton.me</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-12 pt-6 border-t border-gray-200 dark:border-white/10 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-600 dark:text-neutral-400">
        <span>© 2026 Global Climat</span>
        <div className="flex gap-4">
          <a href="/mentions-legales" className="hover:opacity-70 transition-opacity">Mentions Légales</a>
          <span className="text-gray-400 dark:text-neutral-600">·</span>
          <a href="https://johanlorck.fr" target="_blank" rel="noopener" className="hover:opacity-70 transition-opacity">Site par Johan Lorck</a>
        </div>
      </div>
    </footer>
  );
}
