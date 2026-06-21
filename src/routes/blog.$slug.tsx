import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getPostBySlug } from "@/lib/storefront.functions";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ld, breadcrumbLd, articleLd } from "@/lib/seo/jsonld";

const qo = (slug: string) => queryOptions({ queryKey: ["post", slug], queryFn: () => getPostBySlug({ data: { slug } }) });

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(qo(params.slug));
    if (!data) throw notFound();
    return data;
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }] };
    const { post } = loaderData;
    const url = `/blog/${params.slug}`;
    const title = post.seo_title ?? `${post.title} | Lumen & Oud`;
    const desc = post.seo_description ?? post.excerpt;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: post.seo_keywords ?? "" },
        { name: "author", content: post.author },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(post.cover_image ? [{ property: "og:image" as const, content: post.cover_image }, { name: "twitter:image", content: post.cover_image }] : []),
        { property: "article:published_time", content: post.published_at },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        ld(breadcrumbLd([{ name: "Home", path: "/" }, { name: "Guides", path: "/blog" }, { name: post.title, path: url }])),
        ld(articleLd({ headline: post.title, description: post.excerpt, image: post.cover_image ?? undefined, author: post.author, datePublished: post.published_at, url })),
      ],
    };
  },
  component: PostPage,
});

function renderMd(md: string) {
  // Lightweight server-safe markdown — headings, bold, bullets, paragraphs.
  return md.split(/\n\n+/).map((block, i) => {
    if (block.startsWith("## ")) return <h2 key={i}>{block.slice(3)}</h2>;
    if (block.startsWith("- ")) {
      const items = block.split(/\n/).map((l) => l.replace(/^- /, ""));
      return <ul key={i}>{items.map((t, j) => <li key={j} dangerouslySetInnerHTML={{ __html: t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />)}</ul>;
    }
    return <p key={i} dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />;
  });
}

function PostPage() {
  const { post, related } = useSuspenseQuery(qo(Route.useParams().slug)).data!;
  return (
    <article className="fade-in">
      <div className="container-prose pt-8">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Guides", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />
      </div>
      <header className="container-prose max-w-3xl pt-8 pb-6">
        <p className="eyebrow">{new Date(post.published_at).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})} · {post.read_minutes} min read</p>
        <h1 className="font-display text-5xl mt-3 leading-tight">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
      </header>
      {post.cover_image && (
        <div className="container-prose max-w-4xl">
          <div className="card-surface overflow-hidden aspect-[16/9]">
            <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover" width={1600} height={900} />
          </div>
        </div>
      )}
      <div className="container-prose max-w-3xl py-12 prose-editorial">
        {renderMd(post.body_md)}
      </div>
      {related.length > 0 && (
        <section className="container-prose py-16">
          <h2 className="font-display text-3xl mb-6">Related guides</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} to="/blog/$slug" params={{ slug: r.slug }} className="group block">
                <div className="aspect-[4/3] overflow-hidden card-surface">
                  <img src={r.cover_image ?? ""} alt={r.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" width={800} height={600} loading="lazy" />
                </div>
                <h3 className="font-display text-lg mt-3 group-hover:text-primary">{r.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}