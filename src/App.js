import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  useEffect(() => {
    if (selectedPost) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${selectedPost.id}/comments`)
        .then(response => response.json())
        .then(data => setComments(data));
    } else {
      setComments([]);
    }
  }, [selectedPost]);

  function handlePostClick(post) {
    setSelectedPost(post);
  }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} onClick={() => handlePostClick(post)}>
            {post.title}
          </li>
        ))}
      </ul>

      {selectedPost && (
        <>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>

          <h3>Comments</h3>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <strong>{comment.email}</strong>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;

