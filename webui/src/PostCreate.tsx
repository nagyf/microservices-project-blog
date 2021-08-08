import axios from 'axios';
import { useState } from 'react';

export const PostCreate = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (event: any) => {
        event.preventDefault();

        await axios.post('http://posts.com/posts', {
            title,
        });

        setTitle('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};
