import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom"
import { createTag } from "../services/TagService";

export const CreateNewTag = () => {

    const [tag, setTag] = useState({ label: "" })
    const navigate = useNavigate()

    useEffect(()=> {

    })

    const handleSave = (event) => {
          event.preventDefault()
          createTag(tag).then(() => {
            navigate("/TagList")
        })

    }




    return (
    <div className="main-container">
        <div className="form-group">
            <h2>Create A Tag</h2>
              <input type="text"
                        className="form-control"
                        placeholder={`Add Tag Name`}
                        defaultValue=""
                        onChange={(event) => {
                            const copy = { ...tag}
                            copy.title = event.target.value
                            setTag(copy)
                        }}>
                    </input>
        </div>
        <div className="save-btn">
            <button className="save-btn" onClick={handleSave}>Save Tag</button>
        </div>
    </div>
    )
}