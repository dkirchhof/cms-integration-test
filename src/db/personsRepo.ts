import { Partial2 } from "cms/dist/itemTypeBuilder";
import { HTTPError } from "cms/dist/server/types/httpError";
import { createId } from ".";
import { createId, getPaginatedRows } from ".";
import { editorType, listType } from "../itemTypes/person";

export class PersonsRepo {
    private rows = [
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
        {
            id: "p3",
            firstname: "Max",
            lastname: "Mustermann",
            email: "max@mustermann.de",
            age: 34,
            job: { "en-US": "Editor", "de-DE": "Redakteur" },
        },
        {
            id: "p4",
            firstname: "Max",
            lastname: "Mustermann",
            email: "max@mustermann.de",
            age: 34,
            job: { "en-US": "Editor", "de-DE": "Redakteur" },
        },
        {
            id: "p5",
            firstname: "Max",
            lastname: "Mustermann",
            email: "max@mustermann.de",
            age: 34,
            job: { "en-US": "Editor", "de-DE": "Redakteur" },
        },
    ];

    public async getList(page?: number, pageSize?: number) {
        return {
            items: getPaginatedRows(this.rows, page, pageSize).map(row => {
                const item: typeof listType.t = {
                    id: row.id,
                    firstname: row.firstname,
                    lastname: row.lastname,
                    email: row.email,
                };

                return item;
            }),
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

    public async createItem(values: typeof editorType.t) {
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

    public async updateItem(id: string, values: Partial2<typeof editorType.t>) {
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
