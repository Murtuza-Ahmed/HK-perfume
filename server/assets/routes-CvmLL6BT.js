import { r as getHomeData } from "./storefront.functions-tItMHKrC.js";
import { queryOptions } from "@tanstack/react-query";
//#region src/routes/index.tsx?tsr-shared=1
var homeQO = queryOptions({
	queryKey: ["home"],
	queryFn: () => getHomeData()
});
//#endregion
export { homeQO as t };
