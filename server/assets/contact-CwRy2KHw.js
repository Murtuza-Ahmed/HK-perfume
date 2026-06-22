import { t as getBusinessInfo } from "./storefront.functions-tItMHKrC.js";
import { queryOptions } from "@tanstack/react-query";
//#region src/routes/contact.tsx?tsr-shared=1
var qo = queryOptions({
	queryKey: ["business"],
	queryFn: () => getBusinessInfo()
});
//#endregion
export { qo as t };
