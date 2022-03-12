import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { notEmpty } from "cms/dist/validators/stringValidators";
import { itemTypeBuilder } from "..";
import { getRepos } from "../db";

export const listType = itemTypeBuilder.createListType(["name"]);

export const editorType = itemTypeBuilder.createEditorType({
    name: {
        localize: true,
        editor: textEditorFactory(),
        defaultValue: "",
        validators: [notEmpty],
    },
});

export const tag = itemTypeBuilder.createItemType({
    name: ["tag", "tags"],

    toString: item => item.name,

    listType,
    editorType,

    api: {
        getList: () => getRepos().tagsRepo.getList(),
        getItem: id => getRepos().tagsRepo.getItem(id),

        createItem: values => getRepos().tagsRepo.createItem(values),
        updateItem: (id, values) => getRepos().tagsRepo.updateItem(id, values),
        deleteItem: id => getRepos().tagsRepo.deleteItem(id),
    },
});
