import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'


const Payment = ()=>{

    const checkout = async (token) => {
       let res = await axios.post('http://localhost:5000/v1/auth/checkout',token)
    }

    return(
       <div className="container">
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