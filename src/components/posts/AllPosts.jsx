import { useEffect, useState } from "react";
import "./AllPosts.css";
import {
  deletePost,
  getAllPosts,
  updatePostAdminApproval,
} from "../../services/postService";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../../services/categoryService.js";
import { getAllTags } from "../../services/TagService.jsx";
import { getAllUsers } from "../../services/userService.jsx";
import { getOneUser } from "../../services/userService.jsx";

export const AllPosts = ({ token }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const [admin, setAdmin] = useState({});
  //  working to add checkboxes that are filled by the previous approved value for each post  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();;

  const today = new Date();

  useEffect(() => {
    getAllPosts().then((post) => {
      setAllPosts(post);
      const initialChecked = {};
      post.forEach((posts) => {
        initialChecked[posts.id] = posts.approved === 1;
      });
      setChecked(initialChecked);
    });
  }, []);

  useEffect(() => {
    getAllCategories().then(setAllCategories);
  }, []);

  useEffect(() => {
    getAllTags().then(setAllTags);
  }, []);

  useEffect(() => {
    getAllUsers().then(setAllUsers);
  }, []);

  // useEffect(() => {
  //   const orderPosts = allPosts?.toSorted(
  //     (a, b) => new Date(a.publication_date) - new Date(b.publication_date)
  //   );
  //   setOrderedPosts(orderPosts);
  // }, [allPosts]);

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
    const isChecked = checked[postId];
    const updatedPost = {
      approved: isChecked ? 0 : 1,
    };
    updatePostAdminApproval(updatedPost, postId);
  };


  const filteredPosts = allPosts
    .filter((post) => {
      const isApproved = post.approved === 1;
      const isPublished = new Date(post.publication_date) < today;
      const matchesCategory =
        selectedCategory === null || post.category === selectedCategory;
      const matchesUser = selectedUser === null || post.author === selectedUser;
      const matchesTag =
        selectedTag === null ||
        (post.tags &&
          post.tags
            .split(",")
            .map((tag) => tag.trim())
            .includes(selectedTag));

      return (
        isApproved &&
        isPublished &&
        matchesCategory &&
        matchesUser &&
        matchesTag
      );
    })
    .toSorted(
      (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
    );

    const userId = parseInt(token);

  return (
  <>
    <select
      value={selectedCategory || ""}
      onChange={(e) => setSelectedCategory(e.target.value || null)}
    >
      <option value="">All Categories</option>
      {allCategories.map((category) => (
        <option key={category.id} value={category.label}>
          {category.label}
        </option>
      ))}
    </select>

    <select
      value={selectedUser || ""}
      onChange={(e) => setSelectedUser(e.target.value || null)}
    >
      <option value="">All Users</option>
      {allUsers.map((author) => (
        <option
          key={author.id}
          value={`${author.first_name} ${author.last_name}`}
        >
          {author.first_name} {author.last_name}
        </option>
      ))}
    </select>

    <select
      value={selectedTag || ""}
      onChange={(e) => setSelectedTag(e.target.value || null)}
    >
      <option value="">All Tags</option>
      {allTags.map((tag) => (
        <option key={tag.id} value={tag.label}>
          {tag.label}
        </option>
      ))}
    </select>

    <article id="all-posts-container">
      <div id="posts-table">
        <div className="row">
          <div className="column"></div>
          <div className="column">Title</div>
          <div className="column">Author</div>
          <div className="column">Date</div>
          <div className="column">Category</div>
          <div className="column">Tags</div>
          {admin.admin_id && <div className="column">Approved</div>}
        </div>

        {filteredPosts.map((post) => (
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
              {admin.admin_id && (
                <div className="column">
                  <input
                    type="checkbox"
                    checked={checked[post.id] || false}
                    onChange={() => {
                      setChecked((prev) => ({
                        ...prev,
                        [post.id]: !prev[post.id],
                      }));
                      updatedPostApproval(post.id);
                    }}
                  />
                  <p>{checked[post.id] ? "True" : "False"}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </article>
  </>
);
}