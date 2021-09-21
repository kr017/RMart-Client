import axios from 'axios'
import { useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCart, } from '../'
import { useParams } from "react-router";


const Payment = () => {
    const cartValue = useSelector((state) => state.cart.cartValue)
    const cartSize = useSelector((state) => state.cart.cartSize)
    const { address_id } = useParams();
    const dispatch = useDispatch()
    const checkout = async (token) => {
        try {
            let obj ={
                address_id : address_id,
                token:token,
                amount :cartValue  
            }
            let res = await axios.post('http://localhost:5000/v1/api/checkout', obj)
            console.log("res",res)
        } catch (error) {
            
        }
        
    }

     console.log("address_id",address_id) 
    useEffect(() => {
        dispatch(getUserCart())
        console.log("cartValue", cartSize)
    }, [])


    return (
        <div className="container">
           
                    <StripeCheckout
                        stripeKey="pk_test_51JT841SA7j2p5dnvUCwl6wEpNhbcQ1DD5ihYUGBWhal6qhKowSpM11gOKOalgaKub1ap2lIelbnHwvztJOIx0cbg00qHXLwAe2"
                        token={checkout}
                        name="Checkout"
                        amount={cartValue*100}
                        currency="INR"
                        email="doe@yopmail.com"
                    >
                        {/* <button onClick={checkout}>Checkout</button> */}
                    </StripeCheckout>
           
        </div>

    )
}

export default Payment