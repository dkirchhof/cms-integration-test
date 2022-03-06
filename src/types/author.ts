import { IItem } from "cms/dist/types/itemTypeConfig";

export interface IAuthorEntity extends IItem {
    firstname: string;
    lastname: string;
    email: string;
}
