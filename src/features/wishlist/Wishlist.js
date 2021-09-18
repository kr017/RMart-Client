import Card from './Card'
import { getUserWishlist} from '../'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import style from './Wishlist.module.css' 

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.products)

    useEffect(() => { 
        dispatch(getUserWishlist())
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className="container">
                <div className="product-container">
                    {wishlist.map(item => {
                        return <Card  wishlist={wishlist} key={item._id} _id={item._id} name={item.name} price={item.price} image={item.image} />
                    })}
                </div>

            </div>
        </div>
    );
}

export default Wishlist