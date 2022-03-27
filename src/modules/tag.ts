import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { notEmpty } from "cms/dist/validators/stringValidators";
import { itemTypeBuilder } from "..";
import { getRepos } from "../db";
import { i18n } from "./i18n";

export namespace Tag {
    export interface IEntity {
        id: string;
        name: i18n.Localized<string>;
    }

    export interface ILocalizedEntity {
        id: string;
        name: string;
    }

    export namespace ItemType {
        const listType = itemTypeBuilder.createListType(["name"]);

        const editorType = itemTypeBuilder.createEditorType({
            name: {
                localize: true,
                editor: textEditorFactory(),
                defaultValue: "",
                validators: [notEmpty],
            },
        });

        export const itemType = itemTypeBuilder.createItemType({
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

        export type ListType = typeof listType.t;
        export type EditorType = typeof editorType.t;
        export type PartialEditorType = typeof editorType.tPartial;
    }

    export const getLocalizedEntity = (entity: IEntity, locale: i18n.Locales): ILocalizedEntity => ({
        id: entity.id,
        name: entity.name[locale],
    });
}
