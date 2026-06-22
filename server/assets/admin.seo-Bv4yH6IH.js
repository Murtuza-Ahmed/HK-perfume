import { t as useServerFn } from "./useServerFn-CrZF2pjq.js";
import { a as upsertSeoMeta, i as upsertRedirect, n as getAdminStatus, r as listAllSeoEntities, t as deleteRedirect } from "./admin.functions-6T18_i_R.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/_authenticated/admin.seo.tsx?tsr-split=component
function AdminSeo() {
	const checkAdmin = useServerFn(getAdminStatus);
	const list = useServerFn(listAllSeoEntities);
	const saveMeta = useServerFn(upsertSeoMeta);
	const saveRedirect = useServerFn(upsertRedirect);
	const dropRedirect = useServerFn(deleteRedirect);
	const [state, setState] = useState({
		loading: true,
		admin: null,
		data: null
	});
	async function refresh() {
		setState((s) => ({
			...s,
			loading: true
		}));
		const { isAdmin } = await checkAdmin();
		if (!isAdmin) {
			setState({
				loading: false,
				admin: false,
				data: null
			});
			return;
		}
		setState({
			loading: false,
			admin: true,
			data: await list()
		});
	}
	useEffect(() => {
		refresh();
	}, []);
	if (state.loading) return /* @__PURE__ */ jsx("div", {
		className: "container-prose py-20 flex justify-center",
		children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary" })
	});
	if (state.admin === false) return /* @__PURE__ */ jsxs("div", {
		className: "container-prose py-20",
		children: [/* @__PURE__ */ jsx("h1", {
			className: "font-display text-3xl",
			children: "Admin access only"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-2",
			children: "Your account is signed in but does not have the admin role. Ask a teammate to grant it."
		})]
	});
	const d = state.data;
	const metaIndex = new Map(d.meta.map((m) => [`${m.entity_type}:${m.entity_key}`, m]));
	return /* @__PURE__ */ jsxs("div", {
		className: "container-prose py-12",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-4xl",
				children: "SEO dashboard"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-2",
				children: "Override titles, descriptions, and keywords for any product, category, or post. Manage redirects. Sitemap and robots are generated automatically."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-12 grid gap-6 md:grid-cols-3",
				children: [
					/* @__PURE__ */ jsx(Stat, {
						label: "Products",
						value: d.products.length
					}),
					/* @__PURE__ */ jsx(Stat, {
						label: "Categories",
						value: d.categories.length
					}),
					/* @__PURE__ */ jsx(Stat, {
						label: "Guides",
						value: d.posts.length
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-2xl mb-4",
					children: "Sitemap & robots"
				}), /* @__PURE__ */ jsxs("div", {
					className: "card-surface p-5 text-sm",
					children: [/* @__PURE__ */ jsxs("p", { children: [
						"Sitemap: ",
						/* @__PURE__ */ jsx("a", {
							href: "/sitemap.xml",
							target: "_blank",
							className: "text-primary underline",
							children: "/sitemap.xml"
						}),
						" — auto-generated from current products and posts."
					] }), /* @__PURE__ */ jsxs("p", {
						className: "mt-2",
						children: ["Robots: ", /* @__PURE__ */ jsx("a", {
							href: "/robots.txt",
							target: "_blank",
							className: "text-primary underline",
							children: "/robots.txt"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-2xl mb-4",
					children: "Meta overrides"
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-3",
					children: [
						...d.products.map((p) => ({
							type: "product",
							key: p.slug,
							name: p.name,
							defaults: {
								title: p.seo_title,
								description: p.seo_description,
								keywords: p.seo_keywords
							}
						})),
						...d.categories.map((c) => ({
							type: "category",
							key: c.slug,
							name: c.name,
							defaults: {
								title: c.seo_title,
								description: c.seo_description,
								keywords: c.seo_keywords
							}
						})),
						...d.posts.map((p) => ({
							type: "post",
							key: p.slug,
							name: p.title,
							defaults: {
								title: p.seo_title,
								description: p.seo_description,
								keywords: p.seo_keywords
							}
						}))
					].map((row) => {
						return /* @__PURE__ */ jsx(MetaRow, {
							row,
							ov: metaIndex.get(`${row.type}:${row.key}`),
							onSave: async (patch) => {
								await saveMeta({ data: {
									entity_type: row.type,
									entity_key: row.key,
									...patch
								} });
								toast.success("Saved");
								refresh();
							}
						}, `${row.type}:${row.key}`);
					})
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "mt-16",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-display text-2xl mb-4",
						children: "Redirects"
					}),
					/* @__PURE__ */ jsx(RedirectForm, { onSave: async (data) => {
						await saveRedirect({ data });
						toast.success("Redirect saved");
						refresh();
					} }),
					/* @__PURE__ */ jsx("div", {
						className: "mt-4 space-y-2",
						children: d.redirects.map((r) => /* @__PURE__ */ jsxs("div", {
							className: "card-surface p-4 flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: r.from_path
								}),
								" → ",
								/* @__PURE__ */ jsx("span", {
									className: "text-foreground",
									children: r.to_path
								}),
								" ",
								/* @__PURE__ */ jsxs("span", {
									className: "text-xs text-muted-foreground",
									children: [
										"[",
										r.status,
										"]"
									]
								})
							] }), /* @__PURE__ */ jsx("button", {
								onClick: async () => {
									await dropRedirect({ data: { id: r.id } });
									toast.success("Deleted");
									refresh();
								},
								className: "text-destructive p-2",
								children: /* @__PURE__ */ jsx(Trash2, { size: 14 })
							})]
						}, r.id))
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-2xl mb-4",
					children: "Analytics"
				}), /* @__PURE__ */ jsxs("div", {
					className: "card-surface p-5 text-sm text-muted-foreground",
					children: [
						"Connect Google Analytics or Plausible to populate this panel. Add the tracking script via the root route's ",
						/* @__PURE__ */ jsx("code", { children: "head().scripts" }),
						"."
					]
				})]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "card-surface p-5",
		children: [/* @__PURE__ */ jsx("p", {
			className: "eyebrow",
			children: label
		}), /* @__PURE__ */ jsx("p", {
			className: "font-display text-3xl mt-1",
			children: value
		})]
	});
}
function MetaRow({ row, ov, onSave }) {
	const [t, setT] = useState(ov?.title ?? row.defaults.title ?? "");
	const [desc, setDesc] = useState(ov?.description ?? row.defaults.description ?? "");
	const [kw, setKw] = useState(ov?.keywords ?? row.defaults.keywords ?? "");
	return /* @__PURE__ */ jsxs("details", {
		className: "card-surface p-4",
		children: [/* @__PURE__ */ jsxs("summary", {
			className: "cursor-pointer flex justify-between items-center text-sm",
			children: [/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
				className: "eyebrow mr-2",
				children: row.type
			}), row.name] }), /* @__PURE__ */ jsx("span", {
				className: "text-xs text-muted-foreground",
				children: row.key
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-3 grid gap-2",
			children: [
				/* @__PURE__ */ jsx("input", {
					value: t,
					onChange: (e) => setT(e.target.value),
					placeholder: "Title",
					className: "bg-input border border-border rounded px-3 py-2 text-sm"
				}),
				/* @__PURE__ */ jsx("textarea", {
					value: desc,
					onChange: (e) => setDesc(e.target.value),
					placeholder: "Description",
					rows: 2,
					className: "bg-input border border-border rounded px-3 py-2 text-sm"
				}),
				/* @__PURE__ */ jsx("input", {
					value: kw,
					onChange: (e) => setKw(e.target.value),
					placeholder: "Keywords",
					className: "bg-input border border-border rounded px-3 py-2 text-sm"
				}),
				/* @__PURE__ */ jsxs("button", {
					className: "btn-gold self-start gap-2",
					onClick: () => onSave({
						title: t || null,
						description: desc || null,
						keywords: kw || null
					}),
					children: [/* @__PURE__ */ jsx(Save, { size: 14 }), " Save"]
				})
			]
		})]
	});
}
function RedirectForm({ onSave }) {
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: (e) => {
			e.preventDefault();
			if (!from.startsWith("/") || !to.startsWith("/")) return;
			onSave({
				from_path: from,
				to_path: to,
				status: 301
			});
			setFrom("");
			setTo("");
		},
		className: "card-surface p-4 flex flex-wrap gap-2 items-end",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex-1 min-w-[10rem]",
				children: [/* @__PURE__ */ jsx("label", {
					className: "block text-xs text-muted-foreground mb-1",
					children: "From"
				}), /* @__PURE__ */ jsx("input", {
					value: from,
					onChange: (e) => setFrom(e.target.value),
					placeholder: "/old-path",
					className: "w-full bg-input border border-border rounded px-3 py-2 text-sm"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex-1 min-w-[10rem]",
				children: [/* @__PURE__ */ jsx("label", {
					className: "block text-xs text-muted-foreground mb-1",
					children: "To"
				}), /* @__PURE__ */ jsx("input", {
					value: to,
					onChange: (e) => setTo(e.target.value),
					placeholder: "/new-path",
					className: "w-full bg-input border border-border rounded px-3 py-2 text-sm"
				})]
			}),
			/* @__PURE__ */ jsxs("button", {
				className: "btn-gold gap-2",
				children: [/* @__PURE__ */ jsx(Plus, { size: 14 }), " Add"]
			})
		]
	});
}
//#endregion
export { AdminSeo as component };
