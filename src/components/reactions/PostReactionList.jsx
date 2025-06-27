import { useEffect, useState } from "react";
import {
  addNewReactionToPost,
  getPostReactions,
  deletePostReaction
} from "../../services/reactionService";
import "./Reactions.css";
import "../posts/PostDetails.css";

export const PostReactionsList = ({ postId, token }) => {
    const [postReactions, setPostReactions] = useState([]);
    const [userReactionId, setUserReactionId] = useState(null);

    const userId = parseInt(token);

    const refreshReactions = () => {
    getPostReactions(postId)
      .then((data) => {
        setPostReactions(data);

        const found = data.find((r) =>
          r.users?.some((u) => u.id === userId)
        );
        setUserReactionId(found?.id || null);
      })
      .catch(console.error);
  };


    useEffect(() => {
        console.log("Fetching reactions for post:", postId);
        getPostReactions(postId)
            .then(setPostReactions)
            .catch((err) => console.error("Error loading reactions:", err));
    }, [postId]);

    useEffect(() => {
        refreshReactions();
    }, [postId]);

     const handleReact = (reactionId) => {
    if (reactionId === userReactionId) {

      deletePostReaction(postId, userId)
        .then(() => {
          setUserReactionId(null);
          refreshReactions();
        })
        .catch((err) => {
          console.error("Error unreacting:", err);
        });
    } else {

      const newReaction = {
        user_id: userId,
        reaction_id: reactionId,
        post_id: parseInt(postId),
      };

      addNewReactionToPost(newReaction)
        .then(() => {
          setUserReactionId(reactionId);
          refreshReactions();
        })
        .catch((err) => {
          console.error("Error adding reaction:", err);
        });
    }
  };


    return (
    <div>
      {postReactions.length === 0 ? (
        <p>No reactions yet</p>
      ) : (
        <div className="reaction-box">
          {postReactions.map((reaction) => (
            <div className="post-reaction-item" key={reaction.id}>
              <button
                className={`post-reaction-btn ${
                  reaction.id === userReactionId ? "active" : ""
                }`}
                onClick={() => handleReact(reaction.id)}
              >
                {reaction.emoji ? (
                  <span>{reaction.emoji}</span>
                ) : (
                  <img
                    src={reaction.img_url}
                    alt={reaction.label}
                    width={20}
                  />
                )}
              </button>
              <span className="post-reaction-count">{reaction.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
