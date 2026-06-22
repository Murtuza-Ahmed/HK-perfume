import { a as ld, n as breadcrumbLd, t as articleLd } from "./jsonld-Bxxk1c0t.js";
import { i as getPostBySlug } from "./storefront.functions-tItMHKrC.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
//#region src/routes/blog.$slug.tsx?tsr-shared=1
var qo = (slug) => queryOptions({
	queryKey: ["post", slug],
	queryFn: () => getPostBySlug({ data: { slug } })
});
//#endregion
//#region src/routes/blog.$slug.tsx
var $$splitComponentImporter = () => import("./blog._slug-BDU1OW0Y.js");
var Route = createFileRoute("/blog/$slug")({
	loader: async ({ params, context }) => {
		const data = await context.queryClient.ensureQueryData(qo(params.slug));
		if (!data) throw notFound();
		return data;
	},
	head: ({ params, loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Not found" }] };
		const { post } = loaderData;
		const url = `/blog/${params.slug}`;
		const title = post.seo_title ?? `${post.title} | Lumen & Oud`;
		const desc = post.seo_description ?? post.excerpt;
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: desc
				},
				{
					name: "keywords",
					content: post.seo_keywords ?? ""
				},
				{
					name: "author",
					content: post.author
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
					content: "article"
				},
				{
					property: "og:url",
					content: url
				},
				...post.cover_image ? [{
					property: "og:image",
					content: post.cover_image
				}, {
					name: "twitter:image",
					content: post.cover_image
				}] : [],
				{
					property: "article:published_time",
					content: post.published_at
				}
			],
			links: [{
				rel: "canonical",
				href: url
			}],
			scripts: [ld(breadcrumbLd([
				{
					name: "Home",
					path: "/"
				},
				{
					name: "Guides",
					path: "/blog"
				},
				{
					name: post.title,
					path: url
				}
			])), ld(articleLd({
				headline: post.title,
				description: post.excerpt,
				image: post.cover_image ?? void 0,
				author: post.author,
				datePublished: post.published_at,
				url
			}))]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { qo as n, Route as t };
