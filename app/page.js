// app/page.js
import Link from "next/link";
import Image from "next/image";

import ArticleGrid from "./components/ArticleGrid";
import Pagination from "./components/Pagination";

export const revalidate = 600; // Regénère toutes les 10 min

async function getPosts(page = 1, perPage = 30) {
  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/${process.env.NEXT_PUBLIC_WP_SITE}/posts?per_page=${perPage}&page=${page}&_embed=1`,
    { next: { revalidate: 600 } }
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
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300">
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
          <div className="grid h-full lg:grid-cols-[1fr_600px]">
            {/* Colonne Gauche : Texte */}
            <div className="flex flex-col justify-between p-6 pb-12 lg:p-12 lg:pb-20 items-center text-center lg:items-start lg:text-left">
              <div className="mt-10 space-y-6 lg:mt-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-600 dark:text-neutral-400">
                  Science — Actualité — Analyses
                </p>
                <h1
                  className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Comprendre <br />
                  <span className="text-cyan-600 dark:text-cyan-600 italic">le changement</span> <br />
                  climatique.
                </h1>
              </div>

              <div className="mt-12 max-w-lg lg:mt-10">
                <p className="text-sm font-light leading-relaxed text-gray-600 dark:text-neutral-400 lg:text-base">
                  Depuis 2013, Global Climat décrypte l&apos;actualité du réchauffement
                  climatique à travers les publications scientifiques de référence :
                  Nature, Science, NOAA, NASA. Analyses, données et synthèses pour
                  suivre l&apos;évolution du climat mondial.
                </p>
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                  <div className="h-px w-12 bg-gray-900 dark:bg-white"></div>
                  <a href="#articles" className="text-xs font-semibold uppercase tracking-[0.2em] hover:underline">
                    Découvrir les articles
                  </a>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Image */}
            <div className="relative min-h-[50vh] w-full border-t border-gray-200 dark:border-white/10 lg:aspect-auto lg:h-full lg:min-h-[90vh] lg:border-t-0 lg:border-l">
              <Image
                src="https://images.unsplash.com/photo-1576792275520-2226541b2889?q=80&w=1200&auto=format&fit=crop"
                alt="Recherche sur le changement climatique et le réchauffement de la planète"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-white/10 dark:bg-black/2"></div>
              {/* Badge flottant en bas */}
              <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/80 p-6 lg:p-8 backdrop-blur-md">
                 <p className="font-display text-3xl text-gray-900 dark:text-white">{totalArticles}</p>
                 <p className="text-[10px] uppercase tracking-widest text-gray-600 dark:text-neutral-400">Articles disponibles</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- ARTICLES SECTION --- */}
        <section id="articles" className="bg-white dark:bg-[#0a0a0a] py-24 lg:py-32">
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
