//#region \0tanstack-start-manifest:v
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "G:/my project/HK-perfume/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/about",
			"/auth",
			"/blog",
			"/contact",
			"/search",
			"/sitemap.xml",
			"/category/$slug",
			"/product/$slug"
		],
		css: ["/HK-perfume/assets/index-CfjYoYi4.css"],
		preloads: [
			"/HK-perfume/assets/index-D-mvqgvj.js",
			"/HK-perfume/assets/jsx-runtime-bzQ4Vb5N.js",
			"/HK-perfume/assets/useStore-DEJ6VQYh.js",
			"/HK-perfume/assets/link-DsYZLIHZ.js",
			"/HK-perfume/assets/matchContext-CUpLwyUY.js",
			"/HK-perfume/assets/useRouter-Cjk_0i46.js",
			"/HK-perfume/assets/utils-DVIDEbJ1.js",
			"/HK-perfume/assets/invariant-DEEwAagU.js",
			"/HK-perfume/assets/redirect-Coy-z-9D.js",
			"/HK-perfume/assets/createServerFn-Bj2Gjx2W.js",
			"/HK-perfume/assets/react-dom-DUKFG4MT.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/HK-perfume/assets/index-D-mvqgvj.js"
		} }]
	},
	"/": {
		filePath: "G:/my project/HK-perfume/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/HK-perfume/assets/routes-MSjOP9op.js",
			"/HK-perfume/assets/useSuspenseQuery-chYiknRl.js",
			"/HK-perfume/assets/product-card-BGBJXctA.js"
		]
	},
	"/_authenticated": {
		filePath: "G:/my project/HK-perfume/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/account", "/_authenticated/admin/seo"],
		preloads: ["/HK-perfume/assets/route-DWbxy5dJ.js"]
	},
	"/about": {
		filePath: "G:/my project/HK-perfume/src/routes/about.tsx",
		children: void 0,
		preloads: ["/HK-perfume/assets/about-Dfess8GW.js"]
	},
	"/auth": {
		filePath: "G:/my project/HK-perfume/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/HK-perfume/assets/auth-zVii8wPv.js", "/HK-perfume/assets/dist-CYZwm4K0.js"]
	},
	"/blog": {
		filePath: "G:/my project/HK-perfume/src/routes/blog.tsx",
		children: ["/blog/$slug"],
		preloads: [
			"/HK-perfume/assets/blog-BCNVPx3E.js",
			"/HK-perfume/assets/useSuspenseQuery-chYiknRl.js",
			"/HK-perfume/assets/breadcrumbs-jj9z1MmK.js"
		]
	},
	"/contact": {
		filePath: "G:/my project/HK-perfume/src/routes/contact.tsx",
		children: void 0,
		preloads: ["/HK-perfume/assets/contact-Do2TQ7i8.js", "/HK-perfume/assets/useSuspenseQuery-chYiknRl.js"]
	},
	"/search": {
		filePath: "G:/my project/HK-perfume/src/routes/search.tsx",
		children: void 0,
		preloads: ["/HK-perfume/assets/search-jXe4IDLJ.js", "/HK-perfume/assets/useServerFn-DwB5x1LM.js"]
	},
	"/_authenticated/account": {
		filePath: "G:/my project/HK-perfume/src/routes/_authenticated/account.tsx",
		children: void 0,
		preloads: [
			"/HK-perfume/assets/account-Cs9CwnSx.js",
			"/HK-perfume/assets/useServerFn-DwB5x1LM.js",
			"/HK-perfume/assets/admin.functions-CpuuqVzP.js"
		]
	},
	"/blog/$slug": {
		filePath: "G:/my project/HK-perfume/src/routes/blog.$slug.tsx",
		children: void 0,
		preloads: ["/HK-perfume/assets/blog._slug-4uore13M.js"]
	},
	"/category/$slug": {
		filePath: "G:/my project/HK-perfume/src/routes/category.$slug.tsx",
		children: void 0,
		preloads: [
			"/HK-perfume/assets/category._slug-BOJMzP2V.js",
			"/HK-perfume/assets/useSuspenseQuery-chYiknRl.js",
			"/HK-perfume/assets/breadcrumbs-jj9z1MmK.js",
			"/HK-perfume/assets/product-card-BGBJXctA.js"
		]
	},
	"/product/$slug": {
		filePath: "G:/my project/HK-perfume/src/routes/product.$slug.tsx",
		children: void 0,
		preloads: [
			"/HK-perfume/assets/product._slug-BTLrowYE.js",
			"/HK-perfume/assets/useSuspenseQuery-chYiknRl.js",
			"/HK-perfume/assets/breadcrumbs-jj9z1MmK.js",
			"/HK-perfume/assets/product-card-BGBJXctA.js"
		]
	},
	"/_authenticated/admin/seo": {
		filePath: "G:/my project/HK-perfume/src/routes/_authenticated/admin.seo.tsx",
		children: void 0,
		preloads: [
			"/HK-perfume/assets/admin.seo-DZJu7A46.js",
			"/HK-perfume/assets/useServerFn-DwB5x1LM.js",
			"/HK-perfume/assets/dist-CYZwm4K0.js",
			"/HK-perfume/assets/admin.functions-CpuuqVzP.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
