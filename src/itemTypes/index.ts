import { ItemTypeConfigs } from "cms/dist/shared/types/itemTypeConfig";
import { authorItemType } from "./author";
import { postItemType } from "./post";

export const itemTypeConfigs: ItemTypeConfigs = [
    postItemType,
    authorItemType,
];
