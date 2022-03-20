import { HTTPError } from "cms/dist/server/types/httpError";
import { createId, getPaginatedRows } from ".";
import { locales } from "..";
import { editorType, listType } from "../itemTypes/post";

export class PostsRepo {
    private rows = [
        {
            id: "post1",
            slug: { "en-US": "first-post", "de-DE": "erster-artikel" },
            title: { "en-US": "My first Post", "de-DE": "Mein erster Artikel" },
            // createdAt: new Date().toUTCString(),
            // updatedAt: new Date().toUTCString(),
            authorId: "p1",
            tagIds: ["tag1", "tag2"],
            content: [
                // {
                //     blockName: "Header",
                //     id: "aaa",
                //     data: {
                //         imgSrc: "https://i.picsum.photos/id/60/1000/300.jpg?hmac=WmF-em1XlDmu1mGUw-jMk9g4Qr2mbIgTXGCVx03vWfE",
                //         imgAlt: "desk",
                //     },
                // },
                {
                    blockName: "ContentLimitation",
                    id: "bbb",
                    data: {
                        maxWidth: 800,
                        children: [
                            {
                                blockName: "Paragraph",
                                id: "ccc",
                                data: { text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." },
                            },
                            {
                                blockName: "Paragraph",
                                id: "ddd",
                                data: { text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." }
                            },
                            {
                                blockName: "Image",
                                id: "eee",
                                data: { src: "https://i.picsum.photos/id/101/200/200.jpg?hmac=8aiHS9K78DvBexQ7ZROLuLizDR22o8CcjRMUhHbZU6g", alt: "test bild" },
                            },
                            {
                                blockName: "Columns",
                                id: "fff",
                                data: {
                                    gap: 10,
                                    children: [
                                        { blockName: "Paragraph", id: "ggg", data: { text: "column 1" } },
                                        { blockName: "Paragraph", id: "hhh", data: { text: "column 2" } },
                                    ],
                                },
                            },
                        ],
                    },
                },
            ],
        },
    ];

    public async getList(page?: number, pageSize?: number) {
        return {
            items: getPaginatedRows(this.rows, page, pageSize).map(row => {
                const item: typeof listType.t = {
                    id: row.id,
                    slug: row.slug[locales[0]],
                    title: row.title[locales[0]],
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
        const id = createId("post");

        this.rows.push({
            id,
            slug: values.slug,
            title: values.title,
            // createdAt: new Date().toUTCString(),
            // updatedAt: new Date().toUTCString(),
            authorId: values.authorId,
            tagIds: values.tagIds,
            content: values.content,
        });

        return id;
    }

    public async updateItem(id: string, values: typeof editorType.tPartial) {
        const old = await this.getItem(id);

        if (!old) {
            throw new HTTPError(404, "Couldn't find item.");
        }
        
        Object.assign(old.slug, values.slug);
        Object.assign(old.title, values.title);

        if (values.authorId) {
            old.authorId = values.authorId;
        }

        if (values.tagIds) {
            old.tagIds = values.tagIds;
        }

        if (values.content) {
            old.content = values.content;
        }

        // old.updatedAt = new Date().toUTCString();
    }

    public async deleteItem(id: string) {
        this.rows = this.rows.filter(row => row.id !== id);
    }
}
