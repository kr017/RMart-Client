import Signup from './signup/Signup'
import Login from './login/Login'
import { getUser,userInfo, logout } from './login/userSlice'
import { getProducts,products } from './product/productSlice'
import {addToWishlist,getUserWishlist,removeFromWishlist,emptyWishlist} from './wishlist/wishlistSlice'

export{
    Signup,
    Login,
    userInfo,
    products,
    getUser,
    logout,
    getProducts,
    addToWishlist,
    getUserWishlist,
    removeFromWishlist,
    emptyWishlist
}