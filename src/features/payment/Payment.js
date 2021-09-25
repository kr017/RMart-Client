import axios from 'axios'
import { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCart, emptyCart, userInfo } from '../'
import { useParams } from "react-router";
import { useHistory } from "react-router-dom"
import toast from "react-hot-toast"
import styles from './Payment.module.css'
import { Formik, Field, Form } from 'formik';
import {Loader} from '../../components'

const Payment = () => {
    const [loading,setLoading] = useState(false)
    const cartValue = useSelector((state) => state.cart.cartValue)
    const { address_id } = useParams();
    const dispatch = useDispatch()
    const user = useSelector(userInfo)
    const history = useHistory()
   
    const checkout = async (token) => {
        
        try {
            let obj = {
                address_id: address_id,
                token: token,
                amount: cartValue
            }
            setLoading(true)
            let res = await axios.post(`${process.env.REACT_APP_BACKEND}v1/api/checkout`, obj)
            dispatch(emptyCart())
            toast.success(res.data.message, {
                duration: 1500,
                position: 'top-right',
            })
            setLoading(false)
            history.push(`/order/${res.data.data._id}`)
        } catch (error) {

            setLoading(false)
            // toast.error(error.response.data.message, {
            //     duration: 1500,
            //     position: 'top-right',
            // })
        }

    }

    useEffect(() => {
        dispatch(getUserCart())
        // eslint-disable-next-line 
    }, [])


    return (
        <div className={`container ${styles.payment}`}>
            <Formik>
                <Form className={styles.payment_form}>
                    <div>
                        <h2 className={styles.patment_heading}>Payment Info</h2>
                    </div>
                    <div className={styles.column}>
                        <label className={styles.payment_label}>Email</label>
                        <Field className={styles.payment_field} value={user.email} type="text" placeholder="Enter your email" />
                    </div>
                    <div className={styles.column}>
                        <label className={styles.payment_label} >Amount in Rs.</label>
                        <Field className={styles.payment_field} value={cartValue} />
                    </div>
                    <div className={styles.column}>
                        <label className={styles.payment_label} >Debit Card</label>
                        <Field className={styles.payment_field} value="4242424242424242" />
                    </div>
                    <StripeCheckout
                        stripeKey={`${process.env.REACT_APP_STRIPE_KEY}`}
                        token={checkout}
                        name="Checkout"
                        amount={cartValue * 100}
                        currency="INR"
                        email={user.email}
                        ComponentClass="div"
                    >
                        <div style={{textAlign:'center'}}>
                            <button className={styles.payment_btn} type="button" onClick={checkout}>Pay</button>
                        </div>

                    </StripeCheckout>
                </Form>


            </Formik>
           {loading && <Loader loading={loading}/>}
        </div>

    )
}

export default Payment