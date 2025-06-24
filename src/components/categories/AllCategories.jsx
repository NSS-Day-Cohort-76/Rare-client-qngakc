import { useEffect, useState } from "react";
import {
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../../services/categoryService";
import { CreateNewCategory } from "./CreateCategory";
import "./Categories.css";

export const AllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null)
  const [editLabel, setEditLabel] = useState("")

  useEffect(() => {
    getAllCategories().then(setAllCategories);
  }, []);

  const handleDelete = (e) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(parseInt(e.target.value)).then(() => {
        window.location.reload();
      });
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category)
    setEditLabel(category.label)
  }


  const handleCancelEdit = () => {
    setEditingCategory(null)
    setEditLabel("")
    refreshCategories()
  }


  const handleUpdateSubmit = (event) => {
    event.preventDefault()

    if (editLabel.trim() === "") return

    updateCategory(editingCategory.id, { label: editLabel }).then(() => {

      setAllCategories((prevCats) =>
        prevCats.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, label: editLabel } : cat
        )
      )

      setEditingCategory(null)
      setEditLabel("")
    }).catch((err) => {
      alert("Failed to update tag: " + err.message)
    })
  }

  const refreshCategories = () => getAllCategories().then(setAllCategories)

  return (
    <div className="tags-table">

      <div className="tags-row">

        <div className="tags-column">
          <h2 className="title is-2">Categories</h2>
          {allCategories.map((cat) => (
            <div className="map-item" key={cat.id}>
              <strong>{cat.label}</strong>
              <div className="btn-container">
                <button className="button is-small is-info mr-2">Edit</button>
                <button
                  className="button is-small is-danger"
                  value={cat.id}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="tags-column">
          <div className="create-tag">
            {!editingCategory && (
              <CreateNewCategory
                onCategoryCreated={(newCat) =>
                  setAllCategories((prev) => [...prev, newCat])
                }
              />
            )}

            {editingCategory && (
              <div className="create-category">
                <h3 className="title is=4">Edit Tag</h3>

                <form>
                  <div className="field">
                    <input className="input"
                      type="text"
                      value={editLabel}
                      onChange={(event) => setEditLabel(event.target.value)}
                      placeholder="Edit Category Label"
                    />
                  </div>

                  <div className="field is-grouped">
                    <div className="control">
                      <button className="button is-primary" type="button" onClick={handleUpdateSubmit}>
                        Update Category
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
              )
            }
          </div>
        </div>
      
      </div>

    </div>
  );
};
