import { n as qo, t as Route } from "./blog._slug-r3cMexHE.js";
import { t as Breadcrumbs } from "./breadcrumbs-oTehXj7Y.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
//#region src/routes/blog.$slug.tsx?tsr-split=component
function renderMd(md) {
	return md.split(/\n\n+/).map((block, i) => {
		if (block.startsWith("## ")) return /* @__PURE__ */ jsx("h2", { children: block.slice(3) }, i);
		if (block.startsWith("- ")) return /* @__PURE__ */ jsx("ul", { children: block.split(/\n/).map((l) => l.replace(/^- /, "")).map((t, j) => /* @__PURE__ */ jsx("li", { dangerouslySetInnerHTML: { __html: t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") } }, j)) }, i);
		return /* @__PURE__ */ jsx("p", { dangerouslySetInnerHTML: { __html: block.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") } }, i);
	});
}
function PostPage() {
	const { post, related } = useSuspenseQuery(qo(Route.useParams().slug)).data;
	return /* @__PURE__ */ jsxs("article", {
		className: "fade-in",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "container-prose pt-8",
				children: /* @__PURE__ */ jsx(Breadcrumbs, { items: [
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
						path: `/blog/${post.slug}`
					}
				] })
			}),
			/* @__PURE__ */ jsxs("header", {
				className: "container-prose max-w-3xl pt-8 pb-6",
				children: [
					/* @__PURE__ */ jsxs("p", {
						className: "eyebrow",
						children: [
							new Date(post.published_at).toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric"
							}),
							" · ",
							post.read_minutes,
							" min read"
						]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "font-display text-5xl mt-3 leading-tight",
						children: post.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-lg text-muted-foreground",
						children: post.excerpt
					})
				]
			}),
			post.cover_image && /* @__PURE__ */ jsx("div", {
				className: "container-prose max-w-4xl",
				children: /* @__PURE__ */ jsx("div", {
					className: "card-surface overflow-hidden aspect-[16/9]",
					children: /* @__PURE__ */ jsx("img", {
						src: post.cover_image,
						alt: post.title,
						className: "h-full w-full object-cover",
						width: 1600,
						height: 900
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "container-prose max-w-3xl py-12 prose-editorial",
				children: renderMd(post.body_md)
			}),
			related.length > 0 && /* @__PURE__ */ jsxs("section", {
				className: "container-prose py-16",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-3xl mb-6",
					children: "Related guides"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-6 md:grid-cols-3",
					children: related.map((r) => /* @__PURE__ */ jsxs(Link, {
						to: "/blog/$slug",
						params: { slug: r.slug },
						className: "group block",
						children: [/* @__PURE__ */ jsx("div", {
							className: "aspect-[4/3] overflow-hidden card-surface",
							children: /* @__PURE__ */ jsx("img", {
								src: r.cover_image ?? "",
								alt: r.title,
								className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
								width: 800,
								height: 600,
								loading: "lazy"
							})
						}), /* @__PURE__ */ jsx("h3", {
							className: "font-display text-lg mt-3 group-hover:text-primary",
							children: r.title
						})]
					}, r.id))
				})]
			})
		]
	});
}
//#endregion
export { PostPage as component };
