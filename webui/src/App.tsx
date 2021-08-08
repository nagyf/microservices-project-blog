import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { PostCreate } from './PostCreate';
import { PostList } from './PostList';

function App() {
    const [posts, setPosts] = useState([]);

    const queryPosts = async () => {
        const result = await axios.get('http://posts.com/query');
        setPosts(Object.values(result.data));
    };

    useEffect(() => {
        queryPosts();
    }, []);

    return (
        <div className="container">
            <h1>Create Post</h1>
            <PostCreate />
            <PostList posts={posts} />
        </div>
    );
}

export default App;
