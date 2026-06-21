import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in | Lumen & Oud" },
      { name: "description", content: "Sign in or create an account." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/auth" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/account" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
        navigate({ to: "/account" });
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin, data: { name } },
        });
        if (error) throw error;
        toast.success("Account created — check your email if confirmation is required");
        navigate({ to: "/account" });
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function signInGoogle() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) toast.error(r.error.message);
    else if (!r.redirected) navigate({ to: "/account" });
  }

  return (
    <div className="container-prose py-16 max-w-md">
      <h1 className="font-display text-4xl text-center">{mode === "signin" ? "Sign in" : "Create account"}</h1>
      <p className="text-center text-sm text-muted-foreground mt-2">
        {mode === "signin" ? "Welcome back to Lumen & Oud." : "Join the house."}
      </p>
      <div className="card-surface p-6 mt-8">
        <button onClick={signInGoogle} className="btn-outline w-full">Continue with Google</button>
        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex-1 hairline" /> or <div className="flex-1 hairline" />
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          {mode === "signup" && (
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"
              className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary" />
          )}
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
            className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary" />
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
            className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-primary" />
          <button disabled={busy} className="btn-gold w-full">{busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}</button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-4">
          {mode === "signin" ? "New here?" : "Have an account?"}{" "}
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-primary">
            {mode === "signin" ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}