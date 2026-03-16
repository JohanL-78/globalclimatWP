const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
});

const namedEntities = {
  amp: "&",
  apos: "'",
  quot: '"',
  lt: "<",
  gt: ">",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  laquo: "«",
  raquo: "»",
  copy: "©",
  reg: "®",
  trade: "™",
  euro: "€",
  pound: "£",
  yen: "¥",
  sect: "§",
  para: "¶",
  middot: "·",
  bull: "•",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  auml: "ä",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  ouml: "ö",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  ccedil: "ç",
};

const entityPattern = /&(#x?[0-9a-fA-F]+|\w+);/g;

export function decodeHtmlEntities(input) {
  if (!input) return "";

  return input.replace(entityPattern, (match, entity) => {
    if (!entity) return match;

    if (entity[0] === "#") {
      const isHex = entity[1]?.toLowerCase() === "x";
      const codePoint = parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      if (!Number.isNaN(codePoint)) {
        try {
          return String.fromCodePoint(codePoint);
        } catch {
          return match;
        }
      }
      return match;
    }

    const replacement = namedEntities[entity.toLowerCase()];
    return typeof replacement === "string" ? replacement : match;
  });
}

export function formatPublishedDate(input) {
  if (!input) return "";

  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return "";

  return dateFormatter.format(date);
}

const tagPattern = /<[^>]*>/g;

export function stripHtml(html) {
  if (!html) return "";

  const withoutTags = html.replace(tagPattern, " ");
  const decoded = decodeHtmlEntities(withoutTags);

  return decoded.replace(/\s+/g, " ").trim();
}

export function getArticleUrl(post) {
  const d = new Date(post.date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `/${year}/${month}/${day}/${post.slug}`;
}

export function getFeaturedImage(post) {
  if (!post) return null;

  const media = post?._embedded?.["wp:featuredmedia"]?.[0];
  const source = media?.source_url || post?.jetpack_featured_media_url || "";

  if (!source) return null;

  const altSource =
    media?.alt_text ||
    (typeof media?.title?.rendered === "string" ? media.title.rendered : "") ||
    (typeof post?.title?.rendered === "string" ? post.title.rendered : "");

  const alt = decodeHtmlEntities(altSource)?.trim();

  return {
    src: source,
    alt: alt || "Illustration de l’article",
  };
}
