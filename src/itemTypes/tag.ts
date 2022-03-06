import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { notEmpty } from "cms/dist/validators/stringValidators";
import { cms, itemTypeBuilder, locales } from "..";

const listType = itemTypeBuilder.createListType(["name"]);

const editorType = itemTypeBuilder.createEditorType({
    name: {
        localize: true,
        editor: textEditorFactory(),
        defaultValue: "",
        validators: [notEmpty],
    },
});

const tmpData = [
    {
        id: "tag1",
        name: { "en-US": "Tag one", "de-DE": "Tag eins" },
    },
    {
        id: "tag2",
        name: { "en-US": "Tag two", "de-DE": "Tag zwei" },
    },
];

const getList = () => Promise.resolve(
    tmpData.map(tag => {
        const mappedPerson: typeof listType.t = {
            id: tag.id,
            name: tag.name[locales[0]]
        };

        return mappedPerson;
    })
);

const getItem = (id: string) => Promise.resolve(
    tmpData.find(tag => tag.id === id)
);

export const tag = itemTypeBuilder.createItemType({
    name: ["tag", "tags"],

    toString: item => item.name,

    listType,
    editorType,

    api: {
        getList,
        getItem,

        createItem: values => Promise.resolve(""),
        updateItem: (id, values) => Promise.resolve(),
        deleteItem: id => Promise.resolve(),
    },
});
