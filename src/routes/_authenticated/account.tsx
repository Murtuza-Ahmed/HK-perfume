import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getAdminStatus } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "My Account | Lumen & Oud" },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/account" },
    ],
    links: [{ rel: "canonical", href: "/account" }],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const checkAdmin = useServerFn(getAdminStatus);
  useEffect(() => {
    checkAdmin().then((r) => setIsAdmin(r.isAdmin)).catch(() => {});
  }, [checkAdmin]);
  return (
    <div className="container-prose py-16 max-w-2xl">
      <h1 className="font-display text-4xl">My account</h1>
      <p className="text-muted-foreground mt-2">{user.email}</p>
      <div className="mt-10 grid gap-3">
        <div className="card-surface p-5">
          <p className="eyebrow mb-2">Orders</p>
          <p className="text-sm text-muted-foreground">You have no orders yet. <Link to="/" className="text-primary">Start exploring</Link>.</p>
        </div>
        {isAdmin && (
          <Link to="/admin/seo" className="card-surface p-5 hover:border-primary transition-colors">
            <p className="eyebrow mb-2">Admin</p>
            <p className="text-foreground">Open the SEO dashboard →</p>
          </Link>
        )}
        <button
          onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }}
          className="btn-outline self-start mt-2"
        >Sign out</button>
      </div>
    </div>
  );
}