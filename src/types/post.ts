import { IBlock } from "cms/dist/types/block";
import { IItem } from "cms/dist/types/itemTypeConfig";

export interface IPostEntity extends IItem {
    slug: string;
    title: string;
    content: IBlock;
    createdAt: string;
    updatedAt: string;

    authorId: string;
}

export interface IEditablePost extends IItem {
    slug: string;
    title: string;
    content: IBlock;
    authorId: string;
    tagIds: string[];
}
