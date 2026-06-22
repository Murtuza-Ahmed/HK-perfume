import { a as ld, i as itemListLd, n as breadcrumbLd } from "./jsonld-Bxxk1c0t.js";
import { n as getCategoryBySlug } from "./storefront.functions-tItMHKrC.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
//#region src/routes/category.$slug.tsx?tsr-shared=1
var catQO = (slug) => queryOptions({
	queryKey: ["category", slug],
	queryFn: () => getCategoryBySlug({ data: { slug } })
});
//#endregion
//#region src/routes/category.$slug.tsx
var $$splitComponentImporter = () => import("./category._slug-C-Rx99tv.js");
var Route = createFileRoute("/category/$slug")({
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
		const url = `/category/${params.slug}`;
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: desc
				},
				{
					name: "keywords",
					content: c.seo_keywords ?? c.name
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
					content: "website"
				},
				{
					property: "og:url",
					content: url
				},
				...c.hero_image ? [{
					property: "og:image",
					content: c.hero_image
				}, {
					name: "twitter:image",
					content: c.hero_image
				}] : []
			],
			links: [{
				rel: "canonical",
				href: url
			}],
			scripts: [ld(breadcrumbLd([{
				name: "Home",
				path: "/"
			}, {
				name: c.name,
				path: url
			}])), ld(itemListLd(loaderData.products.map((p) => ({
				name: p.name,
				url: `/product/${p.slug}`
			}))))]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { catQO as n, Route as t };
