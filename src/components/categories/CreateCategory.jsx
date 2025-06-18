import { useEffect, useState } from "react";
import { createCategory } from "../../services/categoryService";
import "./Categories.css"


export const CreateNewCategory = ({onCategoryCreated}) => {

    const [category, setCategory] = useState({ label: "" })
    useEffect(()=> {

    })

    const handleSave = (event) => {
        event.preventDefault()
        createCategory(category).then((newCategory) => {
            setCategory({ label: "" })
            if (onCategoryCreated) {
                onCategoryCreated(newCategory)
            }
        })
    }


    return (
    <div className="create-category-form">
        <div className="field">
        <label className="label">Create A Category</label>
        <div className="control">
            <input
            className="input"
            type="text"
            placeholder="Add  Name"
            value={category.label}
            onChange={e => setCategory({ label: e.target.value })}
            />
        </div>
</div>

<div className="field">
  <div className="control">
    <button className="button is-primary" onClick={handleSave}>
      Save Category
    </button>
  </div>
</div>
    </div>
    )
}


