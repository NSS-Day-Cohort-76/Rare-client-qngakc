import { useEffect, useState } from "react";
import { getMyPosts } from "../../services/postService.js";
import { Link } from "react-router-dom";
import "./myposts.css";

export const MyPost = ({ token }) => {
  const [post, setPost] = useState([]);
  const [orderedMyPosts, setOrderedMyPosts] = useState([]);

  const today = new Date();

  useEffect(() => {
    getMyPosts(token).then(setPost);
  }, [token]);

  useEffect(() => {
    const orderMyPosts = post?.toSorted(
      (a, b) => new Date(a.publication_date) - new Date(b.publication_date)
    );
    setOrderedMyPosts(orderMyPosts);
  }, [post]);

  return (
    <>
      <div>
        <article id="all-posts-container">
          <div id="posts-table">
            <div className="row">
              <div className="column">Title</div>
              <div className="column">Author</div>
              <div className="column">Date</div>
              <div className="column">Category</div>
              <div className="column">Tags</div>
            </div>
            {orderedMyPosts?.map((post) => {
              if (
                post.approved === 1 &&
                new Date(post.publication_date) < today
              ) {
                return (
                  <div className="row" key={post.id}>
                    <div className="column">
                      <Link target="_blank" to={`./posts/${post.id}`}>
                        {post.title}
                      </Link>
                    </div>
                    <div className="column">{post.author}</div>
                    <div className="column">
                      {post.publication_date.slice(0, 10)}
                    </div>
                    <div className="column">{post.category}</div>
                    <div className="column">Tags</div>
                  </div>
                );
              } else {
                return "";
              }
            })}
          </div>
        </article>
      </div>
    </>
  );
};
