// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { getSingleComment } from "../../services/commentService.js"

// export const EditComment = () => {
//   const [editComment, setEditComment] = useState([])
//   const {commentId} = useParams()

//   useEffect(() => {
//       getSingleComment(commentId).then(setEditComment)
//   }, [commentId])

//   return (<>
//     {editComment.map((comment) => {
//       return (
//         <div>{comment.id}</div>
//       )
//     })}
//   </>)
// }