import { IItem } from "cms/dist/types/itemTypeConfig";

export interface IPostTagEntity extends IItem {
    postId: string;
    tagId: string;
}
