import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  formatPublishedDate,
  getFeaturedImage,
  getArticleUrl,
  stripHtml,
} from "@/lib/posts";

export const revalidate = 86400;

const WP_SITE = process.env.NEXT_PUBLIC_WP_SITE;

async function getPost(slug) {
  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/${WP_SITE}/posts?slug=${slug}&_embed=1`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) return null;
  const posts = await res.json();
  if (!Array.isArray(posts) || posts.length === 0) return null;
  return posts[0];
}

async function getAllPosts() {
  const posts = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `https://public-api.wordpress.com/wp/v2/sites/${WP_SITE}/posts?per_page=100&page=${page}&_fields=slug,date`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) break;
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    posts.push(...batch);
    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
    if (page >= totalPages) break;
    page++;
  }
  return posts;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => {
    const d = new Date(post.date);
    return {
      year: String(d.getFullYear()),
      month: String(d.getMonth() + 1).padStart(2, "0"),
      day: String(d.getDate()).padStart(2, "0"),
      slug: post.slug,
    };
  });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = stripHtml(post.title?.rendered || "");
  const excerpt = stripHtml(post.excerpt?.rendered || "");
  const description =
    excerpt.length > 160 ? `${excerpt.slice(0, 157).trimEnd()}...` : excerpt;
  const featuredImage = getFeaturedImage(post);
  const canonicalUrl = `https://global-climat.com${getArticleUrl(post)}`;
  const author = post._embedded?.author?.[0]?.name || "Global Climat";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: [author],
      ...(featuredImage && { images: [{ url: featuredImage.src, alt: featuredImage.alt }] }),
    },
    twitter: {
      title,
      description,
      ...(featuredImage && { images: [featuredImage.src] }),
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function PostPage({ params }) {
  const { year, month, day, slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Validate date segments match the post date
  const d = new Date(post.date);
  const expectedYear = String(d.getFullYear());
  const expectedMonth = String(d.getMonth() + 1).padStart(2, "0");
  const expectedDay = String(d.getDate()).padStart(2, "0");
  if (year !== expectedYear || month !== expectedMonth || day !== expectedDay) {
    notFound();
  }

  const title = stripHtml(post.title?.rendered || "");
  const excerpt = stripHtml(post.excerpt?.rendered || "");
  const publishedAt = formatPublishedDate(post.date);
  const author = post._embedded?.author?.[0]?.name || null;
  const featuredImage = getFeaturedImage(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: post.date,
    ...(post.modified && { dateModified: post.modified }),
    author: { "@type": "Person", name: author || "Global Climat" },
    ...(featuredImage && { image: featuredImage.src }),
    publisher: { "@type": "Organization", name: "Global Climat" },
  };

  return (
    <main className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className={`${buttonVariants({ variant: "ghost", size: "sm" })} gap-2 px-2`}
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Retour aux articles
          </Link>
          {publishedAt ? (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 rounded-full px-3 py-1 font-medium"
            >
              {publishedAt}
            </Badge>
          ) : null}
        </div>

        <Card className="overflow-hidden border border-border/70 bg-card/95 shadow-xl">
          <CardHeader className="space-y-5 border-b border-border/60 bg-secondary/30 px-6 py-10 sm:px-12">
            <CardTitle className="font-site-heading text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              {title}
            </CardTitle>
            {excerpt ? (
              <CardDescription className="font-tight text-pretty text-lg leading-relaxed text-muted-foreground">
                {excerpt}
              </CardDescription>
            ) : null}
            {author && (
              <p className="text-sm text-muted-foreground">
                Par{" "}
                <span className="font-medium text-foreground">{author}</span>
                {publishedAt ? ` — ${publishedAt}` : ""}
              </p>
            )}
          </CardHeader>
          <CardContent className="px-6 py-10 sm:px-12">
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 bg-secondary/20 px-6 py-6 sm:px-12">
            <p className="text-sm text-muted-foreground">
              Contenu Global Climat — dernière mise à jour{" "}
              {publishedAt || "récente"}
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
