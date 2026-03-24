// app/page.js
import Link from "next/link";
import Image from "next/image";

import ArticleGrid from "./components/ArticleGrid";
import Pagination from "./components/Pagination";

export const revalidate = 86400;

async function getPosts(page = 1, perPage = 10) {
  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/${process.env.NEXT_PUBLIC_WP_SITE}/posts?per_page=${perPage}&page=${page}&_embed=1`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Erreur de chargement des articles');
  const posts = await res.json();
  const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
  const totalArticles = parseInt(res.headers.get("X-WP-Total") || String(posts.length), 10);
  return { posts, totalPages, totalArticles };
}

export default async function Home() {
  const { posts, totalPages, totalArticles } = await getPosts(1);

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Global Climat",
    "url": "https://global-climat.com",
    "description": "Actualités du changement climatique et du réchauffement climatique. Articles et analyses scientifiques depuis 2013.",
    "inLanguage": "fr",
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Global Climat",
    "url": "https://global-climat.com",
    "foundingDate": "2013",
    "description": "Veille scientifique sur le changement climatique et le réchauffement climatique.",
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        {/* --- HERO SECTION --- */}
        <section className="relative w-full border-b border-gray-200 dark:border-white/10">
          <div className="grid h-full lg:grid-cols-[1fr_600px] max-w-[1600px] mx-auto">
            {/* Colonne Gauche : Texte */}
            <div className="flex flex-col justify-between p-6 pb-12 lg:p-12 lg:pb-20 items-center text-center lg:items-start lg:text-left">
              <div className="mt-10 space-y-6 lg:mt-8">
                
                {/* Sous-titre avec points colorés */}
                <p className="flex items-center justify-center lg:justify-start gap-3 text-[11px] 2xl:text-[13px] font-medium uppercase tracking-[0.3em] text-gray-600 dark:text-neutral-400">
                  Science <span className="h-1 w-1 rounded-full bg-cyan-500 dark:bg-cyan-500"></span> Actualité <span className="h-1 w-1 rounded-full bg-cyan-500 dark:bg-cyan-500"></span> Analyses
                </p>
                <h1
                  className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl 2xl:text-9xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Comprendre <br />
                  <span className="bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-800 dark:from-cyan-500 dark:via-cyan-600 dark:to-cyan-800 bg-clip-text text-transparent italic pr-2">le changement</span> <br />
                  climatique.
                </h1>
              </div>

              <div className="mt-12 max-w-lg 2xl:max-w-xl lg:mt-10">
                <p className="text-sm font-light leading-relaxed text-gray-600 dark:text-neutral-400 lg:text-base 2xl:text-lg">
                  Depuis 2013, Global Climat décrypte l&apos;actualité du réchauffement
                  climatique à travers les publications scientifiques de référence :
                  Nature, Science, NOAA, NASA. Analyses, données et synthèses pour
                  suivre l&apos;évolution du climat mondial.
                </p>
                {/* CTA bouton */}
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                  <a href="#articles" className="group inline-flex items-center gap-2 rounded-full border border-gray-900 dark:border-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 bg-white hover:bg-cyan-500 hover:text-white dark:text-black dark:hover:bg-white dark:hover:text-black">
                    Découvrir les articles
                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Image */}
            <div className="relative min-h-[50vh] w-full border-t border-gray-200 dark:border-white/10 lg:aspect-auto lg:h-full lg:min-h-[90vh] lg:border-t-0 lg:border-l">
              <Image
                src="https://images.unsplash.com/photo-1772289093030-bc33ef6d4417?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Recherche sur le changement climatique et le réchauffement de la planète"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
                priority
              />
              {/* Overlay gradient coloré */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent dark:from-cyan-900/30 dark:via-transparent dark:to-transparent"></div>
              {/* Badge flottant en bas - stats enrichies */}
              <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/80 px-6 py-5 lg:px-8 lg:py-6 backdrop-blur-md">
                <div className="flex items-center gap-6 lg:gap-8">
                  <div>
                    <p className="font-display text-3xl text-gray-900 dark:text-white">{totalArticles}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-600 dark:text-neutral-400">Articles</p>
                  </div>
                  <div className="h-10 w-px bg-gray-300 dark:bg-white/20"></div>
                  <div>
                    <p className="font-display text-3xl text-gray-900 dark:text-white">12</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-600 dark:text-neutral-400">Années</p>
                  </div>
                  <div className="h-10 w-px bg-gray-300 dark:bg-white/20"></div>
                  <div>
                    <p className="font-display text-3xl text-gray-900 dark:text-white">4</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-600 dark:text-neutral-400">Sources</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ARTICLES SECTION --- */}
        <section id="articles" className="bg-stone-50 dark:bg-[#0a0a0a] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-16 flex items-end justify-between border-b border-gray-200 dark:border-white/10 pb-6">
               <h2
                 className="text-4xl lg:text-5xl"
                 style={{ fontFamily: "var(--font-display)" }}
               >
                 Articles récents
               </h2>
               <p className="hidden text-right text-xs uppercase tracking-[0.2em] text-gray-600 dark:text-neutral-400 lg:block">
                 {totalArticles} publications
               </p>
            </div>

            <ArticleGrid posts={posts} />
            <Pagination currentPage={1} totalPages={totalPages} />
          </div>
        </section>

    </div>
  );
}
