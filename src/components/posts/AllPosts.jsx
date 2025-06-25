import { useEffect, useState } from "react";
import "./AllPosts.css";
import { deletePost, getAllPosts } from "../../services/postService";
import { Link, useNavigate } from "react-router-dom";

export const AllPosts = ({ token }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [orderedPosts, setOrderedPosts] = useState([]);

  const navigate = useNavigate();

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
    navigate(`/posts/${id}/edit`);
  };

  const userId = parseInt(token);

  return (
    <article id="all-posts-container">
      {/* <div id="conditional-buttons">
        <div className="button-row"></div>
        {orderedPosts?.map((post) =>
          post.author_id === userId ? (
            <div className="button-row" key={post.id}>
              <button
                className="icon-button"
                onClick={() => handleEdit(post.id)}
                title="Edit Post"
              >
                ⚙️
              </button>
              <button
                className="icon-button"
                onClick={() => handleDelete(post.id)}
                title="Delete Post"
              >
                🗑️
              </button>
            </div>
          ) : (
            <div className="button-row" key={post.id}></div>
          )
        )}
      </div> */}

      <div id="all-posts-table">
        <div className="posts-row">
          <div className="posts-column">Actions</div>
          <div className="posts-column">Title</div>
          <div className="posts-column">Author</div>
          <div className="posts-column">Date</div>
          <div className="posts-column">Category</div>
          <div className="posts-column">Tags</div>
        </div>

        {orderedPosts?.map((post) => (
          <div className="posts-row" key={post.id}>
            <div className="posts-column button-row">
              {post.author_id === userId && (
                <>
                  <button
                    className="icon-button"
                    onClick={() => handleEdit(post.id)}
                    title="Edit Post"
                  >
                    ⚙️
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => handleDelete(post.id)}
                    title="Delete Post"
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
            <div className="posts-column">
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </div>
            <div className="posts-column">{post.author}</div>
            <div className="posts-column">
              {post.publication_date.slice(0, 10)}
            </div>
            <div className="posts-column">{post.category}</div>
            <div className="posts-column">{post.tags}</div>
          </div>
        ))}
      </div>
    </article>
  );
};
