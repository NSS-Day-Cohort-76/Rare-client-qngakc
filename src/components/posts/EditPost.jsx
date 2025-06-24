import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost} from "../../services/postService";
import { getAllCategories } from "../../services/categoryService.js";

export const EditPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [headerImageUrl, setHeaderImageUrl] = useState("");
    const [categories, setCategories] = useState([]);

    const { postId } = useParams();
    const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId).then((post) => {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category_id);
      setHeaderImageUrl(post.image_url || "");
    });

    getAllCategories().then(setCategories);
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPost = {
      title: title,
      content: content,
      category_id: parseInt(category),
      header_image_url: headerImageUrl,
    };

    updatePost(postId, updatedPost).then(() => {
      navigate(`/posts/${postId}`);
    })
    .catch((error) => {
        console.error("Failed to update post:", error)
    })
  };

  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <label>Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </label>

        <label>Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </label>

        <label>Header Image URL:
          <input type="text" value={headerImageUrl} onChange={(e) => setHeaderImageUrl(e.target.value)} />
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
