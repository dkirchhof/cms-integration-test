import { NextPageContext } from "next";
import { postsRepo } from "../db";
import { IPost } from "../types/post";

const Post = (props: { post: IPost; }) => (
    <div>{props.post.title}</div>
);

export default Post;

export async function getServerSideProps(context: NextPageContext) {
    const post = await postsRepo.getBySlug(context.query.slug as string);
    
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
