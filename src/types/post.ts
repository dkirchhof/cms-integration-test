import { IItem } from "cms/dist/shared/types/itemTypeConfig";

export interface IPostMinimal extends IItem {
    slug: string;
    title: string;
}

export interface IPost extends IPostMinimal {
    content: any;
    authorId: string;
}

export interface ICreateOrUpdatePost extends IPost {
    tagIds: string[];
}
