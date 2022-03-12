import { PersonsRepo } from "./personsRepo";
import { PostsRepo } from "./postsRepo";
import { TagsRepo } from "./tagsRepo";

export const createId = (typeName: string) => {
    return typeName + Math.random().toFixed(8).slice(2);
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






