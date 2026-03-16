import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { formatPublishedDate, getArticleUrl, getFeaturedImage, stripHtml } from "@/lib/posts";

export default function ArticleGrid({ posts }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const title = stripHtml(post?.title?.rendered || "");
        const excerpt = stripHtml(post?.excerpt?.rendered || "");
        const truncatedExcerpt = excerpt.length > 210 ? `${excerpt.slice(0, 210).trimEnd()}...` : excerpt;
        const featuredImage = getFeaturedImage(post);
        const publishedAt = formatPublishedDate(post.date);

        return (
          <div
            key={post.id}
            className="group relative border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0f0f0f] hover:bg-gray-100 dark:hover:bg-white/5 flex flex-col overflow-hidden transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-video w-full overflow-hidden">
              {featuredImage ? (
                <Image
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 dark:bg-neutral-900 flex items-center justify-center">
                  <span className="text-gray-600 dark:text-neutral-400">Global Climat</span>
                </div>
              )}
              {publishedAt && (
                <div className="absolute left-4 top-4 border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/80 px-2 py-1 text-[10px] uppercase tracking-wider backdrop-blur-sm">
                  {publishedAt}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="mb-4 text-xl font-medium leading-tight text-gray-900 dark:text-white group-hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-display)" }}>
                {title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 dark:text-neutral-400">
                {truncatedExcerpt || "Découvrez les détails de cette actualité climatique."}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-gray-200 dark:border-white/10 pt-4">
                <Link
                  href={getArticleUrl(post)}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-white hover:opacity-70 transition-opacity flex items-center gap-2"
                >
                  Lire
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
               
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
