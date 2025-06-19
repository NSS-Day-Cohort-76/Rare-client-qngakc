import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/postServices.jsx"
import "./PostDetails.css";
export const PostDetails = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    getPostById(postId).then(setPost);
  }, [postId]);
  return (
    <div id="post-details-container">
      <h1> {post.title} </h1>
      <div id="post-img">
        <img src={post.image_url} alt={post.title} />
      </div>
      <div id="post-details">
        <div id="post-author">
          By {post.first_name} {post.last_name}
        </div>
        <div id="post-date">{post.publication_date}</div>
      </div>
      <div id="post-content">{post.content}</div>
    </div>
  );
};
