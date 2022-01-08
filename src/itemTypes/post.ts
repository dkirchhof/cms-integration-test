import { TextEditor } from "cms/dist/editor/editors/textEditor";
import { VisualBlockEditor } from "cms/dist/editor/editors/visualBlockEditor";
import { IItemTypeConfig } from "cms/dist/shared/types/itemTypeConfig";
import { postsRepo } from "../db";
import { IPost, IPostMinimal } from "../types/post";

export const postItemType: IItemTypeConfig<IPostMinimal, IPost> = { 
    name: ["post", "posts"], 

    getItem: postsRepo.getOne,
    getItems: postsRepo.getAll,
    createItem: postsRepo.create,
    updateItem: postsRepo.update, 
    deleteItem: postsRepo.delete,

    listProps: ["id", "slug", "title"],

    getLabel: type => type.title,

    getEditorInputs: () => ({
        id: null,
        slug: TextEditor,
        title: TextEditor,
        authorId: null,
        content: VisualBlockEditor,
    }),
};
