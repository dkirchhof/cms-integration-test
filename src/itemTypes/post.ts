import { TextEditor } from "cms/dist/editor/editors/textEditor";
import { VisualBlockEditor } from "cms/dist/editor/editors/visualBlockEditor";
import { IItemTypeConfig } from "cms/dist/types/itemTypeConfig";
import { getRepos } from "../db";
import { ICreateOrUpdatePost, IPost } from "../types/post";

export const postItemType: IItemTypeConfig<IPost, ICreateOrUpdatePost> = { 
    name: ["post", "posts"], 

    getItem: getRepos().postsRepo.getOne,
    getItemForEditing: getRepos().postsRepo.getOneForEditing,
    getItems: getRepos().postsRepo.getAll,
    createItem: getRepos().postsRepo.create,
    updateItem: getRepos().postsRepo.update, 
    deleteItem: getRepos().postsRepo.delete,

    listProps: ["id", "slug", "title"],

    getLabel: type => type.title,

    getEditorInputs: () => ({
        slug: TextEditor,
        title: TextEditor,
        createdAt: null,
        updatedAt: null,
        content: VisualBlockEditor,

        authorId: null,
        tagIds: null,
    }),
};
