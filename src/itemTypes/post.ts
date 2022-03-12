import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { notEmpty } from "cms/dist/validators/stringValidators";
import { itemTypeBuilder } from "..";
import { getRepos } from "../db";

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
    // authorId: {
    //     label: "Author",
    //     editor: itemSelectorFactory({ itemTypeConfig: authorItemType }),
    //     defaultValue: "",
    //     validators: [],
    // },
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

            // getEditableItem: async id => {
            //     const post = await getRepos().postsRepo.getOne(id);

            //     const tagIds = await getTagsOfPost(id);

            //     return {
            //         ...post,
            //         tagIds,
            //     };
            // },
            // createItem: async values => {
            //     const postEntity: IPostEntity = {
            //         authorId: values.authorId,
            //         content: values.content,
            //         id: values.id,
            //         slug: values.slug,
            //         title: values.title,
            //         createdAt: new Date().toUTCString(),
            //         updatedAt: new Date().toUTCString(),
            //     };

            //     const id = await getRepos().postsRepo.create(postEntity);

            //     await setTagsForPost(id, values.tagIds);

            //     return id;
            // },
            // updateItem: async (id, values) => {
            //     const postEntity: Partial<IPostEntity> = {
            //         ...values,
            //         updatedAt: new Date().toUTCString(),
            //     };

            //     await getRepos().postsRepo.update(id, postEntity);

            //     if (values.tagIds) {
            //         await setTagsForPost(id, values.tagIds);
            //     }
            // },
            // deleteItem: getRepos().postsRepo.delete,
        // },
    // },

    // frontend: {
// };
