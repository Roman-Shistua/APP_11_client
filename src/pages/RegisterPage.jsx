import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './RegisterPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice'
import {toast} from 'react-toastify'


export const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {status} = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(status) toast(status)
        if(isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(registerUser({ username, password }))
            setPassword('')
            setUsername('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={e => e.preventDefault()} className={classes.form}>
            <h1 className={classes.title}>Регистрация</h1>
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
                <button onClick={handleSubmit} type='submit'>Подтвердить</button>
                <Link to='/login'>Уже зарегистрированы ?</Link>
            </div>
        </form>
    )
}