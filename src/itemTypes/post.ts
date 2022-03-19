import { itemSelectorFactory } from "cms/dist/editor/editors/itemSelector";
import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { notEmpty } from "cms/dist/validators/stringValidators";
import { itemTypeBuilder } from "..";
import { getRepos } from "../db";
import { person } from "./person";

export const listType = itemTypeBuilder.createListType(["slug", "title"]);

export const editorType = itemTypeBuilder.createEditorType({
    slug: {
        localize: true,
        editor: textEditorFactory(),
        defaultValue: "",
        validators: [notEmpty],
    },
    title: {
        localize: true,
        editor: textEditorFactory(),
        defaultValue: "",
        validators: [notEmpty],
    },
    authorId: {
        localize: false,
        label: "Author",
        editor: itemSelectorFactory({ itemTypeConfig: person }),
        defaultValue: "",
        validators: [],
    },
    // tagIds: {
    //     label: "Tags",
    //     editor: itemsSelectorFactory({ itemTypeConfig: tagItemType }),
    //     defaultValue: [],
    //     validators: [],
    // },
    // content: {
    //     fullscreen: true,
    //     editor: visualBlockEditorFactory({ blockConfigs }),
    //     defaultValue: [],
    //     validators: [],
    // }
});

export const post = itemTypeBuilder.createItemType({
    name: ["post", "posts"],

    toString: item => item.title,

    listType,
    editorType,

    api: {
        getList: () => getRepos().postsRepo.getList(),
        getItem: id => getRepos().postsRepo.getItem(id),

        createItem: values => getRepos().postsRepo.createItem(values),
        updateItem: (id, values) => getRepos().postsRepo.updateItem(id, values),
        deleteItem: id => getRepos().postsRepo.deleteItem(id),
    }
});
