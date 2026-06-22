import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/about.tsx?tsr-split=component
var SplitComponent = () => /* @__PURE__ */ jsxs("div", {
	className: "container-prose py-16 max-w-3xl fade-in",
	children: [
		/* @__PURE__ */ jsx("p", {
			className: "eyebrow",
			children: "Our story"
		}),
		/* @__PURE__ */ jsx("h1", {
			className: "font-display text-5xl mt-2",
			children: "Three quiet obsessions, one small house"
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-8 prose-editorial",
			children: [
				/* @__PURE__ */ jsx("p", { children: "Lumen & Oud began in 2018 above a perfumer's atelier in Dubai. Three friends — a chemist, a watchmaker, and a textile collector — couldn't find a single boutique that took all three of their obsessions seriously, so they built one." }),
				/* @__PURE__ */ jsx("h2", { children: "What we sell" }),
				/* @__PURE__ */ jsx("p", { children: "Niche extraits and attars, individually serviced mechanical watches, and prayer caps from master artisans in Samarqand, Madinah, and Anatolia. Each piece is hand-selected and, in the case of watches, bench-tested before it ships." }),
				/* @__PURE__ */ jsx("h2", { children: "How we work" }),
				/* @__PURE__ */ jsx("p", { children: "We don't carry mass-market lines. Every product on the site has been worn, wound, or worked with by someone on the team. If a perfume's longevity disappoints us, we don't list it. If a watch's regulation drifts, we send it back." }),
				/* @__PURE__ */ jsx("h2", { children: "Where to find us" }),
				/* @__PURE__ */ jsxs("p", { children: [
					"Our atelier is in the Souk Al Bahar in Dubai. Visits by appointment — ",
					/* @__PURE__ */ jsx(Link, {
						to: "/contact",
						className: "text-primary",
						children: "drop us a line"
					}),
					"."
				] })
			]
		})
	]
});
//#endregion
export { SplitComponent as component };
