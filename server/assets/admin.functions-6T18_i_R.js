import { i as createServerFn } from "./esm-Dova13aH.js";
import { t as requireSupabaseAuth } from "./auth-middleware-QP6BYy5L.js";
import { t as createSsrRpc } from "./createSsrRpc-DtK9qkrk.js";
import { z } from "zod";
//#region src/lib/admin.functions.ts
var getAdminStatus = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("77265b60422ccd3fca55e66689775b583f1f9a8f66bbea850c2c67d32fad8080"));
var listAllSeoEntities = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("124dd0e38923b82d9adfac716240fde590e863e892313599faba06a563c7b98f"));
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
}).parse(d)).handler(createSsrRpc("c04f2f6b910211db31d3eb5062ec964556c4e55bd05b7954937ee096878d937a"));
var upsertRedirect = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => z.object({
	from_path: z.string().startsWith("/"),
	to_path: z.string().startsWith("/"),
	status: z.union([z.literal(301), z.literal(302)]).default(301)
}).parse(d)).handler(createSsrRpc("9bc2acd52721ed19090b72769b79a5abd1b36ca0328d6a10719ad989d9df9609"));
var deleteRedirect = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d)).handler(createSsrRpc("b9260ee52f2623e3da168d8d78e13c7c74f838d9d3023ba024b20ed890b65e4b"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => z.object({
	product_id: z.string().uuid(),
	rating: z.number().int().min(1).max(5),
	title: z.string().max(120).optional(),
	body: z.string().max(2e3).optional(),
	author_name: z.string().min(1).max(80)
}).parse(d)).handler(createSsrRpc("aa61e85d805ef5b95ba6198d13725b9b9dd8f512b3f084d0fb518e3ae0a79665"));
//#endregion
export { upsertSeoMeta as a, upsertRedirect as i, getAdminStatus as n, listAllSeoEntities as r, deleteRedirect as t };
