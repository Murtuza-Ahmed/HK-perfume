import { t as supabase } from "./client-Bzz7lMac.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
//#region src/integrations/lovable/index.ts
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		redirect_uri: opts?.redirect_uri,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
//#endregion
//#region src/routes/auth.tsx?tsr-split=component
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = useState("signin");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [busy, setBusy] = useState(false);
	useEffect(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({ to: "/account" });
		});
	}, [navigate]);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			if (mode === "signin") {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				toast.success("Welcome back");
				navigate({ to: "/account" });
			} else {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: window.location.origin,
						data: { name }
					}
				});
				if (error) throw error;
				toast.success("Account created — check your email if confirmation is required");
				navigate({ to: "/account" });
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setBusy(false);
		}
	}
	async function signInGoogle() {
		const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
		if (r.error) toast.error(r.error.message);
		else if (!r.redirected) navigate({ to: "/account" });
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "container-prose py-16 max-w-md",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-4xl text-center",
				children: mode === "signin" ? "Sign in" : "Create account"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-center text-sm text-muted-foreground mt-2",
				children: mode === "signin" ? "Welcome back to Lumen & Oud." : "Join the house."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "card-surface p-6 mt-8",
				children: [
					/* @__PURE__ */ jsx("button", {
						onClick: signInGoogle,
						className: "btn-outline w-full",
						children: "Continue with Google"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-5 flex items-center gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx("div", { className: "flex-1 hairline" }),
							" or ",
							/* @__PURE__ */ jsx("div", { className: "flex-1 hairline" })
						]
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit,
						className: "space-y-3",
						children: [
							mode === "signup" && /* @__PURE__ */ jsx("input", {
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "Name",
								className: "w-full bg-input border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "Email",
								className: "w-full bg-input border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "password",
								required: true,
								minLength: 8,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "Password",
								className: "w-full bg-input border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
							}),
							/* @__PURE__ */ jsx("button", {
								disabled: busy,
								className: "btn-gold w-full",
								children: busy ? "…" : mode === "signin" ? "Sign in" : "Create account"
							})
						]
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground text-center mt-4",
						children: [
							mode === "signin" ? "New here?" : "Have an account?",
							" ",
							/* @__PURE__ */ jsx("button", {
								onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
								className: "text-primary",
								children: mode === "signin" ? "Create one" : "Sign in"
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { AuthPage as component };
