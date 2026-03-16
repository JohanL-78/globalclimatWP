"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatPublishedDate, getFeaturedImage, stripHtml } from "@/lib/posts";

export default function PostsGrid({ initialPosts, totalPages }) {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(currentPage < totalPages);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const res = await fetch(`/api/posts?page=${nextPage}&per_page=9`);

      if (!res.ok) throw new Error('Erreur de chargement');

      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < data.totalPages);
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-background">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-16 md:px-8">
        <header className="space-y-4 rounded-3xl border border-border/60 bg-secondary/70 px-6 py-12 text-center shadow-sm md:space-y-5 md:px-10">
          <Badge
            variant="default"
            className="mx-auto w-fit rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em]"
          >
            Veille climatique
          </Badge>
          <h1 className="font-site-heading text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Articles de Global Climat
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Une sélection des derniers articles publiés sur Global Climat, mise à jour toutes les dix minutes pour rester
            informé des avancées climatiques, politiques et scientifiques.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const title = stripHtml(post?.title?.rendered || "");
            const excerpt = stripHtml(post?.excerpt?.rendered || "");
            const truncatedExcerpt = excerpt.length > 210 ? `${excerpt.slice(0, 210).trimEnd()}...` : excerpt;
            const featuredImage = getFeaturedImage(post);
            const publishedAt = formatPublishedDate(post.date);

            return (
              <Card
                key={post.id}
                className="article-card-animate group flex flex-col overflow-hidden border border-border/70 bg-card/95 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-(--accent-color)/40"
              >
                <div className="article-card-media">
                  {featuredImage ? (
                    <img
                      src={featuredImage.src}
                      alt={featuredImage.alt}
                      width="640"
                      height="360"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="article-card-media-placeholder">Global Climat</div>
                  )}
                  {publishedAt ? (
                    <Badge
                      variant="secondary"
                      className="absolute left-4 top-4 w-fit rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur"
                    >
                      {publishedAt}
                    </Badge>
                  ) : null}
                </div>
                <CardHeader className="space-y-4 px-6 pb-3 pt-6">
                  <CardTitle className="text-balance text-xl font-semibold leading-tight text-foreground transition-all duration-300 group-hover:text-(--accent-color)">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 px-6 pb-6 pt-0">
                  <CardDescription className="text-pretty leading-relaxed text-muted-foreground">
                    {truncatedExcerpt || "Lisez l&apos;article pour découvrir le détail des actualités climatiques."}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 border-t border-border/40 bg-secondary/10 px-6 py-6 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/${post.slug}`}
                      className={`${buttonVariants({ variant: "default", size: "sm" })} button-glow-accent gap-2`}
                    >
                      Lire l&apos;article
                      <ArrowUpRight aria-hidden className="icon-hover-rotate h-4 w-4" />
                    </Link>
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noreferrer"
                      className="accent-link inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-(--accent-color)"
                    >
                      Voir la source
                      <ArrowUpRight aria-hidden className="icon-hover-rotate h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-xs">
                    Article publié par Global Climat
                  </p>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {hasMore && (
          <div className="flex justify-center">
            <Button
              onClick={loadMore}
              disabled={loading}
              size="lg"
              className="button-glow-accent gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Chargement...
                </>
              ) : (
                <>
                  Charger plus d&apos;articles
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
