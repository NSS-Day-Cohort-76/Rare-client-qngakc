export const getAllReactions = () => {
    return fetch(`http://localhost:8088/reactions`).then((res) => res.json())
}

export const createNewReaction = (reaction) => {
    return fetch(`http://localhost:8088/reactions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reaction)
    }).then(res => res.json())
}

export const deleteReaction = (reactionId) => {
    return fetch(`http://localhost:8088/reactions/${reactionId}`, {
        method: "DELETE",
    })
} 


export const addNewReactionToPost = (reaction) => {
    return fetch('http://localhost:8088/PostReactions',{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reaction)
    }).then(res => res.json())
}