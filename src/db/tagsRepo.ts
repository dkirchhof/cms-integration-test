import { HTTPError } from "cms/dist/server/types/httpError";
import { createId, getPaginatedRows } from ".";
import { i18n } from "../modules/i18n";
import { Tag } from "../modules/tag";

export class TagsRepo {
    private rows: Tag.IEntity[] = [
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

    public async getTagsByIds(ids: string[]) {
        return this.rows.filter(row => ids.includes(row.id));
    }

    public async getList(page?: number, pageSize?: number) {
        return {
            items: getPaginatedRows(this.rows, page, pageSize)
                .map(row => Tag.getLocalizedEntity(row, i18n.defaultLocale)),
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

    public async createItem(values: Tag.ItemType.EditorType) {
        const id = createId("tag");

        this.rows.push({
            id,
            name: values.name,
        });

        return id;
    }

    public async updateItem(id: string, values: Tag.ItemType.PartialEditorType) {
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
