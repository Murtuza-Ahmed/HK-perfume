import { i as createServerFn } from "./esm-Dova13aH.js";
import { t as createServerRpc } from "./createServerRpc-B7lUw9uO.js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
//#region src/lib/storefront.functions.ts?tss-serverfn-split
function publicClient() {
	return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
var getCategories_createServerFn_handler = createServerRpc({
	id: "919384b4a61228e71f82e37d19abd0a4f8ccd1c062ab1ce5c022bf198b66e262",
	name: "getCategories",
	filename: "src/lib/storefront.functions.ts"
}, (opts) => getCategories.__executeServer(opts));
var getCategories = createServerFn({ method: "GET" }).handler(getCategories_createServerFn_handler, async () => {
	const { data, error } = await publicClient().from("categories").select("*").order("sort_order");
	if (error) throw new Error(error.message);
	return data ?? [];
});
var getCategoryBySlug_createServerFn_handler = createServerRpc({
	id: "41783f18564c47a8738dc093387e6fc19ee2926ed1e1e41ee143de37135519fa",
	name: "getCategoryBySlug",
	filename: "src/lib/storefront.functions.ts"
}, (opts) => getCategoryBySlug.__executeServer(opts));
var getCategoryBySlug = createServerFn({ method: "GET" }).inputValidator((d) => z.object({ slug: z.string() }).parse(d)).handler(getCategoryBySlug_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	const { data: cat, error } = await sb.from("categories").select("*").eq("slug", data.slug).maybeSingle();
	if (error) throw new Error(error.message);
	if (!cat) return null;
	const { data: products } = await sb.from("products").select("*").eq("category_id", cat.id).order("created_at", { ascending: false });
	return {
		category: cat,
		products: products ?? []
	};
});
var getProductBySlug_createServerFn_handler = createServerRpc({
	id: "836abc9c6550d49791f0108f60040a4ab9b8829074dd9f2ad0b5397b2ec1e76e",
	name: "getProductBySlug",
	filename: "src/lib/storefront.functions.ts"
}, (opts) => getProductBySlug.__executeServer(opts));
var getProductBySlug = createServerFn({ method: "GET" }).inputValidator((d) => z.object({ slug: z.string() }).parse(d)).handler(getProductBySlug_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	const { data: product, error } = await sb.from("products").select("*").eq("slug", data.slug).maybeSingle();
	if (error) throw new Error(error.message);
	if (!product) return null;
	const { data: category } = await sb.from("categories").select("*").eq("id", product.category_id).maybeSingle();
	const { data: reviews } = await sb.from("reviews").select("*").eq("product_id", product.id).order("created_at", { ascending: false }).limit(8);
	const { data: related } = await sb.from("products").select("*").eq("category_id", product.category_id).neq("id", product.id).limit(4);
	return {
		product,
		category,
		reviews: reviews ?? [],
		related: related ?? []
	};
});
var getHomeData_createServerFn_handler = createServerRpc({
	id: "b8c14563d4097116b30801badb717fbabf2da2017f0afb3a7d8ae7f7343b3890",
	name: "getHomeData",
	filename: "src/lib/storefront.functions.ts"
}, (opts) => getHomeData.__executeServer(opts));
var getHomeData = createServerFn({ method: "GET" }).handler(getHomeData_createServerFn_handler, async () => {
	const sb = publicClient();
	const [{ data: cats }, { data: featured }, { data: posts }] = await Promise.all([
		sb.from("categories").select("*").order("sort_order"),
		sb.from("products").select("*").eq("featured", true).limit(6),
		sb.from("posts").select("*").order("published_at", { ascending: false }).limit(3)
	]);
	return {
		categories: cats ?? [],
		featured: featured ?? [],
		posts: posts ?? []
	};
});
var listPosts_createServerFn_handler = createServerRpc({
	id: "7daa8be455a611307dfc78985a8843859bc3161be7cb93d4e5721f54ba73a749",
	name: "listPosts",
	filename: "src/lib/storefront.functions.ts"
}, (opts) => listPosts.__executeServer(opts));
var listPosts = createServerFn({ method: "GET" }).handler(listPosts_createServerFn_handler, async () => {
	const { data, error } = await publicClient().from("posts").select("*").order("published_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var getPostBySlug_createServerFn_handler = createServerRpc({
	id: "25b094eb87b7eb21759243e1202c5cbfc69a4d0f2b38a0fb3f67fb7732800add",
	name: "getPostBySlug",
	filename: "src/lib/storefront.functions.ts"
}, (opts) => getPostBySlug.__executeServer(opts));
var getPostBySlug = createServerFn({ method: "GET" }).inputValidator((d) => z.object({ slug: z.string() }).parse(d)).handler(getPostBySlug_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	const { data: post, error } = await sb.from("posts").select("*").eq("slug", data.slug).maybeSingle();
	if (error) throw new Error(error.message);
	if (!post) return null;
	const { data: related } = await sb.from("posts").select("id, slug, title, excerpt, cover_image, published_at").neq("id", post.id).order("published_at", { ascending: false }).limit(3);
	return {
		post,
		related: related ?? []
	};
});
var getBusinessInfo_createServerFn_handler = createServerRpc({
	id: "0628e7d14f5f18244331f48b7879e05537adc3f7a179e7bbce67bd68ff6d6d43",
	name: "getBusinessInfo",
	filename: "src/lib/storefront.functions.ts"
}, (opts) => getBusinessInfo.__executeServer(opts));
var getBusinessInfo = createServerFn({ method: "GET" }).handler(getBusinessInfo_createServerFn_handler, async () => {
	const { data } = await publicClient().from("business_info").select("*").eq("id", 1).maybeSingle();
	return data;
});
var search_createServerFn_handler = createServerRpc({
	id: "00181ad71b69e61d8346d629f6437a0242ab8b2f828e27ce8aeb54d5d7b7a1c3",
	name: "search",
	filename: "src/lib/storefront.functions.ts"
}, (opts) => search.__executeServer(opts));
var search = createServerFn({ method: "GET" }).inputValidator((d) => z.object({ q: z.string().max(120) }).parse(d)).handler(search_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	const q = `%${data.q.replace(/[%_]/g, "")}%`;
	const [{ data: products }, { data: posts }] = await Promise.all([sb.from("products").select("slug, name, short_description, images, price, currency").or(`name.ilike.${q},description.ilike.${q}`).limit(12), sb.from("posts").select("slug, title, excerpt").or(`title.ilike.${q},body_md.ilike.${q}`).limit(8)]);
	return {
		products: products ?? [],
		posts: posts ?? []
	};
});
//#endregion
export { getBusinessInfo_createServerFn_handler, getCategories_createServerFn_handler, getCategoryBySlug_createServerFn_handler, getHomeData_createServerFn_handler, getPostBySlug_createServerFn_handler, getProductBySlug_createServerFn_handler, listPosts_createServerFn_handler, search_createServerFn_handler };
