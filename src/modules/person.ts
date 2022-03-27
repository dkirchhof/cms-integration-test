import { numberEditorFactory } from "cms/dist/editor/editors/numberEditor";
import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { isEmail, notEmpty } from "cms/dist/validators/stringValidators";
import { itemTypeBuilder } from "..";
import { getRepos } from "../db";
import { i18n } from "./i18n";

export namespace Person {
    export interface IEntity {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        age: number;
        job: i18n.Localized<string>;
    }

    export namespace ItemType {
        const listType = itemTypeBuilder.createListType(["firstname", "lastname", "email"]);

        const editorType = itemTypeBuilder.createEditorType({
            firstname: {
                localize: false,
                editor: textEditorFactory(),
                defaultValue: "",
                validators: [notEmpty],
            },

            lastname: {
                localize: false,
                editor: textEditorFactory(),
                defaultValue: "",
                validators: [notEmpty],
            },

            email: {
                localize: false,
                editor: textEditorFactory(),
                defaultValue: "",
                validators: [isEmail],
            },

            age: {
                localize: false,
                editor: numberEditorFactory({ min: 16 }),
                defaultValue: 0,
                validators: [],
            },

            job: {
                localize: true,
                editor: textEditorFactory(),
                defaultValue: "",
                validators: [notEmpty],
            },
        });

        export const itemType = itemTypeBuilder.createItemType({
            name: ["person", "persons"],

            toString: item => `${item.firstname} ${item.lastname}`,

            listType,
            editorType,

            api: {
                getList: (page, pageSize) => getRepos().personsRepo.getList(page, pageSize),
                getItem: id => getRepos().personsRepo.getItem(id),

                createItem: values => getRepos().personsRepo.createItem(values),
                updateItem: (id, values) => getRepos().personsRepo.updateItem(id, values),
                deleteItem: id => getRepos().personsRepo.deleteItem(id),
            },
        });

        export type ListType = typeof listType.t;
        export type EditorType = typeof editorType.t;
        export type PartialEditorType = typeof editorType.tPartial;
    }

    export const entityToListItem = (entity: IEntity): ItemType.ListType => ({
        id: entity.id,
        firstname: entity.firstname,
        lastname: entity.lastname,
        email: entity.email,
    });
}
