import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  getAdminStatus,
  listAllSeoEntities,
  upsertSeoMeta,
  upsertRedirect,
  deleteRedirect,
} from "@/lib/admin.functions";
import { toast } from "@/components/toast";
import { Loader2, Save, Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/seo")({
  head: () => ({
    meta: [
      { title: "SEO Dashboard | Lumen & Oud Admin" },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/admin/seo" },
    ],
    links: [{ rel: "canonical", href: "/admin/seo" }],
  }),
  component: AdminSeo,
});

type Loaded = Awaited<ReturnType<typeof listAllSeoEntities>> | null;

function AdminSeo() {
  const checkAdmin = useServerFn(getAdminStatus);
  const list = useServerFn(listAllSeoEntities);
  const saveMeta = useServerFn(upsertSeoMeta);
  const saveRedirect = useServerFn(upsertRedirect);
  const dropRedirect = useServerFn(deleteRedirect);
  const [state, setState] = useState<{ loading: boolean; admin: boolean | null; data: Loaded }>({
    loading: true,
    admin: null,
    data: null,
  });

  async function refresh() {
    setState((s) => ({ ...s, loading: true }));
    const { isAdmin } = await checkAdmin();
    if (!isAdmin) {
      setState({ loading: false, admin: false, data: null });
      return;
    }
    const data = await list();
    setState({ loading: false, admin: true, data });
  }
  useEffect(() => {
    void refresh();
  }, []);

  if (state.loading)
    return (
      <div className="container-prose py-20 flex justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  if (state.admin === false)
    return (
      <div className="container-prose py-20">
        <h1 className="font-display text-3xl">Admin access only</h1>
        <p className="text-muted-foreground mt-2">
          Your account is signed in but does not have the admin role. Ask a teammate to grant it.
        </p>
      </div>
    );

  const d = state.data!;
  const metaIndex = new Map(d.meta.map((m) => [`${m.entity_type}:${m.entity_key}`, m]));

  return (
    <div className="container-prose py-12">
      <h1 className="font-display text-4xl">SEO dashboard</h1>
      <p className="text-muted-foreground mt-2">
        Override titles, descriptions, and keywords for any product, category, or post. Manage
        redirects. Sitemap and robots are generated automatically.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Stat label="Products" value={d.products.length} />
        <Stat label="Categories" value={d.categories.length} />
        <Stat label="Guides" value={d.posts.length} />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl mb-4">Sitemap & robots</h2>
        <div className="card-surface p-5 text-sm">
          <p>
            Sitemap:{" "}
            <a href="/sitemap.xml" target="_blank" className="text-primary underline">
              /sitemap.xml
            </a>{" "}
            — auto-generated from current products and posts.
          </p>
          <p className="mt-2">
            Robots:{" "}
            <a href="/robots.txt" target="_blank" className="text-primary underline">
              /robots.txt
            </a>
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl mb-4">Meta overrides</h2>
        <div className="space-y-3">
          {[
            ...d.products.map((p) => ({
              type: "product" as const,
              key: p.slug,
              name: p.name,
              defaults: {
                title: p.seo_title,
                description: p.seo_description,
                keywords: p.seo_keywords,
              },
            })),
            ...d.categories.map((c) => ({
              type: "category" as const,
              key: c.slug,
              name: c.name,
              defaults: {
                title: c.seo_title,
                description: c.seo_description,
                keywords: c.seo_keywords,
              },
            })),
            ...d.posts.map((p) => ({
              type: "post" as const,
              key: p.slug,
              name: p.title,
              defaults: {
                title: p.seo_title,
                description: p.seo_description,
                keywords: p.seo_keywords,
              },
            })),
          ].map((row) => {
            const ov = metaIndex.get(`${row.type}:${row.key}`);
            return (
              <MetaRow
                key={`${row.type}:${row.key}`}
                row={row}
                ov={ov}
                onSave={async (patch) => {
                  await saveMeta({
                    data: { entity_type: row.type, entity_key: row.key, ...patch },
                  });
                  toast.success("Saved");
                  void refresh();
                }}
              />
            );
          })}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl mb-4">Redirects</h2>
        <RedirectForm
          onSave={async (data) => {
            await saveRedirect({ data });
            toast.success("Redirect saved");
            void refresh();
          }}
        />
        <div className="mt-4 space-y-2">
          {d.redirects.map((r) => (
            <div key={r.id} className="card-surface p-4 flex items-center justify-between text-sm">
              <div>
                <span className="text-muted-foreground">{r.from_path}</span> →{" "}
                <span className="text-foreground">{r.to_path}</span>{" "}
                <span className="text-xs text-muted-foreground">[{r.status}]</span>
              </div>
              <button
                onClick={async () => {
                  await dropRedirect({ data: { id: r.id } });
                  toast.success("Deleted");
                  void refresh();
                }}
                className="text-destructive p-2"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl mb-4">Analytics</h2>
        <div className="card-surface p-5 text-sm text-muted-foreground">
          Connect Google Analytics or Plausible to populate this panel. Add the tracking script via
          the root route's <code>head().scripts</code>.
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card-surface p-5">
      <p className="eyebrow">{label}</p>
      <p className="font-display text-3xl mt-1">{value}</p>
    </div>
  );
}

function MetaRow({
  row,
  ov,
  onSave,
}: {
  row: {
    type: "product" | "category" | "post";
    key: string;
    name: string;
    defaults: { title: string | null; description: string | null; keywords: string | null };
  };
  ov: { title: string | null; description: string | null; keywords: string | null } | undefined;
  onSave: (patch: {
    title?: string | null;
    description?: string | null;
    keywords?: string | null;
  }) => void | Promise<void>;
}) {
  const [t, setT] = useState(ov?.title ?? row.defaults.title ?? "");
  const [desc, setDesc] = useState(ov?.description ?? row.defaults.description ?? "");
  const [kw, setKw] = useState(ov?.keywords ?? row.defaults.keywords ?? "");
  return (
    <details className="card-surface p-4">
      <summary className="cursor-pointer flex justify-between items-center text-sm">
        <span>
          <span className="eyebrow mr-2">{row.type}</span>
          {row.name}
        </span>
        <span className="text-xs text-muted-foreground">{row.key}</span>
      </summary>
      <div className="mt-3 grid gap-2">
        <input
          value={t}
          onChange={(e) => setT(e.target.value)}
          placeholder="Title"
          className="input-lux"
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          rows={2}
          className="input-lux"
        />
        <input
          value={kw}
          onChange={(e) => setKw(e.target.value)}
          placeholder="Keywords"
          className="input-lux"
        />
        <button
          className="btn-gold self-start gap-2"
          onClick={() =>
            onSave({ title: t || null, description: desc || null, keywords: kw || null })
          }
        >
          <Save size={14} /> Save
        </button>
      </div>
    </details>
  );
}

function RedirectForm({
  onSave,
}: {
  onSave: (d: { from_path: string; to_path: string; status: 301 | 302 }) => void | Promise<void>;
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!from.startsWith("/") || !to.startsWith("/")) return;
        onSave({ from_path: from, to_path: to, status: 301 });
        setFrom("");
        setTo("");
      }}
      className="card-surface p-4 flex flex-wrap gap-2 items-end"
    >
      <div className="flex-1 min-w-[10rem]">
        <label className="block text-xs text-muted-foreground mb-1">From</label>
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="/old-path"
          className="w-full bg-input border border-border rounded px-3 py-2 text-sm"
        />
      </div>
      <div className="flex-1 min-w-[10rem]">
        <label className="block text-xs text-muted-foreground mb-1">To</label>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="/new-path"
          className="w-full bg-input border border-border rounded px-3 py-2 text-sm"
        />
      </div>
      <button className="btn-gold gap-2">
        <Plus size={14} /> Add
      </button>
    </form>
  );
}
