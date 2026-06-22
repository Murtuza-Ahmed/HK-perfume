import { n as prodQO, t as Route } from "./product._slug-wNh3cPyc.js";
import { t as Breadcrumbs } from "./breadcrumbs-oTehXj7Y.js";
import { t as ProductCard } from "./product-card-bkZJIr2Y.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
//#region src/routes/product.$slug.tsx?tsr-split=component
var fmt = (price, currency) => new Intl.NumberFormat("en-US", {
	style: "currency",
	currency
}).format(Number(price));
function ProductPage() {
	const { product, category, reviews, related } = useSuspenseQuery(prodQO(Route.useParams().slug)).data;
	const faqs = Array.isArray(product.faq) ? product.faq : [];
	return /* @__PURE__ */ jsxs("div", {
		className: "fade-in",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "container-prose pt-8",
				children: /* @__PURE__ */ jsx(Breadcrumbs, { items: [
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
						path: `/product/${product.slug}`
					}
				] })
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "container-prose py-10 grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ jsx("div", {
					className: "card-surface overflow-hidden aspect-square",
					children: /* @__PURE__ */ jsx("img", {
						src: product.images[0],
						alt: product.name,
						className: "h-full w-full object-cover",
						width: 1e3,
						height: 1e3
					})
				}), /* @__PURE__ */ jsxs("div", { children: [
					product.brand && /* @__PURE__ */ jsx("p", {
						className: "eyebrow",
						children: product.brand
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "font-display text-4xl md:text-5xl mt-2",
						children: product.name
					}),
					product.rating_count > 0 && /* @__PURE__ */ jsxs("p", {
						className: "mt-3 flex items-center gap-1 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx(Star, {
								size: 14,
								className: "fill-primary text-primary"
							}),
							Number(product.rating_avg).toFixed(1),
							" · ",
							product.rating_count,
							" reviews"
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 text-2xl text-foreground",
						children: fmt(product.price, product.currency)
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: product.stock > 0 ? `In stock · ships within 48h` : "Currently restocking"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 leading-relaxed text-muted-foreground",
						children: product.description
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex gap-3",
						children: [/* @__PURE__ */ jsx("button", {
							className: "btn-gold",
							disabled: product.stock === 0,
							children: product.stock > 0 ? "Add to bag" : "Notify me"
						}), /* @__PURE__ */ jsx(Link, {
							to: "/contact",
							className: "btn-outline",
							children: "Ask concierge"
						})]
					}),
					faqs.length > 0 && /* @__PURE__ */ jsxs("div", {
						className: "mt-12",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "font-display text-2xl mb-4",
							children: "Questions"
						}), /* @__PURE__ */ jsx("dl", {
							className: "space-y-4",
							children: faqs.map((f, i) => /* @__PURE__ */ jsxs("div", {
								className: "card-surface p-5",
								children: [/* @__PURE__ */ jsx("dt", {
									className: "font-medium text-foreground",
									children: f.q
								}), /* @__PURE__ */ jsx("dd", {
									className: "mt-1 text-sm text-muted-foreground",
									children: f.a
								})]
							}, i))
						})]
					})
				] })]
			}),
			reviews.length > 0 && /* @__PURE__ */ jsxs("section", {
				className: "container-prose py-12",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-3xl mb-6",
					children: "What collectors say"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: reviews.map((r) => /* @__PURE__ */ jsxs("article", {
						className: "card-surface p-5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-medium text-foreground",
									children: r.author_name
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground",
									children: new Date(r.created_at).toLocaleDateString()
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-1 flex gap-0.5 text-primary",
								children: Array.from({ length: r.rating }).map((_, i) => /* @__PURE__ */ jsx(Star, {
									size: 12,
									className: "fill-primary"
								}, i))
							}),
							r.title && /* @__PURE__ */ jsx("p", {
								className: "font-medium mt-2",
								children: r.title
							}),
							r.body && /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground mt-1",
								children: r.body
							})
						]
					}, r.id))
				})]
			}),
			related.length > 0 && /* @__PURE__ */ jsxs("section", {
				className: "container-prose py-16",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-3xl mb-6",
					children: "You may also like"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: related.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
				})]
			})
		]
	});
}
//#endregion
export { ProductPage as component };
