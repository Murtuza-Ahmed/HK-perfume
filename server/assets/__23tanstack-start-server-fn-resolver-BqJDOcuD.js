//#region \0%23tanstack-start-server-fn-resolver
var manifest = {
	"00181ad71b69e61d8346d629f6437a0242ab8b2f828e27ce8aeb54d5d7b7a1c3": {
		functionName: "search_createServerFn_handler",
		importer: () => import("./storefront.functions--Ti0B17N.js")
	},
	"0628e7d14f5f18244331f48b7879e05537adc3f7a179e7bbce67bd68ff6d6d43": {
		functionName: "getBusinessInfo_createServerFn_handler",
		importer: () => import("./storefront.functions--Ti0B17N.js")
	},
	"124dd0e38923b82d9adfac716240fde590e863e892313599faba06a563c7b98f": {
		functionName: "listAllSeoEntities_createServerFn_handler",
		importer: () => import("./admin.functions-CksHf_uC.js")
	},
	"25b094eb87b7eb21759243e1202c5cbfc69a4d0f2b38a0fb3f67fb7732800add": {
		functionName: "getPostBySlug_createServerFn_handler",
		importer: () => import("./storefront.functions--Ti0B17N.js")
	},
	"41783f18564c47a8738dc093387e6fc19ee2926ed1e1e41ee143de37135519fa": {
		functionName: "getCategoryBySlug_createServerFn_handler",
		importer: () => import("./storefront.functions--Ti0B17N.js")
	},
	"77265b60422ccd3fca55e66689775b583f1f9a8f66bbea850c2c67d32fad8080": {
		functionName: "getAdminStatus_createServerFn_handler",
		importer: () => import("./admin.functions-CksHf_uC.js")
	},
	"7daa8be455a611307dfc78985a8843859bc3161be7cb93d4e5721f54ba73a749": {
		functionName: "listPosts_createServerFn_handler",
		importer: () => import("./storefront.functions--Ti0B17N.js")
	},
	"836abc9c6550d49791f0108f60040a4ab9b8829074dd9f2ad0b5397b2ec1e76e": {
		functionName: "getProductBySlug_createServerFn_handler",
		importer: () => import("./storefront.functions--Ti0B17N.js")
	},
	"919384b4a61228e71f82e37d19abd0a4f8ccd1c062ab1ce5c022bf198b66e262": {
		functionName: "getCategories_createServerFn_handler",
		importer: () => import("./storefront.functions--Ti0B17N.js")
	},
	"9bc2acd52721ed19090b72769b79a5abd1b36ca0328d6a10719ad989d9df9609": {
		functionName: "upsertRedirect_createServerFn_handler",
		importer: () => import("./admin.functions-CksHf_uC.js")
	},
	"aa61e85d805ef5b95ba6198d13725b9b9dd8f512b3f084d0fb518e3ae0a79665": {
		functionName: "submitReview_createServerFn_handler",
		importer: () => import("./admin.functions-CksHf_uC.js")
	},
	"b8c14563d4097116b30801badb717fbabf2da2017f0afb3a7d8ae7f7343b3890": {
		functionName: "getHomeData_createServerFn_handler",
		importer: () => import("./storefront.functions--Ti0B17N.js")
	},
	"b9260ee52f2623e3da168d8d78e13c7c74f838d9d3023ba024b20ed890b65e4b": {
		functionName: "deleteRedirect_createServerFn_handler",
		importer: () => import("./admin.functions-CksHf_uC.js")
	},
	"c04f2f6b910211db31d3eb5062ec964556c4e55bd05b7954937ee096878d937a": {
		functionName: "upsertSeoMeta_createServerFn_handler",
		importer: () => import("./admin.functions-CksHf_uC.js")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
