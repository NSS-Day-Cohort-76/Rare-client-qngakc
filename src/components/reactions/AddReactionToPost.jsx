import { useState } from "react"


export const AddReactionToPost = () => {

    [reactions, setReactions] = useState([])

    const handleClick = () => {
        
    }

    return (
        <div className="reaction-container">
            <button onClick={handleClick}
            className="addReaction">🙂</button>
        </div>
    )
}