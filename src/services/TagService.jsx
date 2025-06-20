export const createTag = (tag) => {
    return fetch(`http://localhost:8088/tags`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tag)
    }).then(res => res.json())
}


export const getAllTags = () => {
    return fetch(`http://localhost:8088/tags`).then((res) => res.json())
}

export const deleteTag = (tagId) => {
    return fetch(`http://localhost:8088/tags/${tagId}`, {
        method: "DELETE",
    })
} 


export const updateTag = (tagId) => {
    return fetch (`http://localhost:8088/tags${tagId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tagId),
    }).then(res => res.json())
}