import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postServices.js";
import "./CreatePostForm.css"

export const NewPost = ({ token }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [headerImageUrl, setHeaderImageUrl] = useState("");
 
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
        title,
        content,
        category: parseInt(category),
        header_image_url: headerImageUrl,
        author_id: token.id
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
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
