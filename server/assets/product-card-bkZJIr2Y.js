import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Star } from "lucide-react";
//#region src/components/product-card.tsx
var fmt = (price, currency) => new Intl.NumberFormat("en-US", {
	style: "currency",
	currency,
	maximumFractionDigits: 0
}).format(Number(price));
function ProductCard({ product }) {
	const img = product.images?.[0] ?? "/images/cat-perfumes.webp";
	return /* @__PURE__ */ jsxs(Link, {
		to: "/product/$slug",
		params: { slug: product.slug },
		className: "group block card-surface overflow-hidden transition-transform hover:-translate-y-1",
		children: [/* @__PURE__ */ jsx("div", {
			className: "aspect-square overflow-hidden bg-secondary",
			children: /* @__PURE__ */ jsx("img", {
				src: img,
				alt: product.name,
				loading: "lazy",
				decoding: "async",
				width: 800,
				height: 800,
				className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "p-5",
			children: [
				product.brand && /* @__PURE__ */ jsx("p", {
					className: "eyebrow mb-1",
					children: product.brand
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "font-display text-lg leading-tight",
					children: product.name
				}),
				product.short_description && /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-muted-foreground line-clamp-2",
					children: product.short_description
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-foreground font-medium",
						children: fmt(product.price, product.currency)
					}), product.rating_count ? /* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-1 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx(Star, {
								size: 12,
								className: "fill-primary text-primary"
							}),
							Number(product.rating_avg).toFixed(1),
							" (",
							product.rating_count,
							")"
						]
					}) : null]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
