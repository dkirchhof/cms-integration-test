import { VisualBlockRenderer } from "cms/dist/frontend";
import { NextPageContext } from "next";
import { blockConfigs } from "../blocks";
import { getRepos } from "../db";
import { IPost } from "../types/post";

const Post = (props: { post: IPost; }) => (
    <div suppressHydrationWarning>
        <VisualBlockRenderer blockConfigs={blockConfigs} ctx={props.post} root={props.post.content} />
    </div>
);

export default Post;

export async function getServerSideProps(context: NextPageContext) {
    const post = await getRepos().postsRepo.getBySlug(context.query.slug as string);
    
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
