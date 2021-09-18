import { useState, useRef } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import './Navbar.css'
import { useSelector, useDispatch } from 'react-redux';
import { userInfo, logout, emptyWishlist, getProducts } from '../../features'
import Profile from '../profile/Profile'
import ChangePassword from '../profile/ChangePassword'


const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false)
    const user = useSelector(userInfo)
    const match = useRouteMatch("/home")
    const dispatch = useDispatch()
    const searchValue = useRef(null);
    const logoutUser = () => {
        dispatch(logout())
        dispatch(emptyWishlist())
    }

    const searchProduct = () => {
        dispatch(getProducts({ search: searchValue.current.value }))
    }

    const search = () => {

        return match && <div className="search_place">
            <input className="search_bar" ref={searchValue} type="text" placeholder="Search for products,brands and more" onChange={searchProduct} />
            <span className="search"><i className="fas fa-search"></i></span>
        </div>
    }

    return (
        <header>
            <div className=" container">
                <nav className="navbar">
                    <div>
                        <h1 className="logo">RMart</h1>
                    </div>
                    {search()}
                    <div>
                        <ul className={menu ? "nav__list" : "nav-list"} onClick={() => { setMenu(false) }}>
                            <li className="nav-item"><Link className="nav-link" to="/home" >Home</Link></li>
                            {user.accessToken && <li className="nav-item"><Link className="nav-link" to="/wishlist" >Wishlist</Link></li>}
                            {user.accessToken && <li className="nav-item"><Link className="nav-link" to="/cart" >Cart</Link></li>}
                            {/* {user.accessToken && <li className="nav-item"><Link className="nav-link" to="/profile" >Profile</Link></li>} */}
                            {user.accessToken && <li className="nav-item profile-menu" onClick={() => { setShowProfile(!showProfile) }} onMouseOver={() => { setShowProfile(true) }} ><i className="far fa-user-circle fa-lg profile-icon" style={{ fontSize: "1.8rem" }}></i></li>}
                            {user.accessToken && <li className="nav-item profile-item"><span className="nav-link" >Order</span></li>}
                            {user.accessToken && <li className="nav-item profile-item"><Link className="nav-link" to="/edit/profile" >Edit Profile</Link></li>}
                            {user.accessToken && <li className="nav-item profile-item" onClick={()=>{setUpdatePassword(true)}}><span className="nav-link" >Change Password</span></li>}
                            {user.accessToken && <li className="nav-item profile-item"><button className="btn-logout" onClick={logoutUser}>Logout</button></li>}
                            {!user.accessToken && <li className="nav-item"><Link className="nav-link" to="/login" >Login</Link></li>}
                            {!user.accessToken && <li className="nav-item"><Link className="nav-link" to="/signup" >Signup</Link></li>}
                            {menu}

                        </ul>
                    </div>
                    <div className="bars" onClick={() => { setMenu(!menu) }}>
                        {menu ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
                    </div>
                </nav>

                {showProfile && <Profile setShowProfile={setShowProfile} setUpdatePassword={setUpdatePassword} logoutUser={logoutUser} />}
                {updatePassword && <ChangePassword setUpdatePassword={setUpdatePassword} />}
            </div>

        </header>
    )
}

export default Navbar