import { itemSelectorFactory, itemsSelectorFactory } from "cms/dist/editor/editors/itemSelector";
import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { notEmpty } from "cms/dist/validators/stringValidators";
import { itemTypeBuilder } from "..";
import { getRepos } from "../db";
import { person } from "./person";
import { tag } from "./tag";

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
        editor: itemSelectorFactory({ itemType: person }),
        defaultValue: "",
        validators: [],
    },
    tagIds: {
        localize: false,
        editor: itemsSelectorFactory({ itemType: tag }),
        defaultValue: [] as string[],
        validators: [],
    },
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
