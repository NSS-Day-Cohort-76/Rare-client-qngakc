import { useEffect, useState } from "react"
import { addNewReactionToPost, getAllReactions, getPostReactions } from "../../services/reactionService"
import "./AddReaction.css"

export const AddReactionToPost = ({postId, token, refreshReactions}) => {
    const [reactions, setReactions] = useState([])
    const [PostReactions, setPostReactions] = useState([])

    const [isPopupOpen, setIsPopupOpen] = useState(false)

    useEffect(() => {
        getAllReactions().then((data) => setReactions(data))
    }, [])

    useEffect(() => {
        console.log("Fetching reactions for post:", postId)
        getPostReactions(postId)
            .then(setPostReactions)
            .catch((err) => console.error("Error loading reactions:", err))
    }, [postId])

    useEffect(() => {
        refreshReactions()
    }, [postId])


  const handleReact = (reactionId) => {
  const newReaction = {
    user_id: parseInt(token),
    reaction_id: reactionId,
    post_id: parseInt(postId),
  };

  addNewReactionToPost(newReaction)
    .then(() => {
      setIsPopupOpen(false)
      if (refreshReactions) {
        refreshReactions()
      }
    })
    .catch((err) => {
      console.error("Error adding reaction:", err);
    });
}


    return (
        <div className="reaction-box">
            
                <button className="button" onClick={() => setIsPopupOpen(true)}><img src="https://ik.imagekit.io/b0xq0alh4/rare-emoticon.png?updatedAt=1750955833725" alt="rare-emoticon"/>+</button>

            {isPopupOpen && (
                <div className="reaction-overlay">
                    <div className="react-to-post-popup">
                        <h2>React to Post</h2>
                        <button
                            className="close"
                            onClick={() => setIsPopupOpen(false)}
                        >
                            &times;
                        </button>
                        <div className="reaction-popup">
                            {reactions.length === 0 ? (
                                <p>Loading reactions...</p>
                            ) : (
                                <div className="reaction-list">
                                    {reactions.map((reaction) => (
                                        <button key={reaction.id} className="reaction-btn" onClick={() => handleReact(reaction.id)}>
                                            {reaction.emoji ? (
                                                <span>{reaction.emoji}</span>
                                            ) : (
                                                <img
                                                    src={reaction.img_url}
                                                    alt={reaction.label}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}