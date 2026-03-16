export const metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site global-climat.com.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-white pb-8">
      <div className="mx-auto max-w-3xl px-6 pt-10 lg:px-12 lg:pt-16">
        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.3em] text-gray-600 dark:text-neutral-400">
          Informations légales
        </p>
        <h1
          className="mt-8 text-5xl font-medium leading-tight tracking-tight sm:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Mentions légales
        </h1>

        <div className="mt-16 h-px bg-gray-200 dark:bg-white/10" />

        <div className="mt-12 space-y-12 text-lg leading-8 text-gray-600 dark:text-neutral-400">
          {/* Éditeur */}
          <section>
            <h2
              className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white lg:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Éditeur du site
            </h2>
            <p className="mt-6">
              Le site global-climat.com est un blog personnel à caractère non
              commercial, édité par une personne physique. Conformément à
              l&apos;article 6-III-2 de la loi n° 2004-575 du 21 juin 2004
              (LCEN), les coordonnées de l&apos;éditeur ont été communiquées à
              l&apos;hébergeur du site.
            </p>
            <p className="mt-4">
              Contact :{" "}
              <a
                href="mailto:globalclimat@proton.me"
                className="text-gray-900 underline underline-offset-4 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-400"
              >
                globalclimat@proton.me
              </a>
            </p>
          </section>

          {/* Hébergeur */}
          <section>
            <h2
              className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white lg:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Hébergeur
            </h2>
            <p className="mt-6">
              Vercel Inc.
              <br />
              440 N Barranca Ave #4133
              <br />
              Covina, CA 91723, États-Unis
              <br />
              <a
                href="https://vercel.com"
                className="text-gray-900 underline underline-offset-4 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-400"
              >
                vercel.com
              </a>
            </p>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2
              className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white lg:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Propriété intellectuelle
            </h2>
            <p className="mt-6">
              L&apos;ensemble des contenus publiés sur global-climat.com
              (textes, images, graphiques) sont protégés par le droit
              d&apos;auteur. Toute reproduction, même partielle, est soumise à
              autorisation préalable.
            </p>
          </section>

          {/* Données personnelles */}
          <section>
            <h2
              className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white lg:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Données personnelles
            </h2>
            <p className="mt-6">
              Ce site ne collecte aucune donnée personnelle et n&apos;utilise
              pas de cookies. Aucun outil de suivi ou d&apos;analyse
              n&apos;est mis en œuvre.
            </p>
          </section>

          {/* Responsabilité */}
          <section>
            <h2
              className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white lg:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Responsabilité
            </h2>
            <p className="mt-6">
              Les informations publiées sur ce site sont fournies à titre
              informatif. L&apos;éditeur s&apos;efforce de les maintenir à jour
              mais ne saurait garantir leur exactitude. L&apos;éditeur décline
              toute responsabilité quant à l&apos;utilisation qui pourrait être
              faite de ces informations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
