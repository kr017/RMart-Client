import style from './Wishlist.module.css'
import { addToWishlist, userInfo, removeFromWishlist,moveToCart } from '../'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast'








let WishlistCard = ({wishlist,_id, name, price, image })=>{

    const user = useSelector(userInfo)
    const dispatch = useDispatch()
    const history = useHistory()

    const addToUserWishlist = (product_id) => {
        if (user.name && user.accessToken) {
            dispatch(addToWishlist({ product_id: product_id }))
        }
        else {
            history.push('./login')
        }
    }

    const isInWishlist = () => {
        if (wishlist) {
            return wishlist.some((product) => _id === product._id)
        } else {
            return false
        }
    }

    const removeFromUserWishlist = (product_id) => {
        dispatch(removeFromWishlist({ product_id: product_id }))
    }

    const addProduct = (product_id) => {
        dispatch(moveToCart({product_id:product_id})).unwrap()
        .then(res=>{
            toast.success(res.message, {
                duration: 1500,
                position: 'top-right',
            })
        })
        .catch(err=>{
            toast.error(err.message, {
                duration: 1800,
                position: 'top-right',
            })
        })
    }

    return(
        <div className={style.card}>
            <div className={style.product_image}>
                <img className={style.prod_img} src={image} alt="watch" />
                <span className={style.heart}>
                    {isInWishlist() ? <i className="fas fa-heart" style={{ color: "lightseagreen" }} onClick={() => { removeFromUserWishlist(_id) }} ></i> : <i className="far fa-heart" onClick={() => { addToUserWishlist(_id) }} ></i>}
                </span>
            </div>
            <div className={style.product_details}>
                <h3 className={style.product_name}>{name}</h3>
                <span className={style.product_price}>RS. {price}</span>
                <div className={style.product_discount}><span>M.R.P  Rs. {price} 10%off</span></div>
                
            </div>
            <div className={style.card_action}>
                <button className={style.btn_shopping} onClick={()=>{addProduct(_id)}} ><i class="fas fa-cart-plus fa-lg"></i> Add to cart</button>
            </div>

        </div>
    )
}

export default WishlistCard