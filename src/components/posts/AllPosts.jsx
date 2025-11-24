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
import {
  getAllUsers,
  getSubscribedAuthorPost,
  getSubscribedList,
} from "../../services/userService.jsx";
import { getOneUser } from "../../services/userService.jsx";

export const AllPosts = ({ token }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [checked, setChecked] = useState({});
  const [admin, setAdmin] = useState({});
  const [subscribed, setSubscribed] = useState([]);
  const [searchBar, setSearchBar] = useState("");

  const navigate = useNavigate();
  const userId = parseInt(token);
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

  useEffect(() => {
    getOneUser(token).then(setAdmin);
  }, [token]);

  useEffect(() => {
    getSubscribedAuthorPost(parseInt(token)).then(setSubscribed);
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
      const matchesSearch =
        searchBar === "" ||
        post.title.toLowerCase().includes(searchBar.toLowerCase());

      return (
        isApproved &&
        isPublished &&
        matchesCategory &&
        matchesUser &&
        matchesTag &&
        matchesSearch
      );
    })
    .toSorted(
      (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
    );

  return (
    <>
      <input
        type="text"
        placeholder="Search post titles"
        value={searchBar}
        onChange={(e) => setSearchBar(e.target.value)}
      />

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
        <div id="all-posts-table">
          <div className="posts-row">
            <div className="posts-column">Actions</div>
            <div className="posts-column">Title</div>
            <div className="posts-column">Author</div>
            <div className="posts-column">Date</div>
            <div className="posts-column">Category</div>
            <div className="posts-column">Tags</div>
            {admin.admin_id && <div className="posts-column">Approved</div>}
          </div>

          {filteredPosts.map((post) => (
            <div className="post-wrapper" key={post.id}>
              <div className="posts-row">
                <div id="button-column">
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

                {admin.admin_id && (
                  <div className="posts-column">
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

      <div>Subscriptions</div>
      <div id="all-posts-table">
        <div className="posts-row">
          <div className="posts-column">Actions</div>
          <div className="posts-column">Title</div>
          <div className="posts-column">Author</div>
          <div className="posts-column">Date</div>
          <div className="posts-column">Category</div>
          <div className="posts-column">Tags</div>
          {admin.admin_id && <div className="posts-column">Approved</div>}
        </div>
      </div>

      {subscribed.map((sub, index) => {
        return sub.follower_id === parseInt(token) ? (
          <article id="all-posts-container" key={index}>
            <div className="post-wrapper">
              <div className="posts-row">
                <div id="button-column">
                  {sub.author_id === userId && (
                    <>
                      <button
                        className="icon-button"
                        onClick={() => handleEdit(sub.id)}
                        title="Edit Post"
                      >
                        ⚙️
                      </button>
                      <button
                        className="icon-button"
                        onClick={() => handleDelete(sub.id)}
                        title="Delete Post"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>

                <div className="posts-column">
                  <Link to={`/posts/${sub.id}`}>{sub.title}</Link>
                </div>
                <div className="posts-column">
                  {sub.first_name} {sub.last_name}
                </div>
                <div className="posts-column">
                  {sub.publication_date.slice(0, 10)}
                </div>
                <div className="posts-column">{sub.label}</div>
                <div className="posts-column">{sub.tags}</div>

                {admin.admin_id && (
                  <div className="posts-column">
                    <input
                      type="checkbox"
                      checked={checked[sub.id] || false}
                      onChange={() => {
                        setChecked((prev) => ({
                          ...prev,
                          [sub.id]: !prev[sub.id],
                        }));
                        updatedPostApproval(sub.id);
                      }}
                    />
                    <p>{checked[sub.id] ? "True" : "False"}</p>
                  </div>
                )}
              </div>
            </div>
          </article>
        ) : (
          <div key={index}>No Subscription</div>
        );
      })}
    </>
  );
};
