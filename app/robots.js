export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "Applebot",
          "Baiduspider",
          "YandexBot",
          "Barkrowler",
          "AhrefsBot",
          "PetalBot",
          "meta-externalagent",
          "ClaudeBot",
          "anthropic-ai",
          "GPTBot",
          "CCBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: "https://global-climat.com/sitemap.xml",
  };
}
