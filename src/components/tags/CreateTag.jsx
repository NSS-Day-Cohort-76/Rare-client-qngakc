import { useEffect, useState } from "react";
import { createTag } from "../../services/TagService";

export const CreateNewTag = ({onTagCreated}) => {

    const [tag, setTag] = useState({ label: "" })
    useEffect(()=> {

    })

    const handleSave = (event) => {
        event.preventDefault()
        createTag(tag).then((newTag) => {
            setTag({ label: "" })
            if (onTagCreated) {
                onTagCreated(newTag)
            }
        })
    }



    return (
    <div className="create-tag-form">
        <div className="field">
        <label className="label">Create A Tag</label>
        <div className="control">
            <input
            className="input"
            type="text"
            placeholder="Add Tag Name"
            value={tag.label}
            onChange={e => setTag({ label: e.target.value })}
            />
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