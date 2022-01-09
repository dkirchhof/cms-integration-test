import { TextEditor } from "cms/dist/editor/editors/textEditor";
import { IItemTypeConfig } from "cms/dist/types/itemTypeConfig";
import { authorsRepo } from "../db";
import { IAuthor } from "../types/author";

export const authorItemType: IItemTypeConfig<IAuthor> = { 
    name: ["author", "authors"], 

    getItem: authorsRepo.getOne,
    getItemForEditing: authorsRepo.getOne,
    getItems: authorsRepo.getAll,
    createItem: authorsRepo.create,
    updateItem: authorsRepo.update, 
    deleteItem: authorsRepo.delete,

    listProps: ["id", "firstname", "lastname", "email"],

    getLabel: type => `${type.firstname} ${type.lastname}`,

    getEditorInputs: () => ({
        firstname: TextEditor,
        lastname: TextEditor,
        email: TextEditor,
    }),
};
