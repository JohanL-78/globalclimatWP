import Link from "next/link";

function pageHref(page) {
  return page === 1 ? "/" : `/articles/${page}`;
}

export default function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  // Build page number list with ellipsis
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em]"
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className="border border-gray-200 dark:border-white/10 px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
        >
          Précédent
        </Link>
      ) : (
        <span className="border border-gray-200 dark:border-white/10 px-4 py-2 opacity-30 cursor-default">
          Précédent
        </span>
      )}

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 py-2 text-gray-400 dark:text-neutral-500">
            …
          </span>
        ) : p === currentPage ? (
          <span
            key={p}
            className="border border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-black px-3 py-2"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={pageHref(p)}
            className="border border-gray-200 dark:border-white/10 px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          className="border border-gray-200 dark:border-white/10 px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
        >
          Suivant
        </Link>
      ) : (
        <span className="border border-gray-200 dark:border-white/10 px-4 py-2 opacity-30 cursor-default">
          Suivant
        </span>
      )}
    </nav>
  );
}
