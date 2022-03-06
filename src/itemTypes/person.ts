import { numberEditorFactory } from "cms/dist/editor/editors/numberEditor";
import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { isEmail, notEmpty } from "cms/dist/validators/stringValidators";
import { itemTypeBuilder } from "..";

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

const tmpData = [
    {
        id: "p1",
        firstname: "John",
        lastname: "Doe",
        email: "john@doe.com",
        age: 30,
        job: { "en-US": "Developer", "de-DE": "Entwickler" },
    },
    {
        id: "p2",
        firstname: "Max",
        lastname: "Mustermann",
        email: "max@mustermann.de",
        age: 34,
        job: { "en-US": "Editor", "de-DE": "Redakteur" },
    },
];

const getList = () => Promise.resolve(
    tmpData.map(person => {
        const mappedPerson: typeof listType.t = {
            id: person.id,
            firstname: person.firstname,
            lastname: person.lastname,
            email: person.email,
        };

        return mappedPerson;
    })
);

const getItem = (id: string) => Promise.resolve(
    tmpData.find(person => person.id === id)
);

export const person = itemTypeBuilder.createItemType({
    name: ["person", "persons"],

    toString: item => `${item.firstname} ${item.lastname}`,

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
