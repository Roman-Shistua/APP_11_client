import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PopularPosts } from "../components/PopularPosts"
import { PostItem } from "../components/PostItem"
import {getAllPosts} from "../redux/features/post/postSlice"


export const MainPage = () => {

    const dispatch = useDispatch()
    const { posts, popularPosts } = useSelector(state => state.post)
    
    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if(!posts.length) {
        return (
            <div>Постов не существует.</div>
        )
    }

    return (
        <div>
            <div>
                <div>
                    {posts?.map((post, index) => (
                        <PostItem key={index} post={post}/>
                    ))}
                </div>
            </div>
            <div>
                <div>Популярное</div>

                {
                    popularPosts?.map(
                        (post, index) => <PopularPosts key={index} post={post}/>)
                }
                {/* <PopularPosts />
                <PopularPosts />
                <PopularPosts />
                <PopularPosts />
                <PopularPosts /> */}
            </div>
        </div>
    )
}