import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getProductBySlug } from "@/lib/storefront.functions";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/product-card";
import { ld, breadcrumbLd, productLd, faqLd } from "@/lib/seo/jsonld";
import { Star } from "lucide-react";

const prodQO = (slug: string) =>
  queryOptions({ queryKey: ["product", slug], queryFn: () => getProductBySlug({ data: { slug } }) });

type Faq = { q: string; a: string };

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(prodQO(params.slug));
    if (!data) throw notFound();
    return data;
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }] };
    const { product, category, reviews } = loaderData;
    const url = `/product/${params.slug}`;
    const title = product.seo_title ?? `${product.name} | Lumen & Oud`;
    const desc = product.seo_description ?? product.short_description ?? product.description.slice(0, 160);
    const img = product.images?.[0] ?? "/images/hero-home.webp";
    const faqs = Array.isArray(product.faq) ? (product.faq as unknown as Faq[]) : [];
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: product.seo_keywords ?? `${product.name}, ${product.brand ?? ""}` },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: img },
        { name: "twitter:image", content: img },
        { property: "product:price:amount", content: String(product.price) },
        { property: "product:price:currency", content: product.currency },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        ld(breadcrumbLd([
          { name: "Home", path: "/" },
          ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
          { name: product.name, path: url },
        ])),
        ld(productLd({
          name: product.name,
          description: product.description,
          image: img,
          sku: product.slug,
          brand: product.brand ?? undefined,
          price: Number(product.price),
          currency: product.currency,
          availability: product.stock > 0 ? "InStock" : "OutOfStock",
          url,
          ratingAvg: Number(product.rating_avg),
          ratingCount: product.rating_count,
          reviews: reviews.map((r) => ({
            author: r.author_name, rating: r.rating, title: r.title ?? undefined,
            body: r.body ?? undefined, date: r.created_at,
          })),
        })),
        ...(faqs.length ? [ld(faqLd(faqs))] : []),
      ],
    };
  },
  component: ProductPage,
});

const fmt = (price: number | string, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(Number(price));

function ProductPage() {
  const { product, category, reviews, related } = useSuspenseQuery(prodQO(Route.useParams().slug)).data!;
  const faqs: Faq[] = Array.isArray(product.faq) ? (product.faq as unknown as Faq[]) : [];
  return (
    <div className="fade-in">
      <div className="container-prose pt-8">
        <Breadcrumbs items={[
          { name: "Home", path: "/" },
          ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
          { name: product.name, path: `/product/${product.slug}` },
        ]} />
      </div>
      <section className="container-prose py-10 grid gap-10 lg:grid-cols-2">
        <div className="card-surface overflow-hidden aspect-square">
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" width={1000} height={1000} />
        </div>
        <div>
          {product.brand && <p className="eyebrow">{product.brand}</p>}
          <h1 className="font-display text-4xl md:text-5xl mt-2">{product.name}</h1>
          {product.rating_count > 0 && (
            <p className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
              <Star size={14} className="fill-primary text-primary" />
              {Number(product.rating_avg).toFixed(1)} · {product.rating_count} reviews
            </p>
          )}
          <p className="mt-6 text-2xl text-foreground">{fmt(product.price, product.currency)}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {product.stock > 0 ? `In stock · ships within 48h` : "Currently restocking"}
          </p>
          <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="mt-8 flex gap-3">
            <button className="btn-gold" disabled={product.stock === 0}>
              {product.stock > 0 ? "Add to bag" : "Notify me"}
            </button>
            <Link to="/contact" className="btn-outline">Ask concierge</Link>
          </div>

          {faqs.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl mb-4">Questions</h2>
              <dl className="space-y-4">
                {faqs.map((f, i) => (
                  <div key={i} className="card-surface p-5">
                    <dt className="font-medium text-foreground">{f.q}</dt>
                    <dd className="mt-1 text-sm text-muted-foreground">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="container-prose py-12">
          <h2 className="font-display text-3xl mb-6">What collectors say</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <article key={r.id} className="card-surface p-5">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{r.author_name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
                <div className="mt-1 flex gap-0.5 text-primary">
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={12} className="fill-primary" />)}
                </div>
                {r.title && <p className="font-medium mt-2">{r.title}</p>}
                {r.body && <p className="text-sm text-muted-foreground mt-1">{r.body}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="container-prose py-16">
          <h2 className="font-display text-3xl mb-6">You may also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}