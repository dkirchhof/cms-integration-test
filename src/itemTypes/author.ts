import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { IItemTypeConfig } from "cms/dist/types/itemTypeConfig";
import { isEmail, notEmpty } from "cms/dist/validators/stringValidators";
import { getRepos } from "../db";
import { IAuthorEntity, IEditableAuthor } from "../types/author";

export const authorItemType: IItemTypeConfig<IAuthorEntity, IEditableAuthor> = {
    name: ["author", "authors"],

    toString: entity => `${entity.firstname} ${entity.lastname}`,

    backend: {
        api: {
            getEntity: getRepos().authorsRepo.getOne,
            getEntities: getRepos().authorsRepo.getAll,
            getEditableItem: getRepos().authorsRepo.getOne,
            createItem: getRepos().authorsRepo.create,
            updateItem: getRepos().authorsRepo.update,
            deleteItem: getRepos().authorsRepo.delete,
        },
    },

    frontend: {
        listProps: ["id", "firstname", "lastname", "email"],

        editor: {
            propConfigs: {
                firstname: {
                    editor: textEditorFactory(),
                    defaultValue: "",
                    validators: [notEmpty],
                },
                lastname: {
                    editor: textEditorFactory(),
                    defaultValue: "",
                    validators: [notEmpty],
                },
                email: {
                    editor: textEditorFactory(),
                    defaultValue: "",
                    validators: [notEmpty, isEmail],
                },
            },
        },
    },
};
