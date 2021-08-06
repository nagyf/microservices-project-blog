import { CommentCreate } from './CommentCreate';
import { CommentList } from './CommentList';

export interface Comment {
    readonly id: string;
    readonly content: string;
}

export interface Post {
    readonly id: string;
    readonly title: string;
    readonly comments: Comment[];
}

export interface PostListProps {
    readonly posts: Post[];
}

export const PostList = (props: PostListProps) => {
    const renderedPosts = props.posts.map((post: Post, idx: number) => {
        return (
            <div key={idx} className="card" style={{ width: '30%', marginBottom: '20px' }}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });

    return <div className="d-flex flex-row flex-wrap justify-content-between">{renderedPosts}</div>;
};
