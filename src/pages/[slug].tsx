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
}

const Post = (props: { post: IPost; }) => {
    return (
        <div suppressHydrationWarning>
            <h1>{props.post.title}</h1>
            <VisualBlockRenderer blockConfigs={blockConfigs} blocks={props.post.content} />
        </div>
    );
};

export default Post;

export async function getServerSideProps(context: NextPageContext) {
    const locale = cms.getCurrentLocale(context);
    const row = await getRepos().postsRepo.getPostBySlug(context.query.slug as string, locale);

    if (!row) {
        return {
            notFound: true,
        };
    }

    const post: IPost = {
        slug: row.slug[locale],
        title: row.title[locale],
        content: row.content,
    };

    return {
        props: {
            post,
        },
    };
};
