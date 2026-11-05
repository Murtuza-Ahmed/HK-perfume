import { createFileRoute, Link } from "@tanstack/react-router";
import { abs } from "@/lib/seo/site";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getHomeData } from "@/lib/storefront.functions";
import { ProductCard } from "@/components/product-card";
import { ArrowRight } from "lucide-react";

const homeQO = queryOptions({ queryKey: ["home"], queryFn: () => getHomeData() });

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(homeQO),
  head: () => ({
    meta: [
      { title: "Lumen & Oud — Niche Perfumes, Watches & Handcrafted Topis" },
      {
        name: "description",
        content:
          "Discover niche oud perfumes, Swiss mechanical watches, and handcrafted Islamic topis. Curated and concierge-shipped worldwide.",
      },
      {
        name: "keywords",
        content: "niche perfume, oud, mechanical watch, islamic topi, kufi, luxury boutique",
      },
      { property: "og:title", content: "Lumen & Oud" },
      {
        property: "og:description",
        content: "Niche perfumes, mechanical watches, and handcrafted Islamic topis.",
      },
      { property: "og:url", content: abs("/") },
      { property: "og:image", content: abs("/images/hero-home.webp") },
      { name: "twitter:image", content: abs("/images/hero-home.webp") },
    ],
    links: [
      { rel: "canonical", href: abs("/") },
      { rel: "preload", as: "image", href: abs("/images/hero-home.webp"), fetchPriority: "high" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data } = useSuspenseQuery(homeQO);
  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="relative -mt-16 md:-mt-20 h-[88vh] min-h-[600px] flex items-end overflow-hidden">
        <img
          src="/images/hero-home.webp"
          alt="A perfume bottle on dark velvet with smoke curling overhead"
          width={1600}
          height={900}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="container-prose relative pb-20 md:pb-28">
          <p className="eyebrow mb-4">Est. 2018 · Dubai</p>
          <h1 className="font-display text-5xl md:text-7xl max-w-3xl leading-[1.05]">
            Rare scents, quiet horology, and the cloth of devotion.
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
            A small house curating fragrances, mechanical watches, and handcrafted topis. Each piece
            is chosen, serviced, and shipped with care.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/category/$slug" params={{ slug: "perfumes" }} className="btn-gold">
              Explore the library
            </Link>
            <Link to="/blog" className="btn-outline">
              Read the guides
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-prose py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow">Three houses, one boutique</p>
            <h2 className="font-display text-4xl mt-2">The collections</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {data.categories.map((c) => (
            <Link
              key={c.id}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group relative h-[440px] overflow-hidden card-surface"
            >
              <img
                src={c.hero_image ?? "/images/cat-perfumes.webp"}
                alt={c.name}
                width={1200}
                height={800}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 p-7">
                <p className="eyebrow">{c.tagline}</p>
                <h3 className="font-display text-3xl mt-1 text-foreground">{c.name}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-primary text-sm">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container-prose py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow">House favourites</p>
            <h2 className="font-display text-4xl mt-2">Featured this season</h2>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Editorial */}
      <section className="container-prose py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow">From the editors</p>
            <h2 className="font-display text-4xl mt-2">Buying guides</h2>
          </div>
          <Link to="/blog" className="text-sm text-primary hover:underline">
            All guides →
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {data.posts.map((p) => (
            <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group block">
              <div className="aspect-[4/3] overflow-hidden card-surface">
                <img
                  src={p.cover_image ?? "/images/guide-oud.webp"}
                  alt={p.title}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-xl mt-4 leading-tight group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
