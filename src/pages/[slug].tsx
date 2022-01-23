import { VisualBlockRenderer } from "cms/dist/frontend";
import { NextPageContext } from "next";
import { blockConfigs } from "../blocks";
import { getRepos } from "../db";
import { IPostEntity } from "../types/post";

const Post = (props: { post: IPostEntity; }) => (
    <div suppressHydrationWarning>
        <VisualBlockRenderer blockConfigs={blockConfigs} ctx={props.post} root={props.post.content} />
    </div>
);

export default Post;

export async function getServerSideProps(context: NextPageContext) {
    const posts = await getRepos().postsRepo.getAll();
    const post = posts.find(post => post.slug === context.query.slug);
    
    if (!post) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post,
        }, 
    };
};
