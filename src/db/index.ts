import { PersonsRepo } from "./personsRepo";
import { TagsRepo } from "./tagsRepo";
import { PostsRepo } from "./postsRepo";

export const createId = (typeName: string) => {
    return typeName + Math.random().toFixed(8).slice(2);
};

export const getPaginatedRows = <T>(rows: T[], page?: number, pageSize?: number) => {
    if (page && pageSize) {
        // 1, 10 => 0..9
        // 2, 10 => 10..19
        // 3, 10 => 20..29
        const offset = (page - 1) * pageSize;

        return rows.slice(offset, offset + pageSize)
    }

    return rows;
};

export const getRepos = () => {
    const repos = {
        personsRepo: new PersonsRepo(),
        tagsRepo: new TagsRepo(),
        postsRepo: new PostsRepo(),
    };

    if (!(global as any).repos) {
        (global as any).repos = repos;
    }

    return (global as any).repos as typeof repos;
};

// export const getTagsOfPost = async (postId: string) => {
//     return (await getRepos().postTagsRepo.getAll())
//         .filter(postTag => postTag.postId === postId)
//         .map(postTag => postTag.tagId);
// };

// export const setTagsForPost = async (postId: string, tagIds: string[]) => {
//     // get all connections
//     const oldConnections = (await getRepos().postTagsRepo.getAll())
//         .filter(postTag => postTag.postId === postId);

//     // delete them
//     for (const connection of oldConnections) {
//         await getRepos().postTagsRepo.delete(connection.id);
//     }

//     // create new tag connections
//     for (const tagId of tagIds) {
//         await getRepos().postTagsRepo.create({ id: "", postId, tagId });
//     }
// };






