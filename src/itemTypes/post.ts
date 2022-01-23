import { itemSelectorFactory, itemsSelectorFactory } from "cms/dist/editor/editors/itemSelector";
import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { visualBlockEditorFactory } from "cms/dist/editor/editors/visualBlockEditor";
import { IItemTypeConfig } from "cms/dist/types/itemTypeConfig";
import { notEmpty } from "cms/dist/validators/stringValidators";
import { blockConfigs } from "../blocks";
import { getRepos, getTagsOfPost, setTagsForPost } from "../db";
import { IEditablePost, IPostEntity } from "../types/post";
import { authorItemType } from "./author";
import { tagItemType } from "./tag";

export const postItemType: IItemTypeConfig<IPostEntity, IEditablePost> = {
    name: ["post", "posts"],

    toString: entity => entity.title,

    backend: {
        api: {
            getEntity: getRepos().postsRepo.getOne,
            getEntities: getRepos().postsRepo.getAll,
            getEditableItem: async id => {
                const post = await getRepos().postsRepo.getOne(id);

                const tagIds = await getTagsOfPost(id);

                return {
                    ...post,
                    tagIds,
                };
            },
            createItem: async values => {
                const postEntity: IPostEntity = {
                    authorId: values.authorId,
                    content: values.content,
                    id: values.id,
                    slug: values.slug,
                    title: values.title,
                    createdAt: new Date().toUTCString(),
                    updatedAt: new Date().toUTCString(),
                };

                const id = await getRepos().postsRepo.create(postEntity);

                await setTagsForPost(id, values.tagIds);

                return id;
            },
            updateItem: async (id, values) => {
                const postEntity: Partial<IPostEntity> = {
                    ...values,
                    updatedAt: new Date().toUTCString(),
                }; 

                await getRepos().postsRepo.update(id, postEntity);

                if (values.tagIds) {
                    await setTagsForPost(id, values.tagIds);
                }
            },
            deleteItem: getRepos().postsRepo.delete,
        },
    },

    frontend: {
        listProps: ["id", "slug", "title"],

        editor: {
            propConfigs: {
                slug: {
                    editor: textEditorFactory(),
                    defaultValue: "",
                    validators: [notEmpty],
                },
                title: {
                    editor: textEditorFactory(),
                    defaultValue: "",
                    validators: [notEmpty],
                },
                authorId: {
                    label: "Author",
                    editor: itemSelectorFactory({ itemTypeConfig: authorItemType }),
                    defaultValue: "",
                    validators: [],
                },
                tagIds: {
                    label: "Tags",
                    editor: itemsSelectorFactory({ itemTypeConfig: tagItemType }),
                    defaultValue: [],
                    validators: [],
                },
                content: {
                    fullscreen: true,
                    editor: visualBlockEditorFactory({ blockConfigs }),
                    defaultValue: { blockName: "root", data: { children:[] }},
                    validators: [],
                }
            },
        },

    },

    // getInitialData: () => ({
    //     id: "",
    //     slug: "",
    //     title: "",
    //     content: {
    //         blockName: "Root",
    //         data: {
    //             children: []
    //         },
    //     },
    //     tagIds: [],
    //     authorId: "",
    // }),

    // getEditorInputs: () => ({
    //     slug: TextEditor,
    //     title: TextEditor,
    //     content: VisualBlockEditor,

    //     authorId: null,
    //     tagIds: null,
    // }),
};
