import { IItem } from "cms/dist/types/itemTypeConfig";
import { IAuthorEntity } from "../types/author";
import { IPostEntity } from "../types/post";
import { IPostTagEntity } from "../types/postTag";
import { ITagEntity } from "../types/tag";

class Repo<T extends IItem> {
    constructor(protected rows: T[]) { }

    getAll = async () => {
        return this.rows;
    };

    getOne = async (id: string) => {
        const row = this.rows.find(row => row.id === id);

        if (!row) {
            throw new Error("couldn't find item");
        }

        return row;
    };

    create = async (data: T) => {
        const id = Math.random().toString().slice(2);

        data.id = id;

        this.rows.push(data);

        return id;
    };

    update = async (id: string, data: Partial<T>) => {
        const row = await this.getOne(id);

        if (!row) {
            throw new Error("couldn't find item");
        }

        Object.assign(row, data);
    };

    delete = async (id: string) => {
        this.rows = this.rows.filter(row => row.id !== id);
    };
}

export const getRepos = () => {
    const repos = {
        postsRepo: new Repo<IPostEntity>([
            {
                id: "post1",
                slug: "first-post",
                title: "My first Post",
                createdAt: new Date().toUTCString(),
                updatedAt: new Date().toUTCString(),
                authorId: "author1",
                content: [ 
                    {
                        blockName: "Header",
                        id: "aaa",
                        data: {
                            imgSrc: "https://i.picsum.photos/id/60/1000/300.jpg?hmac=WmF-em1XlDmu1mGUw-jMk9g4Qr2mbIgTXGCVx03vWfE",
                            imgAlt: "desk",
                        },
                    },
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
            { id: "post2", slug: "second-post", title: "My second Post", authorId: "author1", createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: [] },
            { id: "post3", slug: "third-post", title: "My third Post", authorId: "author1", createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: [] },
        ]),

        authorsRepo: new Repo<IAuthorEntity>([
            { id: "author1", firstname: "John", lastname: "Doe", email: "john@doe.com" },
            { id: "author2", firstname: "Max", lastname: "Mustermann", email: "max@mustermann.de" },
        ]),

        tagsRepo: new Repo<ITagEntity>([
            { id: "tag1", name: "Tag 1" },
            { id: "tag2", name: "Tag 2" },
            { id: "tag3", name: "Tag 3" },
        ]),

        postTagsRepo: new Repo<IPostTagEntity>([
            { id: "1", postId: "post1", tagId: "tag1" },
            { id: "2", postId: "post1", tagId: "tag2" },
        ]),
    };

    if (!(global as any).repos) {
        (global as any).repos = repos;
    }

    return (global as any).repos as typeof repos;
};

export const getTagsOfPost = async (postId: string) => {
    return (await getRepos().postTagsRepo.getAll())
        .filter(postTag => postTag.postId === postId)
        .map(postTag => postTag.tagId);
};

export const setTagsForPost = async (postId: string, tagIds: string[]) => {
    // get all connections
    const oldConnections = (await getRepos().postTagsRepo.getAll())
        .filter(postTag => postTag.postId === postId);

    // delete them
    for (const connection of oldConnections) {
        await getRepos().postTagsRepo.delete(connection.id);
    }

    // create new tag connections
    for (const tagId of tagIds) {
        await getRepos().postTagsRepo.create({ id: "", postId, tagId });
    }
};
