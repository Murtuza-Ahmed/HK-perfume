import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/_authenticated/account.tsx
var $$splitComponentImporter = () => import("./account-BvZnWDLx.js");
var Route = createFileRoute("/_authenticated/account")({
	head: () => ({
		meta: [
			{ title: "My Account | Lumen & Oud" },
			{
				name: "robots",
				content: "noindex"
			},
			{
				property: "og:url",
				content: "/account"
			}
		],
		links: [{
			rel: "canonical",
			href: "/account"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
