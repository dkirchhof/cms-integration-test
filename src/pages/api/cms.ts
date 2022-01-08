import { requestHandler } from "cms/dist/server/createAPI";
import { itemTypeConfigs } from "../../itemTypes";

export default requestHandler(itemTypeConfigs);
