import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { getPostById } from "../../services/postService";
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
      <button><Link to={`/posts/${postId}/comments`}>Comments</Link></button>
      <Outlet/>
    </div>
  );
};
