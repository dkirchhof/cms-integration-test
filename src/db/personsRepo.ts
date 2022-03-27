import { HTTPError } from "cms/dist/server/types/httpError";
import { createId, getPaginatedRows } from ".";
import { Person } from "../modules/person";

export class PersonsRepo {
    private rows = [
        {
            id: "p1",
            firstname: "John",
            lastname: "Doe",
            email: "john@doe.com",
            age: 30,
            job: { "en": "Developer", "de": "Entwickler" },
        },
        {
            id: "p2",
            firstname: "Max",
            lastname: "Mustermann",
            email: "max@mustermann.de",
            age: 34,
            job: { "en": "Editor", "de": "Redakteur" },
        },
        {
            id: "p3",
            firstname: "Max",
            lastname: "Mustermann",
            email: "max@mustermann.de",
            age: 34,
            job: { "en": "Editor", "de": "Redakteur" },
        },
        {
            id: "p4",
            firstname: "Max",
            lastname: "Mustermann",
            email: "max@mustermann.de",
            age: 34,
            job: { "en": "Editor", "de": "Redakteur" },
        },
        {
            id: "p5",
            firstname: "Max",
            lastname: "Mustermann",
            email: "max@mustermann.de",
            age: 34,
            job: { "en": "Editor", "de": "Redakteur" },
        },
    ];

    public async getPersonById(id: string) {
        return this.rows.find(row => row.id === id);
    }

    public async getList(page?: number, pageSize?: number) {
        return {
            items: getPaginatedRows(this.rows, page, pageSize).map(Person.entityToListItem),
            count: this.rows.length,
        };
    }

    public async getItem(id: string) {
        const item = this.rows.find(row => row.id === id);

        if (!item) {
            throw new Error("Couldn't find item.");
        }

        return item;
    }

    public async createItem(values: Person.ItemType.EditorType) {
        const id = createId("tag");

        this.rows.push({
            id,
            firstname: values.firstname,
            lastname: values.lastname,
            age: values.age,
            email: values.email,
            job: values.job,
        });

        return id;
    }

    public async updateItem(id: string, values: Person.ItemType.PartialEditorType) {
        const old = await this.getItem(id);

        if (!old) {
            throw new HTTPError(404, "Couldn't find item.");
        }
        
        const { job, ...nonLocalizedValues } = values;

        Object.assign(old, nonLocalizedValues);
        Object.assign(old.job, job);
    }

    public async deleteItem(id: string) {
        this.rows = this.rows.filter(row => row.id !== id);
    }
}
