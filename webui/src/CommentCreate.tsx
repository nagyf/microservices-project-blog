import axios from 'axios';
import { useState } from 'react';

export interface CommentCreateProps {
    readonly postId: string;
}

export const CommentCreate = (props: CommentCreateProps) => {
    const [content, setContent] = useState('');

    const onSubmit = async (event: any) => {
        event.preventDefault();

        await axios.post(`http://localhost:4001/posts/${props.postId}/comments`, {
            content,
        });

        setContent('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New comment</label>
                    <input
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};
