import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createPost } from "../redux/features/post/postSlice"
import classes from "./AddPostPage.module.css"

export const AddPostPage = () => {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('text', text)
            data.append('image', image)
            dispatch(createPost(data))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const clearFormHandler = () => {
        setText('')
        setTitle('')
    }

    return (
        <form onSubmit={e => e.preventDefault()}>
            <label>
                Прикрепить изображение:
                <input
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                />
            </label>
            <div className={classes.img}>
                {image &&
                    <img src={URL.createObjectURL(image)} alt="image" />
                }
            </div>
            <label>
                Заголовок поста:
                <input type="text"
                // value
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Заголовок" />
            </label>
            <label>
                Текст поста:
                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Текст поста" />
            </label>
            <div>
                <button onClick={submitHandler}>Добавить</button>
                <button onClick={clearFormHandler}>Отменить</button>
            </div>
        </form>
    )
}
