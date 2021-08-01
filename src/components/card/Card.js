import './Card.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, userInfo, removeFromWishlist } from '../../features'
import { useHistory } from 'react-router';


const Card = ({ _id, name, price, image }) => {
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
                <img className="prod-img" src={image} alt="watch" />
                <span className="heart">
                    {isInWishlist() ? <i className="fas fa-heart" style={{ color: "lightseagreen" }} onClick={() => { removeFromUserWishlist(_id) }} ></i> : <i className="far fa-heart" onClick={() => { addToUserWishlist(_id) }} ></i>}
                </span>
            </div>
            <div className="product-details">
                <h3 className="product-name">{name}</h3>
                <span className="product-price">RS. {price}</span>
            </div>
            <div className="card-action">
                <button className="btn-shopping" ><i className="fas fa-shopping-bag shop"></i>Shop</button>
            </div>

        </div>
    );
}

export default Card