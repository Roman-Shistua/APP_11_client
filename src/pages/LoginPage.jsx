import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import classes from './LoginPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    useEffect(() => {
        if (status) toast(status)
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(loginUser({ username, password }))
            setPassword('')
            setUsername('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={e => e.preventDefault()} className={classes.form}>
            <h1 className={classes.title}>Авторизация</h1>
            <label className={classes.username}>
                Username:
                <input type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder='Username'
                    className=''
                />
            </label>
            <label>
                Password:
                <input type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Password'
                    className=''
                />
            </label>
            <div className={classes.box}>
                <button type='submit' onClick={handleSubmit}>Войти</button>
                <Link to='/register'>Нет аккаунта ?</Link>
            </div>

        </form>
    )
}