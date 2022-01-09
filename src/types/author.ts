import { IItem } from "cms/dist/types/itemTypeConfig";

export interface IAuthor extends IItem {
    firstname: string;
    lastname: string;
    email: string;
}
