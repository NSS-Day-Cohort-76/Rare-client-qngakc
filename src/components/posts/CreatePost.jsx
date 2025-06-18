import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService.js";
import "./CreatePostForm.css"
console.log("✅ CreatePost mounted!");

export const CreatePost = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [headerImageUrl, setHeaderImageUrl] = useState("");
  console.log("CreatePost currentUser:", currentUser)
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
        title,
        content,
        category_id: category,
        header_image_url: headerImageUrl,
        author_id: currentUser.id
    };

    createPost(newPost)
      .then((createdPost) => navigate(`/posts/${createdPost.id}`))
      .catch((error) => console.error("Failed to create a post:", error));
  };

  return <h1 style={{ padding: "2rem" }}>CreatePost component loaded!</h1>;
}