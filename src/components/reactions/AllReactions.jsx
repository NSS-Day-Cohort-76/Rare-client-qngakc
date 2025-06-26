import { useState, useEffect } from "react"
import { deleteReaction, getAllReactions } from "../../services/reactionService"
import { CreateReaction } from "./CreateReaction";
import "./Reactions.css"

export const AllReactions = () => {

    const [reactions, setReactions] = useState([])

    useEffect(() => {
        getAllReactions().then((data) => setReactions(data));
    }, []);


    const handleDelete = (reaction) => {
        if (window.confirm(`Are you sure you want to delete reaction"${reaction.label}"?`)) {
            deleteReaction(reaction.id).then(refreshReactions).catch(err => alert(err.message))
        }
    }

    const refreshReactions = () => getAllReactions().then(setReactions)
    return (
        <div className="reactions-table">
            <div className="h2-box">

                <h2 className="title is-2">Reactions</h2>
            </div>

            <div className="reactions-row">

                <div className="reactions-column">
                    {reactions.map((reaction) => (
                        <div className="map-item" key={reaction.id}>
                            {reaction.emoji ?
                                <span className="Emoji_reaction_manage" alt={reaction.label}>{reaction.emoji}
                                </span> : <img className="img-reaction-manage" src={reaction.img_url} alt="reaction.label" />}
        
                            <p><strong>{reaction.label}</strong></p>
                                {/* <button className="button is-small is-info mr-2" onClick={() => handleEditClick(tag)}>Edit</button> */}
                                <button className="button is-small is-danger"
                                    onClick={() => handleDelete(reaction)}>Delete</button>
                        
                        </div>
                    ))}
                </div>

                <div className="create-column">
                    <CreateReaction />
                </div>
            </div>
        </div>
    )
}