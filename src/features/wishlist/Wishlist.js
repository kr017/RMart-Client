import Card from './Card'
import { getUserWishlist } from '../'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import style from './Wishlist.module.css' 
import { loadingStatus } from './wishlistSlice'
import { Loader } from '../../components'
const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.products)
    const loading = useSelector(loadingStatus)
    useEffect(() => {
        dispatch(getUserWishlist())
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className="container">
                {
                    wishlist && wishlist.length > 0
                        ?
                        (
                            <div className="product-container">
                                {wishlist.map(item => {
                                    return <Card wishlist={wishlist} key={item._id} _id={item._id} name={item.name} price={item.price} image={item.image} />
                                })}
                            </div>
                        )
                        :
                        (
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"calc(100vh - 12vh)"}}>
                            <span style={{fontSize:"2rem",fontWeight:600}}>Wishlist is empty</span>
                        </div>)
                }


            </div>
            {loading && <Loader loading={loading} />}
        </div>
    );
}

export default Wishlist