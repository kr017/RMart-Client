import { useDispatch, useSelector } from 'react-redux'
import emptyCart from './emptyCart.svg'
import style from './Cart.module.css'
import CartCard from './Card'
import { useEffect } from 'react'
import { getUserCart } from '../../features'
import { useHistory } from 'react-router'
import { loadingStatus } from './cartSlice'
import { Loader } from '../../components'

const Cart = () => {
    const products = useSelector((state) => state.cart.products)
    const cartValue = useSelector((state) => state.cart.cartValue)
    const cartSize = useSelector((state) => state.cart.cartSize)
    const loading = useSelector(loadingStatus)
    const dispatch = useDispatch()
    const history = useHistory()


    const onCheckout = () => {
        history.push('/address')
    }

    useEffect(() => {
        dispatch(getUserCart())
        //  eslint-disable-next-line
    }, [])
    return (
        <div className="container">
            {
                products && products.length > 0
                    ?
                    (
                        <div>
                            <div className={style.cart_container}>
                                {products.map((item, index) => {
                                    return <CartCard key={index} item={item} />
                                })}
                            </div>
                            <hr className={style.cart_line} />
                            <div className={`${style.cart_summary} ${style.row}`}>
                                <div>
                                    <h2>Cart Summary</h2>
                                    <div><span>Products in cart : {cartSize}</span></div>
                                    <div><span>Cart Price : Rs. {cartValue}</span></div>
                                </div>
                                <div className={style.checkout}>
                                    <button className="btn-shopping" onClick={onCheckout}>Checkout</button>
                                </div>

                            </div>
                        </div>
                    )
                    :
                    (<div>
                        <img src={emptyCart} alt="empty" style={{width:"100%",height:"400px",marginTop:"5%"}}/>
                    </div>)

            }
            
            {loading && <Loader loading={loading} />}
        </div>
    )
}

export default Cart