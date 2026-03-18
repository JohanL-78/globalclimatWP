import { notFound, redirect } from "next/navigation";

import ArticleGrid from "@/app/components/ArticleGrid";
import Pagination from "@/app/components/Pagination";

export const revalidate = 86400;

const WP_SITE = process.env.NEXT_PUBLIC_WP_SITE;

async function getPosts(page = 1, perPage = 30) {
  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/${WP_SITE}/posts?per_page=${perPage}&page=${page}&_embed=1`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) return null;
  const posts = await res.json();
  const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
  return { posts, totalPages };
}

async function getTotalPages(perPage = 30) {
  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/${WP_SITE}/posts?per_page=${perPage}&page=1&_fields=id`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) return 1;
  return parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
}

export async function generateStaticParams() {
  const totalPages = await getTotalPages();
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }) {
  const { page } = await params;
  return {
    title: `Articles — Page ${page}`,
    robots: { index: false },
  };
}

export default async function ArticlesPage({ params }) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);

  if (isNaN(pageNum) || pageNum < 1) notFound();
  if (pageNum === 1) redirect("/");

  const data = await getPosts(pageNum);
  if (!data) notFound();

  const { posts, totalPages } = data;
  if (pageNum > totalPages) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300">
      <section className="bg-white dark:bg-[#0a0a0a] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16 flex items-end justify-between border-b border-gray-200 dark:border-white/10 pb-6">
            <h2
              className="text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Articles — Page {pageNum}
            </h2>
            <p className="hidden text-right text-xs uppercase tracking-[0.2em] text-gray-600 dark:text-neutral-400 lg:block">
              Page {pageNum} / {totalPages}
            </p>
          </div>

          <ArticleGrid posts={posts} />
          <Pagination currentPage={pageNum} totalPages={totalPages} />
        </div>
      </section>
    </div>
  );
}
