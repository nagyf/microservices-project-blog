import { Comment } from './PostList';

export interface CommentListProps {
    readonly comments: Comment[];
}

export const CommentList = (props: CommentListProps) => {
    const renderedComments = props.comments.map((comment) => {
        return <li key={comment.id}>{comment.content.toString()}</li>;
    });

    return <ul>{renderedComments}</ul>;
};
