import { useEffect, useState } from "react";
import {
  deleteCategory,
  getAllCategories,
} from "../../services/categoryService";
import { CreateNewCategory } from "./CreateCategory";
import "./Categories.css";
export const AllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);

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
            <CreateNewCategory
              onCategoryCreated={(newCat) =>
                setAllCategories((prev) => [...prev, newCat])
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
