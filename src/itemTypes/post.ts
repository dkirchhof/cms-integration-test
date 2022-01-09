import { TextEditor } from "cms/dist/editor/editors/textEditor";
import { VisualBlockEditor } from "cms/dist/editor/editors/visualBlockEditor";
import { IItemTypeConfig } from "cms/dist/types/itemTypeConfig";
import { postsRepo } from "../db";
import { ICreateOrUpdatePost, IPost } from "../types/post";

export const postItemType: IItemTypeConfig<IPost, ICreateOrUpdatePost> = { 
    name: ["post", "posts"], 

    getItem: postsRepo.getOne,
    getItemForEditing: postsRepo.getOneForEditing,
    getItems: postsRepo.getAll,
    createItem: postsRepo.create,
    updateItem: postsRepo.update, 
    deleteItem: postsRepo.delete,

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
