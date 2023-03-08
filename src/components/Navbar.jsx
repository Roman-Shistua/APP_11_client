import classes from './Navbar.module.css'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export const Navbar = () => {

    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch()
    const activeStyles = {
        color: 'white',
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Вы вышли из системы')
    }

    return (
        <div className={classes.inner}>
            <span>E</span>
            {isAuth && (
                <ul className={classes.menu}>
                    <li><NavLink className={classes.link}
                        href="/"
                        to={'/'}
                        style={({ isActive }) => isActive ? activeStyles : undefined}>Главная</NavLink>
                    </li>
                    <li><NavLink className={classes.link}
                        href="/"
                        to={'/posts'}
                        style={({ isActive }) => isActive ? activeStyles : undefined}>Мои посты</NavLink>
                    </li>
                    <li><NavLink className={classes.link}
                        href="/"
                        to={'/new'}
                        style={({ isActive }) => isActive ? activeStyles : undefined}>Добавить пост</NavLink>
                    </li>
                </ul>
            )}
            <div>
                {isAuth ? <button onClick={logoutHandler}>Выйти</button> : <Link to={'/Login'}>Войти</Link>}
            </div>
        </div>
    )
}