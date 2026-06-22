import { t as qo } from "./contact-CwRy2KHw.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Mail, MapPin, Phone } from "lucide-react";
//#region src/routes/contact.tsx?tsr-split=component
function ContactPage() {
	const { data: b } = useSuspenseQuery(qo);
	if (!b) return null;
	const hours = b.hours ?? [];
	return /* @__PURE__ */ jsxs("div", {
		className: "container-prose py-16 fade-in",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "eyebrow",
				children: "Visit & concierge"
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-5xl mt-2",
				children: "Find us"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-12 lg:grid-cols-2 mt-12",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ jsx(MapPin, {
								size: 18,
								className: "text-primary mt-1"
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-foreground font-medium",
								children: "Atelier"
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-sm text-muted-foreground",
								children: [
									b.street,
									/* @__PURE__ */ jsx("br", {}),
									b.city,
									", ",
									b.region,
									" ",
									b.postal_code,
									/* @__PURE__ */ jsx("br", {}),
									b.country
								]
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ jsx(Mail, {
								size: 18,
								className: "text-primary mt-1"
							}), /* @__PURE__ */ jsx("a", {
								href: `mailto:${b.email}`,
								className: "text-sm hover:text-primary",
								children: b.email
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ jsx(Phone, {
								size: 18,
								className: "text-primary mt-1"
							}), /* @__PURE__ */ jsx("a", {
								href: `tel:${b.phone}`,
								className: "text-sm hover:text-primary",
								children: b.phone
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-10",
					children: [/* @__PURE__ */ jsx("p", {
						className: "eyebrow mb-3",
						children: "Opening hours"
					}), /* @__PURE__ */ jsx("dl", {
						className: "text-sm divide-y divide-border border-y border-border",
						children: hours.map((h) => /* @__PURE__ */ jsxs("div", {
							className: "flex justify-between py-2",
							children: [/* @__PURE__ */ jsx("dt", {
								className: "text-muted-foreground",
								children: h.day
							}), /* @__PURE__ */ jsx("dd", {
								className: "text-foreground",
								children: h.hours
							})]
						}, h.day))
					})]
				})] }), /* @__PURE__ */ jsx("div", {
					className: "card-surface overflow-hidden aspect-[4/3]",
					children: b.map_embed_url && /* @__PURE__ */ jsx("iframe", {
						src: b.map_embed_url,
						title: "Boutique location",
						loading: "lazy",
						className: "h-full w-full border-0"
					})
				})]
			})
		]
	});
}
//#endregion
export { ContactPage as component };
