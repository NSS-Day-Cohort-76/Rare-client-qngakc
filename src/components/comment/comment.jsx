import { useEffect, useState } from "react";
import {
  displayComments,
  updateComment,
  postComment,
  deleteComment,
} from "../../services/commentService.js";
import { Link, useParams } from "react-router-dom";

export const Comment = ({ token }) => {
  const [comment, setComment] = useState([]);
  const [postedComment, setPostedComment] = useState("");
  const [rerender, setRerender] = useState(false);
  const [editComment, setEditComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const { postId } = useParams();
  const [isModalActive, setIsModalActive] = useState(false);

  const openModal = () => setIsModalActive(true);
  const closeModal = () => setIsModalActive(false);

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
    console.log(commentData);

    postComment(commentData).then(() => {
      setRerender(!rerender);
    });
  };
  const handleUpdateComment = (e) => {
    e.preventDefault();

    const commentData = {
      content: editComment,
    };

    updateComment(commentData, editCommentId).then(() => {
      setRerender(!rerender);
      closeModal();
    });
  };

  const handleDelete = (e) => {
    deleteComment(e).then(() => {
      setRerender(!rerender);
    });
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
                        <button
                          className="button is-primary"
                          onClick={() => {
                            openModal();
                            setEditCommentId(comments.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="button"
                          onClick={() => {
                            handleDelete(comments.id);
                          }}
                        >
                          Delete
                        </button>
                        <form
                          onSubmit={(e) => {
                            handleUpdateComment();
                            setRerender(!rerender);
                          }}
                        >
                          <div
                            className={`modal ${
                              isModalActive ? "is-active" : ""
                            }`}
                          >
                            <div
                              className="modal-background"
                              onClick={closeModal}
                            ></div>
                            <div className="modal-card">
                              <header className="modal-card-head">
                                <p className="modal-card-title">Edit Item</p>
                                <button
                                  className="delete"
                                  aria-label="close"
                                  onClick={closeModal}
                                ></button>
                              </header>
                              <section className="modal-card-body">
                                <input
                                  placeholder="New Content Here..."
                                  onChange={(e) =>
                                    setEditComment(e.target.value)
                                  }
                                  required
                                ></input>
                              </section>
                              <footer className="modal-card-foot">
                                <button
                                  className="button is-success"
                                  onClick={closeModal}
                                >
                                  Save changes
                                </button>
                                <button className="button" onClick={closeModal}>
                                  Cancel
                                </button>
                              </footer>
                            </div>
                          </div>
                        </form>
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
