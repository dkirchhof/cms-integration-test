import { itemSelectorFactory, itemsSelectorFactory } from "cms/dist/editor/editors/itemSelector";
import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { visualBlockEditorFactory } from "cms/dist/editor/editors/visualBlockEditor";
import { IBlock } from "cms/dist/types/block";
import { notEmpty } from "cms/dist/validators/stringValidators";
import { itemTypeBuilder } from "..";
import { blockConfigs } from "../blocks";
import { getRepos } from "../db";
import { i18n } from "./i18n";
import { Person } from "./person";
import { Tag } from "./tag";

export namespace Post {
    export interface IEntity {
        id: string;
        slug: i18n.Localized<string>;
        title: i18n.Localized<string>;
        image: string;
        // createdAt: new Date().toUTCString(),
        // updatedAt: new Date().toUTCString(),
        authorId: string;
        tagIds: string[];
        content: IBlock[];
    }

    export namespace ItemType {
        const listType = itemTypeBuilder.createListType(["slug", "title"]);

        const editorType = itemTypeBuilder.createEditorType({
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
            image: {
                localize: false,
                editor: textEditorFactory(),
                defaultValue: "",
                validators: [notEmpty],
            },
            authorId: {
                localize: false,
                editor: itemSelectorFactory({ itemType: Person.ItemType.itemType }),
                defaultValue: "",
                validators: [],
            },
            tagIds: {
                localize: false,
                editor: itemsSelectorFactory({ itemType: Tag.ItemType.itemType }),
                defaultValue: [] as string[],
                validators: [],
            },
            content: {
                localize: false,
                editor: visualBlockEditorFactory({ blockConfigs }),
                defaultValue: [] as IBlock[],
                validators: [],
            }
        });

        export const itemType = itemTypeBuilder.createItemType({
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

        export type ListType = typeof listType.t;
        export type EditorType = typeof editorType.t;
        export type PartialEditorType = typeof editorType.tPartial;
    }

    export const entityToListItem = (locale: i18n.Locales) => (entity: IEntity): ItemType.ListType => ({
        id: entity.id,
        slug: entity.slug[locale],
        title: entity.title[locale],
    });
}
