import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronRight } from "lucide-react";
//#region src/components/breadcrumbs.tsx
function Breadcrumbs({ items }) {
	return /* @__PURE__ */ jsx("nav", {
		"aria-label": "Breadcrumb",
		className: "text-xs text-muted-foreground",
		children: /* @__PURE__ */ jsx("ol", {
			className: "flex flex-wrap items-center gap-1",
			children: items.map((it, i) => {
				const isLast = i === items.length - 1;
				return /* @__PURE__ */ jsxs("li", {
					className: "flex items-center gap-1",
					children: [i > 0 && /* @__PURE__ */ jsx(ChevronRight, {
						size: 12,
						className: "opacity-60"
					}), isLast ? /* @__PURE__ */ jsx("span", {
						className: "text-foreground",
						children: it.name
					}) : /* @__PURE__ */ jsx(Link, {
						to: it.path,
						className: "hover:text-primary",
						children: it.name
					})]
				}, it.path);
			})
		})
	});
}
//#endregion
export { Breadcrumbs as t };
