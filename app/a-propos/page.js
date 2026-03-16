export const metadata = {
  title: "À Propos",
  description:
    "Global-climat.com recense depuis 2013 l'actualité du changement climatique et les avancées de la recherche scientifique.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-white pb-8">
      <div className="mx-auto max-w-5xl px-6 pt-10 lg:px-12 lg:pt-16">
        {/* Header */}
        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.3em] text-gray-600 dark:text-neutral-400">
          À propos
        </p>
        <h1
          className="mt-8 max-w-3xl text-5xl font-medium leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Comprendre le climat, <br />
          <span className="text-cyan-600 italic">depuis 2013.</span>
        </h1>

        {/* Separator — mt-16 = espace entre le titre et le trait */}
        <div className="mt-16 h-px bg-gray-200 dark:bg-white/10" />

        {/* Content */}
        <div className="mt-12 lg:flex lg:gap-24">
          {/* Main */}
          <div className="max-w-2xl">
            <h2
              className="text-3xl font-medium tracking-tight lg:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Le projet
            </h2>
            <p className="mt-8 text-lg leading-8 text-gray-600 dark:text-neutral-400">
              Global-climat.com recense depuis 2013 l&apos;actualité du
              changement climatique et les avancées de la recherche dans ce
              domaine.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-neutral-400">
              Pour cela, différents types de sources sont utilisées : revues
              scientifiques (Nature, Geophysical Research Letters,
              Science…), travaux de chercheurs, agences d&apos;information
              ou organismes spécifiquement dédiés au climat comme la NOAA ou
              la NASA.
            </p>

            <div className="mt-12 h-px bg-gray-200 dark:bg-white/10" />

            <h2
              className="mt-12 text-3xl font-medium tracking-tight lg:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              L&apos;approche
            </h2>
            <p className="mt-8 text-lg leading-8 text-gray-600 dark:text-neutral-400">
              L&apos;objectif est de rendre accessible au plus grand nombre
              les résultats de la recherche scientifique sur le climat, en
              privilégiant la rigueur et la clarté.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-neutral-400">
              Les articles s&apos;appuient sur des données vérifiées et des
              publications issues de la littérature scientifique
              internationale.
            </p>
          </div>

          {/* Sidebar */}
          <aside className="mt-16 shrink-0 space-y-10 border-t border-gray-200 pt-10 dark:border-white/10 lg:mt-0 lg:w-56 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-neutral-400">
                En ligne depuis
              </h3>
              <p
                className="mt-3 text-4xl font-medium"
                style={{ fontFamily: "var(--font-display)" }}
              >
                2013
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-neutral-400">
                Sources
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-neutral-400">
                <li>Nature</li>
                <li>Science</li>
                <li>Geophysical Research Letters</li>
                <li>NOAA</li>
                <li>NASA</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-neutral-400">
                Contact
              </h3>
              <p className="mt-3 text-sm">
                globalclimat@proton.me
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
