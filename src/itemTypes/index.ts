import { ItemTypeConfigs } from "cms/dist/types/itemTypeConfig";
import { authorItemType } from "./author";
import { postItemType } from "./post";

export const itemTypeConfigs: ItemTypeConfigs = [
    postItemType,
    authorItemType,
];
