import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variable(s): " +
        [!url && "SUPABASE_URL", !key && "SUPABASE_PUBLISHABLE_KEY"].filter(Boolean).join(", ") +
        ". Set them in the Vercel dashboard (Project Settings → Environment Variables) and redeploy. " +
        "Note: .env must NOT be listed in .vercelignore.",
    );
  }
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export const getCategories = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data, error } = await sb.from("categories").select("*").order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getCategoryBySlug = createServerFn({ method: "GET" })
  .validator((d) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: cat, error } = await sb
      .from("categories")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!cat) return null;
    const { data: products } = await sb
      .from("products")
      .select("*")
      .eq("category_id", cat.id)
      .order("created_at", { ascending: false });
    return { category: cat, products: products ?? [] };
  });

export const getProductBySlug = createServerFn({ method: "GET" })
  .validator((d) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: product, error } = await sb
      .from("products")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!product) return null;
    const { data: category } = await sb
      .from("categories")
      .select("*")
      .eq("id", product.category_id)
      .maybeSingle();
    const { data: reviews } = await sb
      .from("reviews")
      .select("*")
      .eq("product_id", product.id)
      .order("created_at", { ascending: false })
      .limit(8);
    const { data: related } = await sb
      .from("products")
      .select("*")
      .eq("category_id", product.category_id)
      .neq("id", product.id)
      .limit(4);
    return { product, category, reviews: reviews ?? [], related: related ?? [] };
  });

export const getHomeData = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const [{ data: cats }, { data: featured }, { data: posts }] = await Promise.all([
    sb.from("categories").select("*").order("sort_order"),
    sb.from("products").select("*").eq("featured", true).limit(6),
    sb.from("posts").select("*").order("published_at", { ascending: false }).limit(3),
  ]);
  return { categories: cats ?? [], featured: featured ?? [], posts: posts ?? [] };
});

export const listPosts = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data, error } = await sb
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .validator((d) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: post, error } = await sb
      .from("posts")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!post) return null;
    const { data: related } = await sb
      .from("posts")
      .select("id, slug, title, excerpt, cover_image, published_at")
      .neq("id", post.id)
      .order("published_at", { ascending: false })
      .limit(3);
    return { post, related: related ?? [] };
  });

// export const getBusinessInfo = createServerFn({ method: "GET" }).handler(async () => {
//   const sb = publicClient();
//   const { data } = await sb.from("business_info").select("*").eq("id", 1).maybeSingle();
//   return data;
// });

export const getBusinessInfo = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();

  const { data, error } = await sb.from("business_info").select("*").eq("id", 1).maybeSingle();

  if (error) {
    console.error("Business info error:", error);
    throw new Error(error.message);
  }

  return data;
});

export const search = createServerFn({ method: "GET" })
  .validator((d) => z.object({ q: z.string().max(120) }).parse(d))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const q = `%${data.q.replace(/[%_]/g, "")}%`;
    const [{ data: products }, { data: posts }] = await Promise.all([
      sb
        .from("products")
        .select("slug, name, short_description, images, price, currency")
        .or(`name.ilike.${q},description.ilike.${q}`)
        .limit(12),
      sb
        .from("posts")
        .select("slug, title, excerpt")
        .or(`title.ilike.${q},body_md.ilike.${q}`)
        .limit(8),
    ]);
    return { products: products ?? [], posts: posts ?? [] };
  });
