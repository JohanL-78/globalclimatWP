// app/api/posts/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '9';

  try {
    const res = await fetch(
      `https://public-api.wordpress.com/wp/v2/sites/${process.env.NEXT_PUBLIC_WP_SITE}/posts?per_page=${perPage}&page=${page}&_embed=1`,
      { next: { revalidate: 600 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Erreur de chargement des articles' },
        { status: res.status }
      );
    }

    const posts = await res.json();
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');

    return NextResponse.json({ posts, totalPages });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
