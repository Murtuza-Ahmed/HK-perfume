import { t as qo } from "./blog-C0Xn_yk6.js";
import { t as Breadcrumbs } from "./breadcrumbs-oTehXj7Y.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
//#region src/routes/blog.tsx?tsr-split=component
function BlogIndex() {
	const { data: posts } = useSuspenseQuery(qo);
	return /* @__PURE__ */ jsxs("div", {
		className: "fade-in container-prose py-12",
		children: [
			/* @__PURE__ */ jsx(Breadcrumbs, { items: [{
				name: "Home",
				path: "/"
			}, {
				name: "Guides",
				path: "/blog"
			}] }),
			/* @__PURE__ */ jsxs("header", {
				className: "mt-6 mb-12",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "eyebrow",
						children: "From the editors"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "font-display text-5xl mt-2",
						children: "Buying guides"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-3 max-w-2xl text-muted-foreground",
						children: "Long-form pieces on what to look for in oud, mechanical movements, and embroidered prayer caps."
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-10 md:grid-cols-2",
				children: posts.map((p) => /* @__PURE__ */ jsxs(Link, {
					to: "/blog/$slug",
					params: { slug: p.slug },
					className: "group block",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "aspect-[16/10] overflow-hidden card-surface",
							children: /* @__PURE__ */ jsx("img", {
								src: p.cover_image ?? "/images/guide-oud.webp",
								alt: p.title,
								className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
								width: 1200,
								height: 750,
								loading: "lazy"
							})
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "eyebrow mt-5",
							children: [
								new Date(p.published_at).toLocaleDateString("en-US", {
									month: "long",
									year: "numeric"
								}),
								" · ",
								p.read_minutes,
								" min read"
							]
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "font-display text-2xl mt-2 group-hover:text-primary transition-colors",
							children: p.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground mt-2 line-clamp-3",
							children: p.excerpt
						})
					]
				}, p.id))
			})
		]
	});
}
//#endregion
export { BlogIndex as component };
