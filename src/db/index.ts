import { IAuthor } from "../types/author";
import { ICreateOrUpdatePost, IPost } from "../types/post";
import { IPostTag } from "../types/postTag";
import { ITag } from "../types/tag";

class Repo<T extends { id: string; }> {
    constructor(protected rows: T[]) { }

    getAll = async () => {
        return this.rows;
    };

    getOne = async (id: string) => {
        return this.rows.find(row => row.id === id) || null;
    };

    create = async (data: T) => {
        const id = Math.random().toString().slice(2);

        const row = {
            ...data,
            id,
        };

        this.rows.push(row);

        return row;
    };

    update = async (id: string, data: Partial<T>) => {
        const row = await this.getOne(id)!;

        Object.assign(row, data);

        return row;
    };

    delete = async (id: string) => {
        this.rows = this.rows.filter(row => row.id !== id);
    };
}

export const postsRepo = new class extends Repo<IPost> {
    getBySlug = async (slug: string) => {
        return this.rows.find(row => row.slug === slug);
    };

    create = async (data: ICreateOrUpdatePost) => {
        const { tagIds, ...newPostData } = data;

        const post: IPost = {
            ...newPostData,
            id: Math.random().toString(),
        };

        this.rows.push(post);

        await Promise.all(
            tagIds.map(tagId => postsTagsRepo.create({ postId: post.id, tagId }))
        );

        return post;
    };

    update = async (id: string, data: Partial<ICreateOrUpdatePost>) => {
        const post = await this.getOne(id);

        if (!post) {
            throw new Error("can't find item");
        }

        const { tagIds, ...updatedPostData } = data;

        if (tagIds) {
            await postsTagsRepo.deleteTagIdsOfPost(id);

            await Promise.all(
                tagIds.map(tagId => postsTagsRepo.create({ postId: post.id, tagId }))
            );
        }

        Object.assign(post, updatedPostData);

        return post;
    };

    delete = async (id: string) => {
        this.rows = this.rows.filter(row => row.id !== id);

        await postsTagsRepo.deleteTagIdsOfPost(id);
    };

    deletePostsOfAuthor = async (authorId: string) => {
        this.rows = this.rows.filter(row => row.authorId !== authorId);
    };
}([
    {
        id: "post1", slug: "first-post", title: "My first Post", authorId: "author1", content: {
            blockName: "Root",
            data: {
                children: [
                    {
                        blockName: "Header",
                        data: {
                            imgSrc: "https://i.picsum.photos/id/60/1000/300.jpg?hmac=WmF-em1XlDmu1mGUw-jMk9g4Qr2mbIgTXGCVx03vWfE",
                            imgAlt: "desk",
                        },
                    },
                    {
                        blockName: "ContentLimitation",
                        data: {
                            maxWidth: 800,
                            children: [
                                {
                                    blockName: "Paragraph",
                                    data: { text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." },
                                },
                                {
                                    blockName: "Paragraph",
                                    data: { text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet." }
                                },
                                {
                                    blockName: "Image",
                                    data: { src: "https://i.picsum.photos/id/101/200/200.jpg?hmac=8aiHS9K78DvBexQ7ZROLuLizDR22o8CcjRMUhHbZU6g", alt: "test bild" },
                                },
                                {
                                    blockName: "Columns",
                                    data: {
                                        gap: 10,
                                        children: [
                                            { blockName: "Paragraph", data: { text: "column 1" } },
                                            { blockName: "Paragraph", data: { text: "column 2" } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    },
{ id: "post2", slug: "second-post", title: "My second Post", authorId: "author1", content: { } },
{ id: "post3", slug: "third-post", title: "My third Post", authorId: "author1", content: { } },
]);

export const authorsRepo = new class extends Repo<IAuthor> {
    delete = async (id: string) => {
        this.rows = this.rows.filter(row => row.id !== id);

        await postsRepo.deletePostsOfAuthor(id);
    };
}([
    { id: "author1", firstname: "John", lastname: "Doe", email: "john@doe.com" },
]);

export const tagsRepo = new Repo<ITag>([
    { id: "tag1", name: "Tag 1" },
    { id: "tag2", name: "Tag 2" },
    { id: "tag3", name: "Tag 3" },
]);

export const postsTagsRepo = new class {
    private rows: IPostTag[] = [
        { postId: "post1", tagId: "tag1" },
        { postId: "post1", tagId: "tag2" },
    ];

    getTagIdsOfPost = async (postId: string) => {
        return this.rows.filter(row => row.postId === postId);
    };

    create = async (postTag: IPostTag) => {
        this.rows.push(postTag);

        return postTag;
    };

    deleteTagIdsOfPost = async (postId: string) => {
        this.rows = this.rows.filter(row => row.postId !== postId);
    };
};
