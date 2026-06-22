import { i as createServerFn } from "./esm-Dova13aH.js";
import { t as createSsrRpc } from "./createSsrRpc-DtK9qkrk.js";
import { z } from "zod";
createServerFn({ method: "GET" }).handler(createSsrRpc("919384b4a61228e71f82e37d19abd0a4f8ccd1c062ab1ce5c022bf198b66e262"));
var getCategoryBySlug = createServerFn({ method: "GET" }).inputValidator((d) => z.object({ slug: z.string() }).parse(d)).handler(createSsrRpc("41783f18564c47a8738dc093387e6fc19ee2926ed1e1e41ee143de37135519fa"));
var getProductBySlug = createServerFn({ method: "GET" }).inputValidator((d) => z.object({ slug: z.string() }).parse(d)).handler(createSsrRpc("836abc9c6550d49791f0108f60040a4ab9b8829074dd9f2ad0b5397b2ec1e76e"));
var getHomeData = createServerFn({ method: "GET" }).handler(createSsrRpc("b8c14563d4097116b30801badb717fbabf2da2017f0afb3a7d8ae7f7343b3890"));
var listPosts = createServerFn({ method: "GET" }).handler(createSsrRpc("7daa8be455a611307dfc78985a8843859bc3161be7cb93d4e5721f54ba73a749"));
var getPostBySlug = createServerFn({ method: "GET" }).inputValidator((d) => z.object({ slug: z.string() }).parse(d)).handler(createSsrRpc("25b094eb87b7eb21759243e1202c5cbfc69a4d0f2b38a0fb3f67fb7732800add"));
var getBusinessInfo = createServerFn({ method: "GET" }).handler(createSsrRpc("0628e7d14f5f18244331f48b7879e05537adc3f7a179e7bbce67bd68ff6d6d43"));
var search = createServerFn({ method: "GET" }).inputValidator((d) => z.object({ q: z.string().max(120) }).parse(d)).handler(createSsrRpc("00181ad71b69e61d8346d629f6437a0242ab8b2f828e27ce8aeb54d5d7b7a1c3"));
//#endregion
export { getProductBySlug as a, getPostBySlug as i, getCategoryBySlug as n, listPosts as o, getHomeData as r, search as s, getBusinessInfo as t };
