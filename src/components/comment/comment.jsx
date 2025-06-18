import { useEffect, useState } from "react"

export const Comment = () => {
  const [comment, setComment] = useState([])

  useEffect(() => [
    displayComments().then(setComment)
  ], [])


  
}