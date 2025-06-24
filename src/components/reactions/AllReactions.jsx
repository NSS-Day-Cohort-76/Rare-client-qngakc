import { useState, useEffect } from "react"
import { getAllReactions } from "../../services/reactionService"

export const AllReactions = () => {

    const [reactions, setReactions] = useState([])

    useEffect(() => {
        getAllReactions().then((data) => setReactions(data));
    }, []);



    return (
        <div className="reactions-table">
            <div className="reactions-row">

                <div className="reactions-column">
                    <h2 className="title is-2">Reactions</h2>
                    {reactions.map((reaction) => (
                        <div className="map-item" key={reaction.id}>
                            <p>{reaction.label}</p>
                            <img src={reaction.image_url} alt={reaction.label} /></div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}