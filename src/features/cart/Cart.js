import { useDispatch, useSelector } from 'react-redux'
//import emptyCart from './emptyCart.svg'
import style from './Cart.module.css'
import CartCard from './Card'
import { useEffect } from 'react'
import { getUserCart } from '../../features'
import { useHistory } from 'react-router'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'


const Cart = () => {
    const products = useSelector((state) => state.cart.products)
    const cartValue = useSelector((state) => state.cart.cartValue)
    const cartSize = useSelector((state) => state.cart.cartSize)
    const dispatch = useDispatch()
    const history = useHistory()


    const onCheckout = () => {
        history.push('/address')
    }
    const checkout = async (token) => {
        let res = await axios.post('http://localhost:5000/v1/auth/checkout',token)
     }

    useEffect(() => {
        dispatch(getUserCart())
        //  eslint-disable-next-line
    }, [])
    return (
        <div className="container">
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
            <StripeCheckout
                    stripeKey="pk_test_51JT841SA7j2p5dnvUCwl6wEpNhbcQ1DD5ihYUGBWhal6qhKowSpM11gOKOalgaKub1ap2lIelbnHwvztJOIx0cbg00qHXLwAe2"
                    token={checkout}
                    name="Checkout"
                    amount={20*100}
                >
                    <button onClick={checkout}>Checkout</button>
                </StripeCheckout>
        </div>
    )
}

export default Cart