import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useSelector,useDispatch } from 'react-redux';
import { userInfo,logout } from '../../features'



const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const user = useSelector(userInfo)
    const dispatch = useDispatch()

    return (
        <header>
            <div className=" container">
                <nav className="navbar">
                    <div>
                        <h1 className="logo">RMart</h1>
                    </div>
                    <div>
                        <ul className={menu ? "nav__list" : "nav-list"} onClick={() => { setMenu(false) }}>
                            <li className="nav-item"><Link className="nav-link" to="/home" >Home</Link></li>
                            {user.accessToken && <li className="nav-item"><Link className="nav-link" to="/cart" >Cart</Link></li>}
                            {user.accessToken && <li className="nav-item"><Link className="nav-link" to="/wishlist" >Wishlist</Link></li>}
                            {user.accessToken && <li className="nav-item"><Link className="nav-link" to="/profile" >Profile</Link></li>}
                            {user.accessToken && <li className="nav-item"><button className="btn-logout" onClick={()=>{dispatch(logout())}}>Logout</button></li>}
                            {!user.accessToken && <li className="nav-item"><Link className="nav-link" to="/login" >Login</Link></li>}
                            {!user.accessToken && <li className="nav-item"><Link className="nav-link" to="/signup" >Signup</Link></li>}
                            {menu}
                        </ul>
                    </div>
                    <div className="bars" onClick={() => { setMenu(!menu) }}>
                        {menu ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
                    </div>
                </nav>

            </div>
        </header>
    )
}

export default Navbar