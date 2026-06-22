import { a as ld, l as websiteLd, n as breadcrumbLd, o as localBusinessLd, s as organizationLd } from "./jsonld-Bxxk1c0t.js";
import { t as qo } from "./contact-CwRy2KHw.js";
import { t as qo$1 } from "./blog-C0Xn_yk6.js";
import { t as supabase } from "./client-Bzz7lMac.js";
import { t as homeQO } from "./routes-CvmLL6BT.js";
import { t as Route$10 } from "./product._slug-wNh3cPyc.js";
import { t as Route$11 } from "./category._slug-DA3BHASj.js";
import { t as Route$12 } from "./blog._slug-r3cMexHE.js";
import { t as Route$13 } from "./account-CFoX-SC1.js";
import { useEffect, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { createClient } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Menu, Search, User, X } from "lucide-react";
//#region src/styles.css?url
var styles_default = "/HK-perfume/assets/styles-CR-n5aQp.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/components/site-header.tsx
var NAV = [
	{
		to: "/category/$slug",
		params: { slug: "perfumes" },
		label: "Perfumes"
	},
	{
		to: "/category/$slug",
		params: { slug: "watches" },
		label: "Watches"
	},
	{
		to: "/category/$slug",
		params: { slug: "topis" },
		label: "Topis"
	},
	{
		to: "/blog",
		label: "Guides"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ jsxs("header", {
		className: `sticky top-0 z-40 transition-colors ${scrolled ? "bg-background/85 backdrop-blur border-b border-border" : "bg-transparent"}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container-prose flex items-center justify-between h-16 md:h-20",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					to: "/",
					className: "font-display text-2xl tracking-tight",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-foreground",
							children: "Lumen"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-primary",
							children: " & "
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-foreground",
							children: "Oud"
						})
					]
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "hidden md:flex items-center gap-8",
					children: NAV.map((n) => /* @__PURE__ */ jsx(Link, {
						to: n.to,
						params: n.params,
						className: "text-sm text-muted-foreground hover:text-primary transition-colors",
						activeProps: { className: "text-primary text-sm" },
						children: n.label
					}, n.label))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "hidden md:flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/search",
						"aria-label": "Search",
						className: "p-2 text-muted-foreground hover:text-primary",
						children: /* @__PURE__ */ jsx(Search, { size: 18 })
					}), /* @__PURE__ */ jsx(Link, {
						to: "/account",
						"aria-label": "Account",
						className: "p-2 text-muted-foreground hover:text-primary",
						children: /* @__PURE__ */ jsx(User, { size: 18 })
					})]
				}),
				/* @__PURE__ */ jsx("button", {
					className: "md:hidden p-2 text-foreground",
					onClick: () => setOpen((v) => !v),
					"aria-label": open ? "Close menu" : "Open menu",
					children: open ? /* @__PURE__ */ jsx(X, { size: 22 }) : /* @__PURE__ */ jsx(Menu, { size: 22 })
				})
			]
		}), open && /* @__PURE__ */ jsx("div", {
			className: "md:hidden border-t border-border bg-background",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-prose flex flex-col py-4 gap-3",
				children: [NAV.map((n) => /* @__PURE__ */ jsx(Link, {
					to: n.to,
					params: n.params,
					onClick: () => setOpen(false),
					className: "text-base text-foreground py-1",
					children: n.label
				}, n.label)), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-4 pt-2 border-t border-border",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/search",
						onClick: () => setOpen(false),
						className: "text-sm text-muted-foreground",
						children: "Search"
					}), /* @__PURE__ */ jsx(Link, {
						to: "/account",
						onClick: () => setOpen(false),
						className: "text-sm text-muted-foreground",
						children: "Account"
					})]
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/site-footer.tsx
function SiteFooter() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "border-t border-border mt-24 bg-background",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container-prose py-16 grid gap-12 md:grid-cols-4",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
					className: "font-display text-2xl",
					children: [
						/* @__PURE__ */ jsx("span", { children: "Lumen" }),
						/* @__PURE__ */ jsx("span", {
							className: "text-primary",
							children: " & "
						}),
						/* @__PURE__ */ jsx("span", { children: "Oud" })
					]
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground mt-4 max-w-xs",
					children: "A curated boutique of fine fragrances, mechanical watches, and handcrafted Islamic topis."
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow mb-4",
					children: "Shop"
				}), /* @__PURE__ */ jsxs("ul", {
					className: "space-y-2 text-sm",
					children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/category/$slug",
							params: { slug: "perfumes" },
							className: "text-muted-foreground hover:text-primary",
							children: "Perfumes"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/category/$slug",
							params: { slug: "watches" },
							className: "text-muted-foreground hover:text-primary",
							children: "Watches"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/category/$slug",
							params: { slug: "topis" },
							className: "text-muted-foreground hover:text-primary",
							children: "Topis"
						}) })
					]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow mb-4",
					children: "Discover"
				}), /* @__PURE__ */ jsxs("ul", {
					className: "space-y-2 text-sm",
					children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/blog",
							className: "text-muted-foreground hover:text-primary",
							children: "Buying guides"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/about",
							className: "text-muted-foreground hover:text-primary",
							children: "Our story"
						}) }),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/contact",
							className: "text-muted-foreground hover:text-primary",
							children: "Visit the boutique"
						}) })
					]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow mb-4",
					children: "Account"
				}), /* @__PURE__ */ jsxs("ul", {
					className: "space-y-2 text-sm",
					children: [/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/auth",
						className: "text-muted-foreground hover:text-primary",
						children: "Sign in"
					}) }), /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/account",
						className: "text-muted-foreground hover:text-primary",
						children: "My account"
					}) })]
				})] })
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "hairline",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-prose py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsxs("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Lumen & Oud Ltd. All rights reserved."
				] }), /* @__PURE__ */ jsx("p", { children: "Dubai · London · Istanbul" })]
			})
		})]
	});
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lumen & Oud — Fine Fragrances, Watches & Topis" },
			{
				name: "description",
				content: "A curated boutique of niche perfumes, mechanical watches, and handcrafted Islamic topis."
			},
			{
				name: "author",
				content: "Lumen & Oud"
			},
			{
				name: "theme-color",
				content: "#1b1726"
			},
			{
				property: "og:site_name",
				content: "Lumen & Oud"
			},
			{
				property: "og:title",
				content: "Lumen & Oud"
			},
			{
				property: "og:description",
				content: "Niche perfumes, mechanical watches, and handcrafted Islamic topis."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@lumenandoud"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico"
		}],
		scripts: [ld(organizationLd({
			name: "Lumen & Oud",
			url: "/",
			social: { instagram: "https://instagram.com/lumenandoud" }
		})), ld(websiteLd({ name: "Lumen & Oud" }))]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsxs("div", {
			className: "min-h-screen flex flex-col",
			children: [
				/* @__PURE__ */ jsx(SiteHeader, {}),
				/* @__PURE__ */ jsx("main", {
					className: "flex-1",
					children: /* @__PURE__ */ jsx(Outlet, {})
				}),
				/* @__PURE__ */ jsx(SiteFooter, {})
			]
		})
	});
}
//#endregion
//#region src/routes/sitemap[.]xml.ts
var BASE_URL = "";
var Route$8 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
	const [{ data: cats }, { data: products }, { data: posts }] = await Promise.all([
		sb.from("categories").select("slug"),
		sb.from("products").select("slug, updated_at"),
		sb.from("posts").select("slug, published_at")
	]);
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/about",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/contact",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/blog",
				changefreq: "weekly",
				priority: "0.8"
			},
			...(cats ?? []).map((c) => ({
				path: `/category/${c.slug}`,
				changefreq: "weekly",
				priority: "0.8"
			})),
			...(products ?? []).map((p) => ({
				path: `/product/${p.slug}`,
				lastmod: p.updated_at,
				changefreq: "weekly",
				priority: "0.7"
			})),
			...(posts ?? []).map((p) => ({
				path: `/blog/${p.slug}`,
				lastmod: p.published_at,
				changefreq: "monthly",
				priority: "0.6"
			}))
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
//#endregion
//#region src/routes/search.tsx
var $$splitComponentImporter$7 = () => import("./search-D2MbNTmq.js");
var Route$7 = createFileRoute("/search")({
	head: () => ({
		meta: [
			{ title: "Search | Lumen & Oud" },
			{
				name: "description",
				content: "Search perfumes, watches, topis, and buying guides."
			},
			{
				property: "og:url",
				content: "/search"
			},
			{
				name: "robots",
				content: "noindex"
			}
		],
		links: [{
			rel: "canonical",
			href: "/search"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
//#endregion
//#region src/routes/contact.tsx
var $$splitComponentImporter$6 = () => import("./contact-Bxd9FXWA.js");
var Route$6 = createFileRoute("/contact")({
	loader: ({ context }) => context.queryClient.ensureQueryData(qo),
	head: ({ loaderData }) => {
		const b = loaderData;
		return {
			meta: [
				{ title: `Contact & Visit | ${b?.name ?? "Lumen & Oud"}` },
				{
					name: "description",
					content: `Visit our Dubai boutique or reach our concierge by email and phone. ${b?.description ?? ""}`
				},
				{
					property: "og:title",
					content: `Contact ${b?.name ?? "Lumen & Oud"}`
				},
				{
					property: "og:description",
					content: "Boutique address, hours, and concierge contact."
				},
				{
					property: "og:url",
					content: "/contact"
				}
			],
			links: [{
				rel: "canonical",
				href: "/contact"
			}],
			scripts: b ? [ld(breadcrumbLd([{
				name: "Home",
				path: "/"
			}, {
				name: "Contact",
				path: "/contact"
			}])), ld(localBusinessLd({
				name: b.name,
				description: b.description ?? void 0,
				phone: b.phone ?? void 0,
				email: b.email ?? void 0,
				street: b.street ?? void 0,
				city: b.city ?? void 0,
				region: b.region ?? void 0,
				postalCode: b.postal_code ?? void 0,
				country: b.country ?? void 0,
				lat: b.lat ? Number(b.lat) : void 0,
				lng: b.lng ? Number(b.lng) : void 0,
				hours: b.hours ?? []
			}))] : []
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region src/routes/blog.tsx
var $$splitComponentImporter$5 = () => import("./blog-Dm9YkeTo.js");
var Route$5 = createFileRoute("/blog")({
	loader: ({ context }) => context.queryClient.ensureQueryData(qo$1),
	head: () => ({
		meta: [
			{ title: "Buying Guides — Perfume, Watches, Topis | Lumen & Oud" },
			{
				name: "description",
				content: "In-depth buying guides for niche perfumes, mechanical watches, and handcrafted Islamic topis."
			},
			{
				name: "keywords",
				content: "perfume guide, watch guide, topi guide, oud, kufi"
			},
			{
				property: "og:title",
				content: "Lumen & Oud — Buying Guides"
			},
			{
				property: "og:description",
				content: "In-depth guides from our editors."
			},
			{
				property: "og:url",
				content: "/blog"
			}
		],
		links: [{
			rel: "canonical",
			href: "/blog"
		}],
		scripts: [ld(breadcrumbLd([{
			name: "Home",
			path: "/"
		}, {
			name: "Guides",
			path: "/blog"
		}]))]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/auth.tsx
var $$splitComponentImporter$4 = () => import("./auth-CoBdl0lP.js");
var Route$4 = createFileRoute("/auth")({
	ssr: false,
	head: () => ({
		meta: [
			{ title: "Sign in | Lumen & Oud" },
			{
				name: "description",
				content: "Sign in or create an account."
			},
			{
				name: "robots",
				content: "noindex"
			},
			{
				property: "og:url",
				content: "/auth"
			}
		],
		links: [{
			rel: "canonical",
			href: "/auth"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/about.tsx
var $$splitComponentImporter$3 = () => import("./about-Bhni6oBc.js");
var Route$3 = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title: "About Lumen & Oud — Our House Story" },
			{
				name: "description",
				content: "How Lumen & Oud came to be: a small boutique sourcing niche fragrances, mechanical watches, and handcrafted Islamic topis from master artisans."
			},
			{
				property: "og:title",
				content: "About Lumen & Oud"
			},
			{
				property: "og:description",
				content: "A small house of three quiet obsessions."
			},
			{
				property: "og:url",
				content: "/about"
			}
		],
		links: [{
			rel: "canonical",
			href: "/about"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/_authenticated/route.tsx
var $$splitComponentImporter$2 = () => import("./route-Di7iQBCH.js");
var Route$2 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$1 = () => import("./routes-4S181Pjr.js");
var Route$1 = createFileRoute("/")({
	loader: ({ context }) => context.queryClient.ensureQueryData(homeQO),
	head: () => ({
		meta: [
			{ title: "Lumen & Oud — Niche Perfumes, Watches & Handcrafted Topis" },
			{
				name: "description",
				content: "Discover niche oud perfumes, Swiss mechanical watches, and handcrafted Islamic topis. Curated and concierge-shipped worldwide."
			},
			{
				name: "keywords",
				content: "niche perfume, oud, mechanical watch, islamic topi, kufi, luxury boutique"
			},
			{
				property: "og:title",
				content: "Lumen & Oud"
			},
			{
				property: "og:description",
				content: "Niche perfumes, mechanical watches, and handcrafted Islamic topis."
			},
			{
				property: "og:url",
				content: "/"
			},
			{
				property: "og:image",
				content: "/images/hero-home.webp"
			},
			{
				name: "twitter:image",
				content: "/images/hero-home.webp"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}, {
			rel: "preload",
			as: "image",
			href: "/images/hero-home.webp",
			fetchpriority: "high"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/_authenticated/admin.seo.tsx
var $$splitComponentImporter = () => import("./admin.seo-Bv4yH6IH.js");
var Route = createFileRoute("/_authenticated/admin/seo")({
	head: () => ({
		meta: [
			{ title: "SEO Dashboard | Lumen & Oud Admin" },
			{
				name: "robots",
				content: "noindex"
			},
			{
				property: "og:url",
				content: "/admin/seo"
			}
		],
		links: [{
			rel: "canonical",
			href: "/admin/seo"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var SitemapDotxmlRoute = Route$8.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$9
});
var SearchRoute = Route$7.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$9
});
var ContactRoute = Route$6.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$9
});
var BlogRoute = Route$5.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$9
});
var AuthRoute = Route$4.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$9
});
var AboutRoute = Route$3.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$9
});
var AuthenticatedRouteRoute = Route$2.update({
	id: "/_authenticated",
	getParentRoute: () => Route$9
});
var IndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var ProductSlugRoute = Route$10.update({
	id: "/product/$slug",
	path: "/product/$slug",
	getParentRoute: () => Route$9
});
var CategorySlugRoute = Route$11.update({
	id: "/category/$slug",
	path: "/category/$slug",
	getParentRoute: () => Route$9
});
var BlogSlugRoute = Route$12.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => BlogRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAccountRoute: Route$13.update({
		id: "/account",
		path: "/account",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedAdminSeoRoute: Route.update({
		id: "/admin/seo",
		path: "/admin/seo",
		getParentRoute: () => AuthenticatedRouteRoute
	})
};
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var BlogRouteChildren = { BlogSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	AboutRoute,
	AuthRoute,
	BlogRoute: BlogRoute._addFileChildren(BlogRouteChildren),
	ContactRoute,
	SearchRoute,
	SitemapDotxmlRoute,
	CategorySlugRoute,
	ProductSlugRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
