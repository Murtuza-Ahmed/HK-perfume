import { n as catQO, t as Route } from "./category._slug-DA3BHASj.js";
import { t as Breadcrumbs } from "./breadcrumbs-oTehXj7Y.js";
import { t as ProductCard } from "./product-card-bkZJIr2Y.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
//#region src/routes/category.$slug.tsx?tsr-split=component
function CategoryPage() {
	const { category, products } = useSuspenseQuery(catQO(Route.useParams().slug)).data;
	return /* @__PURE__ */ jsxs("div", {
		className: "fade-in",
		children: [/* @__PURE__ */ jsxs("section", {
			className: "relative h-[50vh] min-h-[360px] flex items-end overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: category.hero_image ?? "",
					alt: category.name,
					className: "absolute inset-0 h-full w-full object-cover",
					width: 1600,
					height: 800
				}),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" }),
				/* @__PURE__ */ jsxs("div", {
					className: "container-prose relative pb-10",
					children: [
						/* @__PURE__ */ jsx(Breadcrumbs, { items: [{
							name: "Home",
							path: "/"
						}, {
							name: category.name,
							path: `/category/${category.slug}`
						}] }),
						/* @__PURE__ */ jsx("p", {
							className: "eyebrow mt-4",
							children: category.tagline
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "font-display text-5xl md:text-6xl mt-2",
							children: category.name
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 max-w-2xl text-muted-foreground",
							children: category.description
						})
					]
				})
			]
		}), /* @__PURE__ */ jsx("section", {
			className: "container-prose py-16",
			children: products.length === 0 ? /* @__PURE__ */ jsxs("p", {
				className: "text-muted-foreground",
				children: [
					"Restocking soon. ",
					/* @__PURE__ */ jsx(Link, {
						to: "/blog",
						className: "text-primary",
						children: "Read our guides"
					}),
					" in the meantime."
				]
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: products.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
			})
		})]
	});
}
//#endregion
export { CategoryPage as component };
