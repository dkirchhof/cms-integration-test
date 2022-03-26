import { HTTPError } from "cms/dist/server/types/httpError";
import { createId, getPaginatedRows } from ".";
import { locales } from "..";
import { editorType, listType } from "../itemTypes/tag";

export class TagsRepo {
    private rows = [
        {
            id: "tag1",
            name: { "en": "Tag one", "de": "Tag eins" },
        },
        {
            id: "tag2",
            name: { "en": "Tag two", "de": "Tag zwei" },
        },
        {
            id: "tag3",
            name: { "en": "Tag three", "de": "Tag drei" },
        },
    ];

    public async getList(page?: number, pageSize?: number) {
        return {
            items: getPaginatedRows(this.rows, page, pageSize).map(row => {
                const item: typeof listType.t = {
                    id: row.id,
                    name: row.name[locales.locales[0]],
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
            name: values.name,
        });

        return id;
    }

    public async updateItem(id: string, values: typeof editorType.tPartial) {
        const old = await this.getItem(id);

        if (!old) {
            throw new HTTPError(404, "Couldn't find item.");
        }
        
        Object.assign(old.name, values.name);
    }

    public async deleteItem(id: string) {
        this.rows = this.rows.filter(row => row.id !== id);
    }
}
