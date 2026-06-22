import { t as useServerFn } from "./useServerFn-CrZF2pjq.js";
import { t as supabase } from "./client-Bzz7lMac.js";
import { t as Route } from "./account-CFoX-SC1.js";
import { n as getAdminStatus } from "./admin.functions-6T18_i_R.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/_authenticated/account.tsx?tsr-split=component
function AccountPage() {
	const { user } = Route.useRouteContext();
	const navigate = useNavigate();
	const [isAdmin, setIsAdmin] = useState(false);
	const checkAdmin = useServerFn(getAdminStatus);
	useEffect(() => {
		checkAdmin().then((r) => setIsAdmin(r.isAdmin)).catch(() => {});
	}, [checkAdmin]);
	return /* @__PURE__ */ jsxs("div", {
		className: "container-prose py-16 max-w-2xl",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-4xl",
				children: "My account"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-2",
				children: user.email
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-10 grid gap-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "card-surface p-5",
						children: [/* @__PURE__ */ jsx("p", {
							className: "eyebrow mb-2",
							children: "Orders"
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"You have no orders yet. ",
								/* @__PURE__ */ jsx(Link, {
									to: "/",
									className: "text-primary",
									children: "Start exploring"
								}),
								"."
							]
						})]
					}),
					isAdmin && /* @__PURE__ */ jsxs(Link, {
						to: "/admin/seo",
						className: "card-surface p-5 hover:border-primary transition-colors",
						children: [/* @__PURE__ */ jsx("p", {
							className: "eyebrow mb-2",
							children: "Admin"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-foreground",
							children: "Open the SEO dashboard →"
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: async () => {
							await supabase.auth.signOut();
							navigate({ to: "/" });
						},
						className: "btn-outline self-start mt-2",
						children: "Sign out"
					})
				]
			})
		]
	});
}
//#endregion
export { AccountPage as component };
