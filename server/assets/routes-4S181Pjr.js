import { t as homeQO } from "./routes-CvmLL6BT.js";
import { t as ProductCard } from "./product-card-bkZJIr2Y.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
function HomePage() {
	const { data } = useSuspenseQuery(homeQO);
	return /* @__PURE__ */ jsxs("div", {
		className: "fade-in",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "relative -mt-16 md:-mt-20 h-[88vh] min-h-[600px] flex items-end overflow-hidden",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: "/images/hero-home.webp",
						alt: "A perfume bottle on dark velvet with smoke curling overhead",
						width: 1600,
						height: 900,
						fetchPriority: "high",
						className: "absolute inset-0 h-full w-full object-cover"
					}),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" }),
					/* @__PURE__ */ jsxs("div", {
						className: "container-prose relative pb-20 md:pb-28",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "eyebrow mb-4",
								children: "Est. 2018 · Dubai"
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "font-display text-5xl md:text-7xl max-w-3xl leading-[1.05]",
								children: "Rare scents, quiet horology, and the cloth of devotion."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-6 max-w-xl text-base md:text-lg text-muted-foreground",
								children: "A small house curating fragrances, mechanical watches, and handcrafted topis. Each piece is chosen, serviced, and shipped with care."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ jsx(Link, {
									to: "/category/$slug",
									params: { slug: "perfumes" },
									className: "btn-gold",
									children: "Explore the library"
								}), /* @__PURE__ */ jsx(Link, {
									to: "/blog",
									className: "btn-outline",
									children: "Read the guides"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "container-prose py-20",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex items-end justify-between mb-10",
					children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "eyebrow",
						children: "Three houses, one boutique"
					}), /* @__PURE__ */ jsx("h2", {
						className: "font-display text-4xl mt-2",
						children: "The collections"
					})] })
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-6 md:grid-cols-3",
					children: data.categories.map((c) => /* @__PURE__ */ jsxs(Link, {
						to: "/category/$slug",
						params: { slug: c.slug },
						className: "group relative h-[440px] overflow-hidden card-surface",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: c.hero_image ?? "/images/cat-perfumes.webp",
								alt: c.name,
								width: 1200,
								height: 800,
								loading: "lazy",
								className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							}),
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }),
							/* @__PURE__ */ jsxs("div", {
								className: "absolute bottom-0 p-7",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "eyebrow",
										children: c.tagline
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "font-display text-3xl mt-1 text-foreground",
										children: c.name
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "mt-3 inline-flex items-center gap-1 text-primary text-sm",
										children: ["Explore ", /* @__PURE__ */ jsx(ArrowRight, { size: 14 })]
									})
								]
							})
						]
					}, c.id))
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "container-prose py-12",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex items-end justify-between mb-10",
					children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "eyebrow",
						children: "House favourites"
					}), /* @__PURE__ */ jsx("h2", {
						className: "font-display text-4xl mt-2",
						children: "Featured this season"
					})] })
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: data.featured.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "container-prose py-20",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-end justify-between mb-10",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "eyebrow",
						children: "From the editors"
					}), /* @__PURE__ */ jsx("h2", {
						className: "font-display text-4xl mt-2",
						children: "Buying guides"
					})] }), /* @__PURE__ */ jsx(Link, {
						to: "/blog",
						className: "text-sm text-primary hover:underline",
						children: "All guides →"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-8 md:grid-cols-3",
					children: data.posts.map((p) => /* @__PURE__ */ jsxs(Link, {
						to: "/blog/$slug",
						params: { slug: p.slug },
						className: "group block",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "aspect-[4/3] overflow-hidden card-surface",
								children: /* @__PURE__ */ jsx("img", {
									src: p.cover_image ?? "/images/guide-oud.webp",
									alt: p.title,
									width: 1200,
									height: 800,
									loading: "lazy",
									className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
								})
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "font-display text-xl mt-4 leading-tight group-hover:text-primary transition-colors",
								children: p.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground mt-2 line-clamp-2",
								children: p.excerpt
							})
						]
					}, p.id))
				})]
			})
		]
	});
}
//#endregion
export { HomePage as component };
