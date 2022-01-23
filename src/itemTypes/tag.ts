import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { IItemTypeConfig } from "cms/dist/types/itemTypeConfig";
import { notEmpty } from "cms/dist/validators/stringValidators";
import { getRepos } from "../db";
import { IEditableTag, ITagEntity } from "../types/tag";

export const tagItemType: IItemTypeConfig<ITagEntity, IEditableTag> = {
    name: ["tag", "tags"],

    toString: entity => entity.name,

    backend: {
        api: {
            getEntity: getRepos().tagsRepo.getOne,
            getEntities: getRepos().tagsRepo.getAll,
            getEditableItem: getRepos().tagsRepo.getOne,
            createItem: getRepos().tagsRepo.create,
            updateItem: getRepos().tagsRepo.update,
            deleteItem: getRepos().tagsRepo.delete,
        },
    },

    frontend: {
        listProps: ["name"],

        editor: {
            propConfigs: {
                name: {
                    editor: textEditorFactory(),
                    defaultValue: "",
                    validators: [notEmpty],
                },
            },
        },
    },
};
