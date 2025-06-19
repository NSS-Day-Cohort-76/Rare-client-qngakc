import { useEffect, useState } from "react"
import "./AllPosts.css"
import { Link } from "react-router-dom";
import { getAllPosts } from "../../services/postService.js";


export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [orderedPosts, setOrderedPosts] = useState([]);

    const today = new Date();
    useEffect(() => {
        getAllPosts().then(setAllPosts)
    }, [])

    useEffect(() => {
        const orderPosts = allPosts?.toSorted(
      (a, b) => new Date(a.publication_date) - new Date(b.publication_date)
    );
        setOrderedPosts(orderPosts)
    }, [allPosts])
    return (
    <article id="all-posts-container">
        <div id="posts-table">
            <div className ="row">
                <div className="column">
                    Title
                </div>
                <div className="column">
                    Author
                </div>
                <div className="column">
                    Date
                </div>
                <div className="column">
                    Category
                </div>
                <div className="column">
                    Tags
                </div>
            </div>
            {orderedPosts?.map((post) => {
                if (post.approved === 1 && new Date(post.publication_date) < today) 
                    {return (
            <div className ="row" key={post.id}>
            <div className="column">
                <Link target="_blank" to={`/posts/${post.id}`}>{post.title}</Link> 
            </div>
                        <div className="column">
                {post.author}
            </div>
                        <div className="column">
                {post.publication_date}
            </div>
                        <div className="column">
                {post.category}
            </div>
                        <div className="column">
                Tags
            </div>
        </div>
                )}
            })}
        </div>
        
    </article>
    )   
}