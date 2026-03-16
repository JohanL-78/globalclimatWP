const WP_SITE = process.env.NEXT_PUBLIC_WP_SITE;

async function getAllPosts() {
  const posts = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `https://public-api.wordpress.com/wp/v2/sites/${WP_SITE}/posts?per_page=100&page=${page}&_fields=slug,date,modified`,
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

async function getTotalPages(perPage = 30) {
  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/${WP_SITE}/posts?per_page=${perPage}&page=1&_fields=id`,
  );
  if (!res.ok) return 1;
  return parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
}

export default async function sitemap() {
  const [posts, totalPages] = await Promise.all([
    getAllPosts(),
    getTotalPages(),
  ]);

  const baseUrl = "https://global-climat.com";

  const homepage = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  };

  const staticPages = [
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const articleEntries = posts.map((post) => {
    const d = new Date(post.date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return {
      url: `${baseUrl}/${year}/${month}/${day}/${post.slug}`,
      lastModified: new Date(post.modified || post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  const paginationEntries = Array.from({ length: totalPages - 1 }, (_, i) => ({
    url: `${baseUrl}/articles/${i + 2}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.3,
  }));

  return [homepage, ...staticPages, ...articleEntries, ...paginationEntries];
}
