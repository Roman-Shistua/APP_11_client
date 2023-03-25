import { useEffect, useState, useCallback } from "react"
import { AiFillEye, AiOutlineMessage } from "react-icons/ai"
import Moment from "react-moment"
import { Link, useParams } from "react-router-dom"
import axios from "../utils/axios"
import classes from "./PostPage.module.css"

export const PostPage = () => {
    

    const [post, setPost] = useState(null)
    const params = useParams()
    // const {id} = useParams()

    
    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])



    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    if (!post) {
        return <div>Постов не существует.</div>
    }
// debugger
    return (
        <div>
         <Link to={'/'}><button>Назад</button></Link>   
         <button onClick={fetchPost}>кнопка</button>
            <div>
                <div> 
                    <div className={classes.img}>{post?.imgUrl &&
                        (<img
                            src={`http://localhost:3002/${post.imgUrl}`}
                            alt='img' />)}
                    </div>
                </div>
                <div>
                    <div>{post.username}</div>
                    <div><Moment date={post.createdAt} format={'D MMM YYYY'} /></div>
                </div>
                <div>{post.title}</div>
                <p>{post.text}</p>
                <div>
                    <button>
                        <AiFillEye />
                        <span>{post.views}</span>
                    </button>
                    <button>
                        <AiOutlineMessage />
                        <span>{post.comments?.length || 0}</span>
                    </button>
                </div>
                <div>COMMENTS</div>
            </div>
        </div>
    )
}