export const createCategory = (category) => {
  return fetch(`http://localhost:8088/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  }).then((res) => res.json());
};

export const getAllCategories = () => {
  return fetch(`http://localhost:8088/categories`).then((res) => res.json());
};

export const deleteCategory = (pk) => {
  return fetch(`http://localhost:8088/categories/${pk}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateCategory = (catId, catData) => {
  return fetch(`http://localhost:8088/categories/${catId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(catData),
  }).then(res => {
    if (!res.ok) {
      throw new Error("Failed to update tag")
    }
    return res.status === 204 ? null : res.json()
  })

}