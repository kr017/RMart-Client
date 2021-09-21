import Signup from './signup/Signup'
import Login from './login/Login'
import Cart from './cart/Cart'
import Address from './address/Address'
import Order from './order/Order'
import Wishlist from './wishlist/Wishlist'
import Payment from './payment/Payment'
import { getUser,userInfo, logout,updateProfile } from './login/userSlice'
import { getProducts,products } from './product/productSlice'
import {addToWishlist,getUserWishlist,removeFromWishlist,emptyWishlist,moveToCart} from './wishlist/wishlistSlice'
import { addToCart,getUserCart,updateQty,removeProduct,moveToWishlist} from './cart/cartSlice'


export{
    Signup,
    Login,
    Cart,
    userInfo,
    products,
    Address,
    Order,
    Wishlist,
    Payment,
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
    moveToWishlist,
    moveToCart,
    updateProfile
}