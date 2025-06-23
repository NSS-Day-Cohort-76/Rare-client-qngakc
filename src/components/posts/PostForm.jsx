import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePostForm.css";
import { createPost } from "../../services/postService.js";
import { getAllCategories } from "../../services/categoryService.js";
import { getAllTags } from "../../services/TagService.jsx";

export const PostForm = ({ token }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [headerImageUrl, setHeaderImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch((err) => console.error("Failed to load categories:", err));

    getAllTags()
      .then(setTags)
      .catch((err) => console.error("Failed to load tags:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      content,
      category: parseInt(category),
      header_image_url: headerImageUrl,
      author_id: token,
      tag_ids: selectedTags,
    };

    createPost(newPost)
      .then((createdPost) => {
        if (createdPost?.post_id) {
          navigate(`/posts/${createdPost.post_id}`);
        } else {
          console.warn("Post created but no ID returned.");
          navigate("/posts");
        }
      })
      .catch((error) => console.error("Failed to create a post:", error));
  };

  return (
    <div className="form-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>

        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Header Image Url:
          <input
            type="text"
            value={headerImageUrl}
            onChange={(e) => setHeaderImageUrl(e.target.value)}
            placeholder="Optional"
          />
        </label>
        <label>Tags:</label>
        <div>
          {tags.map((tag) => (
            <label key={tag.id} style={{ display: "block" }}>
              <input
                type="checkbox"
                value={tag.id}
                checked={selectedTags.includes(tag.id)}
                onChange={(e) => {
                  const tagId = parseInt(e.target.value);
                  setSelectedTags((prev) =>
                    e.target.checked
                      ? [...prev, tagId]
                      : prev.filter((id) => id !== tagId)
                  );
                }}
              />
              {tag.label}
            </label>
          ))}
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};
