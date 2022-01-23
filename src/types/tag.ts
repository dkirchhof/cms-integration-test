import { IItem } from "cms/dist/types/itemTypeConfig";

export interface ITagEntity extends IItem {
    name: string;
}

export type IEditableTag = ITagEntity;
