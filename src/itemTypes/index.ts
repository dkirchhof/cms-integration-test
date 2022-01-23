import { ItemTypeConfigs } from "cms/dist/types/itemTypeConfig";
import { authorItemType } from "./author";
import { postItemType } from "./post";
import { tagItemType } from "./tag";

export const itemTypeConfigs: ItemTypeConfigs = [
    postItemType,
    authorItemType,
    tagItemType,
];
