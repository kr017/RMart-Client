import './Card.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, userInfo, removeFromWishlist } from '../../features'
import {  useHistory,Link } from 'react-router-dom';


const Card = ({ _id, name, price, image,discount }) => {
    const dispatch = useDispatch();
    const user = useSelector(userInfo)
    const wishlist = useSelector((state) => state.wishlist.products)
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


    return (
        <div className="card">
            <div className="product-image">
               <Link to={`/shop/${_id}`}> <img className="prod-img" src={image} alt="watch" /></Link>
                <span className="heart">
                    {isInWishlist() ? <i className="fas fa-heart" style={{ color: "#264f85" }} onClick={() => { removeFromUserWishlist(_id) }} ></i> : <i className="far fa-heart" onClick={() => { addToUserWishlist(_id) }} ></i>}
                </span>
            </div>
            <div className="product-details">
                <h3 className="product-name">{name}</h3>
                <span className="product-price">RS. {price}</span>
                <div className="product-discount" ><span>M.R.P  Rs. {parseInt((price*100)/(100-discount))} {discount}% off</span></div>
                
            </div>
            <div className="card-action">
                <button className="btn-shopping" onClick={()=>{history.push(`/shop/${_id}`)}} ><i className="fas fa-shopping-bag shop"></i> Shop</button>
            </div>

        </div>
    );
}

export default Card