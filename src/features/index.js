import Signup from './signup/Signup'
import Login from './login/Login'
import Cart from './cart/Cart'
import Address from './address/Address'
import { getUser,userInfo, logout } from './login/userSlice'
import { getProducts,products } from './product/productSlice'
import {addToWishlist,getUserWishlist,removeFromWishlist,emptyWishlist} from './wishlist/wishlistSlice'
import { addToCart,getUserCart,updateQty,removeProduct,moveToWishlist} from './cart/cartSlice'
//import {addUserAddress} from './address/addressSlice'

export{
    Signup,
    Login,
    Cart,
    userInfo,
    products,
    Address,
    getUser,
    logout,
    getProducts,
    addToWishlist,
    getUserWishlist,
    removeFromWishlist,
    emptyWishlist,
    addToCart,
    getUserCart,
    updateQty,
    removeProduct,
    moveToWishlist
}