import { IBlock } from "cms/dist/types/block";
import { IItem } from "cms/dist/types/itemTypeConfig";

export interface IPost extends IItem {
    slug: string;
    title: string;
    content: IBlock;
    createdAt: string;
    updatedAt: string;

    authorId: string;
}

export interface ICreateOrUpdatePost extends IItem {
    slug: string;
    title: string;
    content: IBlock;

    tagIds: string[];
    authorId: string;
}
