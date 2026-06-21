import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { search } from "@/lib/storefront.functions";
import { Search as SearchIcon } from "lucide-react";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search | Lumen & Oud" },
      { name: "description", content: "Search perfumes, watches, topis, and buying guides." },
      { property: "og:url", content: "/search" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<{ products: { slug: string; name: string }[]; posts: { slug: string; title: string }[] } | null>(null);
  const run = useServerFn(search);
  return (
    <div className="container-prose py-16 max-w-2xl">
      <h1 className="font-display text-4xl">Search</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!q.trim()) return;
          const r = await run({ data: { q } });
          setResults(r);
        }}
        className="mt-6 flex gap-2"
      >
        <div className="relative flex-1">
          <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Oud, dive watch, kufi…"
            className="w-full bg-input border border-border rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <button className="btn-gold">Search</button>
      </form>
      {results && (
        <div className="mt-10 space-y-8">
          <div>
            <p className="eyebrow mb-3">Products</p>
            {results.products.length === 0 ? <p className="text-sm text-muted-foreground">No products matched.</p> : (
              <ul className="space-y-2">
                {results.products.map((p) => (
                  <li key={p.slug}><Link to="/product/$slug" params={{ slug: p.slug }} className="hover:text-primary">{p.name}</Link></li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <p className="eyebrow mb-3">Guides</p>
            {results.posts.length === 0 ? <p className="text-sm text-muted-foreground">No guides matched.</p> : (
              <ul className="space-y-2">
                {results.posts.map((p) => (
                  <li key={p.slug}><Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">{p.title}</Link></li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}