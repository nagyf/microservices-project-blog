import { Comment } from './PostList';

export interface CommentListProps {
    readonly comments: Comment[];
}

export const CommentList = (props: CommentListProps) => {
    const renderedComments = props.comments.map((comment) => {
        if (comment.status === 'approved') {
            return <li key={comment.id}>{comment.content.toString()}</li>;
        } else if (comment.status === 'pending') {
            return <li key={comment.id}>Comment is pending moderation</li>;
        } else {
            return <li key={comment.id}>This comment has been rejected</li>;
        }
    });

    return <ul>{renderedComments}</ul>;
};
