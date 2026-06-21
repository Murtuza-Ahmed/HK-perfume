import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    return { isAdmin: !!data, userId: context.userId };
  });

export const listAllSeoEntities = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) throw new Error("Forbidden");
    const [{ data: products }, { data: categories }, { data: posts }, { data: meta }, { data: redirects }] = await Promise.all([
      context.supabase.from("products").select("id, slug, name, seo_title, seo_description, seo_keywords"),
      context.supabase.from("categories").select("id, slug, name, seo_title, seo_description, seo_keywords"),
      context.supabase.from("posts").select("id, slug, title, seo_title, seo_description, seo_keywords"),
      context.supabase.from("seo_meta").select("*"),
      context.supabase.from("seo_redirects").select("*"),
    ]);
    return {
      products: products ?? [], categories: categories ?? [],
      posts: posts ?? [], meta: meta ?? [], redirects: redirects ?? [],
    };
  });

export const upsertSeoMeta = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({
    entity_type: z.enum(["product", "category", "post", "page"]),
    entity_key: z.string().min(1),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    keywords: z.string().nullable().optional(),
  }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) throw new Error("Forbidden");
    const { error } = await context.supabase.from("seo_meta").upsert({
      entity_type: data.entity_type, entity_key: data.entity_key,
      title: data.title ?? null, description: data.description ?? null, keywords: data.keywords ?? null,
    }, { onConflict: "entity_type,entity_key" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const upsertRedirect = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({
    from_path: z.string().startsWith("/"),
    to_path: z.string().startsWith("/"),
    status: z.union([z.literal(301), z.literal(302)]).default(301),
  }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) throw new Error("Forbidden");
    const { error } = await context.supabase.from("seo_redirects").upsert({
      from_path: data.from_path, to_path: data.to_path, status: data.status,
    }, { onConflict: "from_path" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteRedirect = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) throw new Error("Forbidden");
    const { error } = await context.supabase.from("seo_redirects").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const submitReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({
    product_id: z.string().uuid(),
    rating: z.number().int().min(1).max(5),
    title: z.string().max(120).optional(),
    body: z.string().max(2000).optional(),
    author_name: z.string().min(1).max(80),
  }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("reviews").insert({
      product_id: data.product_id,
      user_id: context.userId,
      author_name: data.author_name,
      rating: data.rating,
      title: data.title ?? null,
      body: data.body ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });