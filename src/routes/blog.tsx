import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { listPosts } from "@/lib/storefront.functions";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ld, breadcrumbLd } from "@/lib/seo/jsonld";

const qo = queryOptions({ queryKey: ["posts"], queryFn: () => listPosts() });

export const Route = createFileRoute("/blog")({
  loader: ({ context }) => context.queryClient.ensureQueryData(qo),
  head: () => ({
    meta: [
      { title: "Buying Guides — Perfume, Watches, Topis | Lumen & Oud" },
      { name: "description", content: "In-depth buying guides for niche perfumes, mechanical watches, and handcrafted Islamic topis." },
      { name: "keywords", content: "perfume guide, watch guide, topi guide, oud, kufi" },
      { property: "og:title", content: "Lumen & Oud — Buying Guides" },
      { property: "og:description", content: "In-depth guides from our editors." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [ld(breadcrumbLd([{ name: "Home", path: "/" }, { name: "Guides", path: "/blog" }]))],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data: posts } = useSuspenseQuery(qo);
  return (
    <div className="fade-in container-prose py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Guides", path: "/blog" }]} />
      <header className="mt-6 mb-12">
        <p className="eyebrow">From the editors</p>
        <h1 className="font-display text-5xl mt-2">Buying guides</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Long-form pieces on what to look for in oud, mechanical movements, and embroidered prayer caps.</p>
      </header>
      <div className="grid gap-10 md:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group block">
            <div className="aspect-[16/10] overflow-hidden card-surface">
              <img src={p.cover_image ?? "/images/guide-oud.webp"} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" width={1200} height={750} loading="lazy" />
            </div>
            <p className="eyebrow mt-5">{new Date(p.published_at).toLocaleDateString("en-US",{month:"long",year:"numeric"})} · {p.read_minutes} min read</p>
            <h2 className="font-display text-2xl mt-2 group-hover:text-primary transition-colors">{p.title}</h2>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}