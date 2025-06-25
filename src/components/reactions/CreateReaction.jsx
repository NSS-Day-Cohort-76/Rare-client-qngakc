import { useState } from "react"
import { createNewReaction } from "../../services/reactionService"
import "./Reactions.css"

export const CreateReaction = ({onReactionCreated}) => {

    const [reaction, setReaction] = useState({ label: "", emoji: "", img_url: ""})
    const handleSave = (event) => {
        event.preventDefault()
        createNewReaction(reaction).then((newReaction) => {
            setReaction({label:"", emoji:"", img_url:""})
            if (onReactionCreated) {
                onReactionCreated(newReaction)
            }
        })
    }

    return (
        <div className="create-reaction-form">
            <div className="field">
                <label className="label">Create New Reaction</label>
                <div className="control">
                    <input className="input"
                        type="text"
                        placeholder="Add Reaction Name"
                        value={reaction.label}
                        onChange={event => setReaction({ ...reaction, label: event.target.value })} />
                </div>
            </div>
            <div className="field">
                <label className="label">emoji (optional)</label>
                <div className="control">
                    <input className="input"
                        type="text"
                        placeholder="Paste Emoji Here"
                        value={reaction.emoji}
                        onChange={event => setReaction({ ...reaction, emoji: event.target.value })} />
                </div>
            </div>
            <div className="field">
                <label className="label">URL Link</label>
                <div className="control">
                    <input className="input"
                        type="text"
                        placeholder="Add Image URL"
                        value={reaction.img_url}
                        onChange={event => setReaction({ ...reaction, img_url: event.target.value })} />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-primary" onClick={handleSave}>
                        Save Tag
                    </button>
                </div>
            </div>

        </div>
    )


}