import { VisualBlockRenderer } from "cms/dist/frontend";
import { IBlock } from "cms/dist/types/block";
import { NextPageContext } from "next";
import { cms } from "..";
import { blockConfigs } from "../blocks";
import { getRepos } from "../db";

interface IPost {
    slug: string;
    title: string;
    content: IBlock[];
    author: { id: string; firstname: string; lastname: string; email: string; job: string; }
    tags: { id: string; name: string; }[];
}

const Post = (props: { post: IPost; }) => {
    return (
        <div suppressHydrationWarning>
            <h1>{props.post.title}</h1>
            <VisualBlockRenderer blockConfigs={blockConfigs} blocks={props.post.content} />
            <div>
                {props.post.author.firstname}
                {props.post.author.lastname}
                {props.post.author.email}
                {props.post.author.job}
            </div>
            <ul>
                {props.post.tags.map(tag => <li key={tag.id}>{tag.name}</li>)}
            </ul>
        </div>
    );
};

export default Post;

export async function getServerSideProps(context: NextPageContext) {
    const locale = cms.getCurrentLocale(context);
    const postRow = await getRepos().postsRepo.getPostBySlug(context.query.slug as string, locale);

    if (!postRow) {
        return {
            notFound: true,
        };
    }

    const personRow = await getRepos().personsRepo.getPersonById(postRow.authorId);
    
    if (!personRow) {
        throw new Error("error");
    }

    const tagRows = await getRepos().tagsRepo.getTagsByIds(postRow.tagIds); 


    const post: IPost = {
        slug: postRow.slug[locale],
        title: postRow.title[locale],
        content: postRow.content,
        author: { id: personRow.id, firstname: personRow.firstname, lastname: personRow.lastname, email: personRow.email, job: personRow.job[locale] },
        tags: tagRows.map(row => ({ id: row.id, name: row.name[locale] })),
    };

    return {
        props: {
            post,
        },
    };
};
