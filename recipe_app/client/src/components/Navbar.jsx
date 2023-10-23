import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'
import home from '../images/home.png';
import create from '../images/create.png';
import login from '../images/login.png';
import logoutImg from '../images/logoutImg.png';
import saved from '../images/saved.png';

const Navbar = () => {

    const [cookies, setCookies] = useCookies(['access_token']);

    const navigate = useNavigate();

    const logout = () => {
        setCookies('access_token', '');
        window.localStorage.removeItem('userID');
        navigate('/auth');
    }

    return (
        <div className='navbar'>
            <NavLink to='/' activeClassName='active'><img src={home} alt="Home" /></NavLink>
            <NavLink to='/create-recipe' activeClassName='active'><img src={create} alt="Create" /></NavLink>
            {
                !cookies.access_token
                    ?
                    (
                        <NavLink to='/auth' activeClassName='active'><img src={login} alt="Login" /></NavLink>
                    )
                    :
                    (
                        <>
                            <NavLink to='/saved-recipes' activeClassName='active'><img src={saved} alt="Saved" /></NavLink>
                            <img id='logImg' src={logoutImg} alt="Logout" onClick={logout} />
                        </>
                    )
            }
        </div>
    )
}

export default Navbar