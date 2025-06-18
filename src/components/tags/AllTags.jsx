import { useEffect, useState } from "react"
import { getAllTags } from "../../services/TagService"
import { CreateNewTag } from "./CreateTag"
import "./Tags.css"

export const AllTags = () => {

const [tags, setTags] = useState([])

useEffect(() => {
 getAllTags().then((data) => setTags(data))   
}, [])

    return (
            <div className="tags-table">
                <div className="tags-row">
                    <div className="tags-column">

                   
                    <div className="tags-column">
                    <h2 class="title is-2">Tags</h2>
                    {tags.map((tag) => (
                        <div className="map-item" key={tag.id}>#<strong>{tag.label}</strong>
                        <div className="btn-container">
                         <button className="button is-small is-info mr-2">Edit</button>
                         <button className="button is-small is-danger">Delete</button>
                        </div>
                        </div>
                    ))}
                    </div>

                    </div>

                    <div className="tags-column">
                            <div className="create-tag">
                                <CreateNewTag onTagCreated={(newTag) => setTags(prev => [...prev, newTag])} />
                            </div>
                    </div>

                </div>
            </div>
    )
}