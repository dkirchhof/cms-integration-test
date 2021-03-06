import { HTTPError } from "cms/dist/server/types/httpError";
import { createId, getPaginatedRows } from ".";
import { i18n } from "../modules/i18n";
import { Post } from "../modules/post";

export class PostsRepo {
    private rows: Post.IEntity[] = [
        {
            id: "post1",
            slug: { "en": "first-post", "de": "erster-artikel" },
            title: { "en": "My first Post", "de": "Mein erster Artikel" },
            image: "https://i.picsum.photos/id/878/1280/720.jpg?hmac=KtX8lPqX3wST-7EH0PYrrd1vbQGigyGzU19Qy3mbrc0",
            // createdAt: new Date().toUTCString(),
            // updatedAt: new Date().toUTCString(),
            authorId: "p1",
            tagIds: ["tag1", "tag2"],
            content: [
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

    public async getPostBySlug(slug: string, locale: i18n.Locales) {
        return this.rows.find(post => post.slug[locale] === slug);
    }

    public async getList(page?: number, pageSize?: number) {
        return {
            items: getPaginatedRows(this.rows, page, pageSize).map(Post.entityToListItem(i18n.defaultLocale)),
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

    public async createItem(values: Post.ItemType.EditorType) {
        const id = createId("post");

        this.rows.push({
            id,
            slug: values.slug,
            title: values.title,
            image: values.image,
            // createdAt: new Date().toUTCString(),
            // updatedAt: new Date().toUTCString(),
            authorId: values.authorId,
            tagIds: values.tagIds,
            content: values.content,
        });

        return id;
    }

    public async updateItem(id: string, values: Post.ItemType.PartialEditorType) {
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
