import { a as ld, c as productLd, n as breadcrumbLd, r as faqLd } from "./jsonld-Bxxk1c0t.js";
import { a as getProductBySlug } from "./storefront.functions-tItMHKrC.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
//#region src/routes/product.$slug.tsx?tsr-shared=1
var prodQO = (slug) => queryOptions({
	queryKey: ["product", slug],
	queryFn: () => getProductBySlug({ data: { slug } })
});
//#endregion
//#region src/routes/product.$slug.tsx
var $$splitComponentImporter = () => import("./product._slug-KbnTN-YD.js");
var Route = createFileRoute("/product/$slug")({
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
		const faqs = Array.isArray(product.faq) ? product.faq : [];
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: desc
				},
				{
					name: "keywords",
					content: product.seo_keywords ?? `${product.name}, ${product.brand ?? ""}`
				},
				{
					property: "og:title",
					content: title
				},
				{
					property: "og:description",
					content: desc
				},
				{
					property: "og:type",
					content: "product"
				},
				{
					property: "og:url",
					content: url
				},
				{
					property: "og:image",
					content: img
				},
				{
					name: "twitter:image",
					content: img
				},
				{
					property: "product:price:amount",
					content: String(product.price)
				},
				{
					property: "product:price:currency",
					content: product.currency
				}
			],
			links: [{
				rel: "canonical",
				href: url
			}],
			scripts: [
				ld(breadcrumbLd([
					{
						name: "Home",
						path: "/"
					},
					...category ? [{
						name: category.name,
						path: `/category/${category.slug}`
					}] : [],
					{
						name: product.name,
						path: url
					}
				])),
				ld(productLd({
					name: product.name,
					description: product.description,
					image: img,
					sku: product.slug,
					brand: product.brand ?? void 0,
					price: Number(product.price),
					currency: product.currency,
					availability: product.stock > 0 ? "InStock" : "OutOfStock",
					url,
					ratingAvg: Number(product.rating_avg),
					ratingCount: product.rating_count,
					reviews: reviews.map((r) => ({
						author: r.author_name,
						rating: r.rating,
						title: r.title ?? void 0,
						body: r.body ?? void 0,
						date: r.created_at
					}))
				})),
				...faqs.length ? [ld(faqLd(faqs))] : []
			]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { prodQO as n, Route as t };
