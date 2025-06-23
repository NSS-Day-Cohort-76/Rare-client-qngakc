import { useEffect, useState } from "react"
import { deleteTag, getAllTags, updateTag } from "../../services/TagService"
import { CreateNewTag } from "./CreateTag"
import "./Tags.css"


export const AllTags = () => {

  const [tags, setTags] = useState([]);
  const [editingTag, setEditingTag] = useState(null);
  const [editLabel, setEditLabel] = useState("");

  useEffect(() => {
    getAllTags().then((data) => setTags(data));
  }, []);

  const handleDelete = (tag) => {
    if (window.confirm(`Are you sure you want to delete tag "${tag.label}"?`)) {
      deleteTag(tag.id).then(refreshTags).catch(err => alert(err.message));
    }
  }

  const handleEditClick = (tag) => {
    setEditingTag(tag)
    setEditLabel(tag.label)
  }

  const handleCancelEdit = () => {
    setEditingTag(null)
    setEditLabel("")
    refreshTags()
  }

  const handleUpdateSubmit = (event) => {
  event.preventDefault()

  if (editLabel.trim() === "") return

  updateTag(editingTag.id, { label: editLabel }).then(() => {
   
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag.id === editingTag.id ? { ...tag, label: editLabel } : tag
      )
    )

    setEditingTag(null)
    setEditLabel("")
  }).catch((err) => {
    alert("Failed to update tag: " + err.message)
  })
}


const refreshTags = () => getAllTags().then(setTags)

return (
  <div className="tags-table">
    <div className="tags-row">

      <div className="tags-column">
        <h2 className="title is-2">Tags</h2>
        {tags.map((tag) => (
          <div className="map-item" key={tag.id}>#<strong>{tag.label}</strong>
            <div className="btn-container">
              <button className="button is-small is-info mr-2" onClick={() => handleEditClick(tag)}>Edit</button>
              <button className="button is-small is-danger"
                onClick={() => handleDelete(tag)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="tags-column">
        <div className="create-tag">
          {!editingTag && (
            <CreateNewTag onTagCreated={(newTag) => setTags(prev => [...prev, newTag])} />
          )}

          {editingTag && (
            <div className="create-tag">
              <h3 className="title is-4">Edit Tag</h3>

              <form>
                <div className="field">
                  <input
                    className="input"
                    type="text"
                    value={editLabel}
                    onChange={(event) => setEditLabel(event.target.value)}
                    placeholder="Edit tag label"
                  />
                </div>

                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-primary" type="button" onClick={handleUpdateSubmit}>
                      Update Tag
                    </button>
                  </div>
                  <div className="control">
                    <button
                      className="button is-light"
                      type="button"
                      onClick={handleCancelEdit}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

    </div>
  </div>


)
}