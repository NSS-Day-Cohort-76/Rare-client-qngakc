import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost} from "../../services/postService";
import { getAllCategories } from "../../services/categoryService.js";
import { getAllTags } from "../../services/TagService.jsx";

export const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [headerImageUrl, setHeaderImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId).then((post) => {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category_id);
      setHeaderImageUrl(post.image_url || "");

    const tagIds = post.tags?.map(tag => tag.id) || [];
    setSelectedTags(tagIds)
  });

    getAllCategories().then(setCategories);
  }, [postId]);

  useEffect(() => {
    getAllTags().then(setTags)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedPost = {
      title: title,
      content: content,
      category_id: parseInt(category),
      header_image_url: headerImageUrl,
      tag_ids: selectedTags,
    };

    updatePost(postId, updatedPost)
      .then(() => {
        navigate(`/posts/${postId}`);
      })
      .catch((error) => {
        console.error("Failed to update post:", error);
      });
  };

  return (
    <div className="form-container">
      <h2>Edit Post</h2>
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
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Header Image URL:
          <input
            type="text"
            value={headerImageUrl}
            onChange={(e) => setHeaderImageUrl(e.target.value)}
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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
