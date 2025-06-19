import { useEffect, useState } from "react";
import { displayComments, postComment } from "../../services/commentService.js";
import { useParams } from "react-router-dom";

export const Comment = ({ token }) => {
  const [comment, setComment] = useState([]);
  const [postedComment, setPostedComment] = useState("");
  const [rerender, setRerender] = useState(false);
  const { postId } = useParams();

  useEffect(() => {
    displayComments(postId).then(setComment);
  }, [postId, rerender]);

  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      post_id: parseInt(postId),
      author_id: parseInt(token),
      content: postedComment,
    };
    
    postComment(commentData).then(() => {
      setRerender(!rerender)
    })
  };
  return (
    <>
      <div>
        <div>
          <div className="field">
            <form onSubmit={handleComment}>
              <label className="label">Create a Comment</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Text input"
                  name="content"
                  onChange={(e) => setPostedComment(e.target.value)}
                />
              </div>
              <p className="help">Add a Comment!</p>
              <button type="submit">Save Comment</button>
            </form>
          </div>
          {comment.length > 0 ? (
            comment.map((comments) => (
              <>
                <div key={comments.author_id} className="card">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-left"></div>
                      <div className="media-content">
                        <p className="title is-4">
                          {comments.first_name} {comments.last_name}
                        </p>
                      </div>
                    </div>
                    <div className="content">
                      {comments.content}
                      <br />
                      <time dateTime="2016-1-1"></time>
                    </div>
                  </div>
                </div>
              </>
            ))
          ) : (
            <p>No comments at this moment</p>
          )}
        </div>
      </div>
    </>
  );
};
