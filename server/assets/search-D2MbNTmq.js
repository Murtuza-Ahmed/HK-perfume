import { t as useServerFn } from "./useServerFn-CrZF2pjq.js";
import { s as search } from "./storefront.functions-tItMHKrC.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Search } from "lucide-react";
//#region src/routes/search.tsx?tsr-split=component
function SearchPage() {
	const [q, setQ] = useState("");
	const [results, setResults] = useState(null);
	const run = useServerFn(search);
	return /* @__PURE__ */ jsxs("div", {
		className: "container-prose py-16 max-w-2xl",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-4xl",
				children: "Search"
			}),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: async (e) => {
					e.preventDefault();
					if (!q.trim()) return;
					setResults(await run({ data: { q } }));
				},
				className: "mt-6 flex gap-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ jsx(Search, {
						size: 16,
						className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
					}), /* @__PURE__ */ jsx("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Oud, dive watch, kufi…",
						className: "w-full bg-input border border-border rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary"
					})]
				}), /* @__PURE__ */ jsx("button", {
					className: "btn-gold",
					children: "Search"
				})]
			}),
			results && /* @__PURE__ */ jsxs("div", {
				className: "mt-10 space-y-8",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow mb-3",
					children: "Products"
				}), results.products.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "No products matched."
				}) : /* @__PURE__ */ jsx("ul", {
					className: "space-y-2",
					children: results.products.map((p) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/product/$slug",
						params: { slug: p.slug },
						className: "hover:text-primary",
						children: p.name
					}) }, p.slug))
				})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow mb-3",
					children: "Guides"
				}), results.posts.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "No guides matched."
				}) : /* @__PURE__ */ jsx("ul", {
					className: "space-y-2",
					children: results.posts.map((p) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/blog/$slug",
						params: { slug: p.slug },
						className: "hover:text-primary",
						children: p.title
					}) }, p.slug))
				})] })]
			})
		]
	});
}
//#endregion
export { SearchPage as component };
