import { Partial2 } from "cms/dist/itemTypeBuilder";
import { HTTPError } from "cms/dist/server/types/httpError";
import { createId } from ".";
import { locales } from "..";
import { editorType, listType } from "../itemTypes/tag";

export class TagsRepo {
    private rows = [
        {
            id: "tag1",
            name: { "en-US": "Tag one", "de-DE": "Tag eins" },
        },
        {
            id: "tag2",
            name: { "en-US": "Tag two", "de-DE": "Tag zwei" },
        },
    ];

    public async getList() {
        return this.rows.map(row => {
            const item: typeof listType.t = {
                id: row.id,
                name: row.name[locales[0]],
            };

            return item;
        });
    }

    public async getItem(id: string) {
        return this.rows.find(row => row.id === id);
    }

    public async createItem(values: typeof editorType.t) {
        const id = createId("tag");

        this.rows.push({
            id,
            name: values.name,
        });

        return id;
    }

    public async updateItem(id: string, values: Partial2<typeof editorType.t>) {
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
