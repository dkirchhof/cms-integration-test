import { TextEditor } from "cms/dist/editor/editors/textEditor";
import { IItemTypeConfig } from "cms/dist/types/itemTypeConfig";
import { getRepos } from "../db";
import { IAuthor } from "../types/author";

export const authorItemType: IItemTypeConfig<IAuthor> = { 
    name: ["author", "authors"], 

    getItem: getRepos().authorsRepo.getOne,
    getItemForEditing: getRepos().authorsRepo.getOne,
    getItems: getRepos().authorsRepo.getAll,
    createItem: getRepos().authorsRepo.create,
    updateItem: getRepos().authorsRepo.update, 
    deleteItem: getRepos().authorsRepo.delete,

    listProps: ["id", "firstname", "lastname", "email"],

    getLabel: type => `${type.firstname} ${type.lastname}`,

    getEditorInputs: () => ({
        firstname: TextEditor,
        lastname: TextEditor,
        email: TextEditor,
    }),
};
