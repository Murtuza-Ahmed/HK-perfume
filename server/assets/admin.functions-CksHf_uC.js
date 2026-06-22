import { i as createServerFn } from "./esm-Dova13aH.js";
import { t as createServerRpc } from "./createServerRpc-B7lUw9uO.js";
import { t as requireSupabaseAuth } from "./auth-middleware-QP6BYy5L.js";
import { z } from "zod";
//#region src/lib/admin.functions.ts?tss-serverfn-split
var getAdminStatus_createServerFn_handler = createServerRpc({
	id: "77265b60422ccd3fca55e66689775b583f1f9a8f66bbea850c2c67d32fad8080",
	name: "getAdminStatus",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminStatus.__executeServer(opts));
var getAdminStatus = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAdminStatus_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	return {
		isAdmin: !!data,
		userId: context.userId
	};
});
var listAllSeoEntities_createServerFn_handler = createServerRpc({
	id: "124dd0e38923b82d9adfac716240fde590e863e892313599faba06a563c7b98f",
	name: "listAllSeoEntities",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listAllSeoEntities.__executeServer(opts));
var listAllSeoEntities = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listAllSeoEntities_createServerFn_handler, async ({ context }) => {
	const { data: isAdmin } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (!isAdmin) throw new Error("Forbidden");
	const [{ data: products }, { data: categories }, { data: posts }, { data: meta }, { data: redirects }] = await Promise.all([
		context.supabase.from("products").select("id, slug, name, seo_title, seo_description, seo_keywords"),
		context.supabase.from("categories").select("id, slug, name, seo_title, seo_description, seo_keywords"),
		context.supabase.from("posts").select("id, slug, title, seo_title, seo_description, seo_keywords"),
		context.supabase.from("seo_meta").select("*"),
		context.supabase.from("seo_redirects").select("*")
	]);
	return {
		products: products ?? [],
		categories: categories ?? [],
		posts: posts ?? [],
		meta: meta ?? [],
		redirects: redirects ?? []
	};
});
var upsertSeoMeta_createServerFn_handler = createServerRpc({
	id: "c04f2f6b910211db31d3eb5062ec964556c4e55bd05b7954937ee096878d937a",
	name: "upsertSeoMeta",
	filename: "src/lib/admin.functions.ts"
}, (opts) => upsertSeoMeta.__executeServer(opts));
var upsertSeoMeta = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => z.object({
	entity_type: z.enum([
		"product",
		"category",
		"post",
		"page"
	]),
	entity_key: z.string().min(1),
	title: z.string().nullable().optional(),
	description: z.string().nullable().optional(),
	keywords: z.string().nullable().optional()
}).parse(d)).handler(upsertSeoMeta_createServerFn_handler, async ({ data, context }) => {
	const { data: isAdmin } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (!isAdmin) throw new Error("Forbidden");
	const { error } = await context.supabase.from("seo_meta").upsert({
		entity_type: data.entity_type,
		entity_key: data.entity_key,
		title: data.title ?? null,
		description: data.description ?? null,
		keywords: data.keywords ?? null
	}, { onConflict: "entity_type,entity_key" });
	if (error) throw new Error(error.message);
	return { ok: true };
});
var upsertRedirect_createServerFn_handler = createServerRpc({
	id: "9bc2acd52721ed19090b72769b79a5abd1b36ca0328d6a10719ad989d9df9609",
	name: "upsertRedirect",
	filename: "src/lib/admin.functions.ts"
}, (opts) => upsertRedirect.__executeServer(opts));
var upsertRedirect = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => z.object({
	from_path: z.string().startsWith("/"),
	to_path: z.string().startsWith("/"),
	status: z.union([z.literal(301), z.literal(302)]).default(301)
}).parse(d)).handler(upsertRedirect_createServerFn_handler, async ({ data, context }) => {
	const { data: isAdmin } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (!isAdmin) throw new Error("Forbidden");
	const { error } = await context.supabase.from("seo_redirects").upsert({
		from_path: data.from_path,
		to_path: data.to_path,
		status: data.status
	}, { onConflict: "from_path" });
	if (error) throw new Error(error.message);
	return { ok: true };
});
var deleteRedirect_createServerFn_handler = createServerRpc({
	id: "b9260ee52f2623e3da168d8d78e13c7c74f838d9d3023ba024b20ed890b65e4b",
	name: "deleteRedirect",
	filename: "src/lib/admin.functions.ts"
}, (opts) => deleteRedirect.__executeServer(opts));
var deleteRedirect = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d)).handler(deleteRedirect_createServerFn_handler, async ({ data, context }) => {
	const { data: isAdmin } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (!isAdmin) throw new Error("Forbidden");
	const { error } = await context.supabase.from("seo_redirects").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var submitReview_createServerFn_handler = createServerRpc({
	id: "aa61e85d805ef5b95ba6198d13725b9b9dd8f512b3f084d0fb518e3ae0a79665",
	name: "submitReview",
	filename: "src/lib/admin.functions.ts"
}, (opts) => submitReview.__executeServer(opts));
var submitReview = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => z.object({
	product_id: z.string().uuid(),
	rating: z.number().int().min(1).max(5),
	title: z.string().max(120).optional(),
	body: z.string().max(2e3).optional(),
	author_name: z.string().min(1).max(80)
}).parse(d)).handler(submitReview_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("reviews").insert({
		product_id: data.product_id,
		user_id: context.userId,
		author_name: data.author_name,
		rating: data.rating,
		title: data.title ?? null,
		body: data.body ?? null
	});
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { deleteRedirect_createServerFn_handler, getAdminStatus_createServerFn_handler, listAllSeoEntities_createServerFn_handler, submitReview_createServerFn_handler, upsertRedirect_createServerFn_handler, upsertSeoMeta_createServerFn_handler };
