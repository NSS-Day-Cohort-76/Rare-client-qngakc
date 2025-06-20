import { useEffect, useState } from "react";
import "./AllPosts.css";
import { deletePost, getAllPosts } from "../../services/postService";
import { Link, useNavigate } from "react-router-dom";

export const AllPosts = ({ token }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [orderedPosts, setOrderedPosts] = useState([]);

  const navigate = useNavigate()

  const today = new Date();
  useEffect(() => {
    getAllPosts().then(setAllPosts);
  }, []);

  useEffect(() => {
    const orderPosts = allPosts?.toSorted(
      (a, b) => new Date(a.publication_date) - new Date(b.publication_date)
    );
    setOrderedPosts(orderPosts);
  }, [allPosts]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id).then(() => getAllPosts().then(setAllPosts));
    }
  };

  const handleEdit = (id) => {
    navigate(`/posts/${id}/edit`)
  }

  const userId = parseInt(token)

  return (
    <article id="all-posts-container">
      <div id="posts-table">
        <div className="row">
          <div className="column"></div> 
          <div className="column">Title</div>
          <div className="column">Author</div>
          <div className="column">Date</div>
          <div className="column">Category</div>
          <div className="column">Tags</div>
        </div>
        {orderedPosts?.map((post) => {
  if (post.approved === 1 && new Date(post.publication_date) < today) {
    return (
      <div className="post-row-container" key={post.id}>
        {post.author_id === userId && (
          <div className="action-icons">
            <button
              className="icon-button"
              onClick={() => handleDelete(post.id)}
              title="Delete Post"
            >
              🗑️
            </button>
            <button
              className="icon-button"
              onClick={() => handleEdit(post.id)}
              title="Edit Post"
            >
              ⚙️
            </button>
          </div>
        )}
        <div className="row">
          <div className="column">
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </div>
          <div className="column">{post.author}</div>
          <div className="column">{post.publication_date}</div>
          <div className="column">{post.category}</div>
          <div className="column">{post.tags}</div>
        </div>
      </div>
            );
          }
        })}
      </div>
    </article>
  );
};
