import { o as listPosts } from "./storefront.functions-tItMHKrC.js";
import { queryOptions } from "@tanstack/react-query";
//#region src/routes/blog.tsx?tsr-shared=1
var qo = queryOptions({
	queryKey: ["posts"],
	queryFn: () => listPosts()
});
//#endregion
export { qo as t };
