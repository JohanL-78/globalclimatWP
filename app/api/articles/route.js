import { NextResponse } from 'next/server';
import { stripHtml, getFeaturedImage } from '@/lib/posts';

export async function GET() {
  try {
    const response = await fetch(
      `https://public-api.wordpress.com/wp/v2/sites/${process.env.NEXT_PUBLIC_WP_SITE}/posts?per_page=10&_embed=1`,
      {
        next: { revalidate: 60 } // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from WordPress');
    }

    const posts = await response.json();

    // Transform WordPress data to match your component structure
    const articles = posts.map(post => {
      const featuredImage = getFeaturedImage(post);

      return {
        _id: post.id.toString(),
        title: stripHtml(post.title.rendered),
        slug: {
          current: post.slug
        },
        publishedAt: post.date,
        category: post._embedded?.['wp:term']?.[0]?.[0]?.name || null,
        excerpt: stripHtml(post.excerpt.rendered),
        mainImage: featuredImage ? {
          asset: {
            url: featuredImage.src
          },
          alt: featuredImage.alt
        } : null
      };
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles', articles: [] },
      { status: 500 }
    );
  }
}
