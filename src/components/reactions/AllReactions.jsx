import { useState, useEffect } from "react"
import { getAllReactions } from "../../services/reactionService"
import { CreateReaction } from "./CreateReaction";
import "./Reactions.css"

export const AllReactions = () => {

    const [reactions, setReactions] = useState([])

    useEffect(() => {
        getAllReactions().then((data) => setReactions(data));
    }, []);



    return (
        <div className="reactions-table">
            <div className="h2-box">

            <h2 className="title is-2">Reactions</h2>
            </div>
            
            <div className="reactions-row">

                <div className="reactions-column">
                    {reactions.map((reaction) => (
                        <div className="map-item" key={reaction.id}>
                            <p><strong>{reaction.label}</strong></p>
                            {reaction.emoji ?
                                <span className="Emoji_reaction_manage" alt={reaction.label}>{reaction.emoji}
                                </span> : <img className="img-reaction-manage" src={reaction.img_url} alt="reaction.label" />}
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