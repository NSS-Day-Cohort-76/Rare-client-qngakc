import { useEffect, useState } from "react";
import "./AllPosts.css";
import { deletePost, getAllPosts, updatePostAdminApproval } from "../../services/postService";
import { Link, useNavigate } from "react-router-dom";
import { getOneUser } from "../../services/userService.jsx";

export const AllPosts = ({ token }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [orderedPosts, setOrderedPosts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [admin, setAdmin] = useState({});
  //  working to add checkboxes that are filled by the previous approved value for each post
  const navigate = useNavigate();

  const today = new Date();
  useEffect(() => {
    getAllPosts().then((post) => {
      setAllPosts(post);
        const initialChecked = {}
        post.forEach((posts) => {
            initialChecked[posts.id] = posts.approved === 1;
        })
        setChecked(initialChecked)
    });
  }, []);

  useEffect(() => {
    const orderPosts = allPosts?.toSorted(
      (a, b) => new Date(a.publication_date) - new Date(b.publication_date)
    );
    setOrderedPosts(orderPosts);
  }, [allPosts]);

  useEffect(() => {
    getOneUser(token).then(setAdmin);
  }, [token]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id).then(() => getAllPosts().then(setAllPosts));
    }
  };

  const handleEdit = (id) => {
    navigate(`/posts/${id}/edit`);
  };

    const updatedPostApproval = (postId) => {
    if (checked === true) {
      const updatedPost = {
        approved: 1,
      };
      updatePostAdminApproval(updatedPost, postId);
    } else {
      const updatedPost = {
        approved: 0,
      };

      updatePostAdminApproval(updatedPost, postId);
    }
  };

  const userId = parseInt(token);

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
          <div className="column">Approved</div>
        </div>
        {admin.admin_id
          ? orderedPosts?.map((post) => {
              if (new Date(post.publication_date) < today) {
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
                      <div className="column">
                        <input
                          type="checkbox"
                          checked={checked[post.id]}
                          onChange={() => {
                            setChecked((prev) => ({
                              ...prev,
                              [post.id]: !prev[post.id],
                            }));
                            updatedPostApproval(post.id)
                          }}
                        />
                        <p>{checked[post.id] ? "True" : "False"}</p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })
          : orderedPosts?.map((post) => {
              if (
                post.approved === 1 &&
                new Date(post.publication_date) < today
              ) {
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
                      <div className="column"></div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
      </div>
    </article>
  );
};
