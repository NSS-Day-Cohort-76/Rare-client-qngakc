import { useEffect, useState } from "react"
import { getAllTags } from "../services/TagService"

export const TagList = () => {

const [tags, setTags] = useState([])

useEffect(() => {
 getAllTags().then((data) => setTags(data))   
}, [])

    return (
        <div className="main-container">
            <div className="tags-list">
                <ul>
                {tags.map((tag) => (
                    <li key={tag.id}>{tag.label}</li>
                ))}
                </ul>
            </div>
        </div>
    )
}