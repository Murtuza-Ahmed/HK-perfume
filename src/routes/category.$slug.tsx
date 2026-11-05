import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { abs } from "@/lib/seo/site";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getCategoryBySlug } from "@/lib/storefront.functions";
import { ProductCard } from "@/components/product-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ld, breadcrumbLd, itemListLd } from "@/lib/seo/jsonld";

const catQO = (slug: string) =>
  queryOptions({
    queryKey: ["category", slug],
    queryFn: () => getCategoryBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/category/$slug")({
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(catQO(params.slug));
    if (!data) throw notFound();
    return data;
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }] };
    const c = loaderData.category;
    const title = c.seo_title ?? `${c.name} — Lumen & Oud`;
    const desc = c.seo_description ?? c.description ?? `Shop ${c.name} at Lumen & Oud.`;
    const url = abs(`/category/${params.slug}`);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: c.seo_keywords ?? c.name },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        ...(c.hero_image
          ? [
              { property: "og:image" as const, content: abs(c.hero_image) },
              { name: "twitter:image", content: abs(c.hero_image) },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        ld(
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: c.name, path: url },
          ]),
        ),
        ld(
          itemListLd(loaderData.products.map((p) => ({ name: p.name, url: `/product/${p.slug}` }))),
        ),
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category, products } = useSuspenseQuery(catQO(Route.useParams().slug)).data!;
  return (
    <div className="fade-in">
      <section className="relative h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <img
          src={category.hero_image ?? ""}
          alt={category.name}
          className="absolute inset-0 h-full w-full object-cover"
          width={1600}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="container-prose relative pb-10">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: category.name, path: `/category/${category.slug}` },
            ]}
          />
          <p className="eyebrow mt-4">{category.tagline}</p>
          <h1 className="font-display text-5xl md:text-6xl mt-2">{category.name}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{category.description}</p>
        </div>
      </section>
      <section className="container-prose py-16">
        {products.length === 0 ? (
          <p className="text-muted-foreground">
            Restocking soon.{" "}
            <Link to="/blog" className="text-primary">
              Read our guides
            </Link>{" "}
            in the meantime.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
