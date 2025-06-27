import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { getPostById } from "../../services/postService";
import "./PostDetails.css";
import { getAllTags } from "../../services/TagService.jsx";
import { getAllCategories } from "../../services/categoryService.js";
import { AddReactionToPost } from "../reactions/AddReactionToPost.jsx";
import { PostReactionsList } from "../reactions/PostReactionList.jsx";
import { getPostReactions } from "../../services/reactionService.jsx";


export const PostDetails = ({ token }) => {
  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState([]);
  const { postId } = useParams();
  const postCategory = category.find((c) => c.id === post.category_id);
  const [postReactions, setPostReactions] = useState([]);

  const refreshReactions = () => {
    getPostReactions(postId).then(setPostReactions).catch(console.error);
  };

  useEffect(() => {
    refreshReactions();
  }, [postId]);


  useEffect(() => {
    getPostById(postId).then(setPost);
  }, [postId]);

  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  useEffect(() => {
    getAllCategories().then(setCategory);
  }, []);

  useEffect(() => {
    getPostById(postId).then(setPost);
    refreshReactions();
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
      <div id="tags">
        <strong>Tags:</strong>{" "}
        {post.tags && post.tags.length > 0
          ? post.tags.map((tag) => tag.label).join(", ")
          : "None"}
      </div>
      <div id="category">
        <strong>Category:</strong> {postCategory?.label || "Unknown"}
      </div>
      <div className="reactions-post-container">
        <PostReactionsList postId={postId}  postReactions={postReactions} refreshReactions={refreshReactions}/>
        <AddReactionToPost postId={postId} token={token} refreshReactions={refreshReactions} />
      </div>
      <button>
        <Link to={`/posts/${postId}/comments`}>Comments</Link>
      </button>
      <Outlet />
    </div>
  );
};
