import { useEffect, useState } from 'react';
import style from './Order.module.css'
import axios from 'axios'
import { useParams } from "react-router";



const Order = () => {
    const [order, setOrder] = useState()
    const { order_id } = useParams();

    const getOrderDetail = async () => {
        try {
            let order = { order_id: order_id }
            const res = await axios.post(`${process.env.REACT_APP_BACKEND}v1/api/get_order_detail`, order)
            setOrder(res.data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getOrderDetail()
        // eslint-disable-next-line 
    }, [])
    return (
        <div className={`container ${style.column}`}>
           
            {order && <div className={style.order_box}>
                <h4>Order Confirmed</h4>
                <span className={style.purchase_date}>{order.created_at}</span>
                <p >Order  <span className={style.order_no}>{order.order_id}</span></p>
                <p>Total Price: Rs {order.total_cart_value}</p>
                <p className={style.address}>Delivery Address: {order.shipping_address.line1},{order.shipping_address.line2 ? order.shipping_address.line2 : ''},{order.shipping_address.city},{order.shipping_address.postal_code}</p>
                {
                    order.products.map((product, index) => {
                        return <div className={style.products}>
                            <div className={style.product_image}>
                                <img className={style.image} src={product.image} alt="product"/>
                            </div>
                            <div className={style.product_info}>
                                <h4>{product.name}</h4>
                                <span>Price: {product.price}</span>
                                <p>Qty Purchased: {product.quantity}</p>
                            </div>
                        </div>
                    })
                }
                {/* <div className={style.products}>
                    <div className={style.product_image}>
                        <img className={style.image} src={order.products[0].image} />
                    </div>
                    <div className={style.product_info}>
                        <h4>{order.products[0].name}</h4>
                        <span>Price: {order.products[0].price}</span>
                        <p>Qty Purchased: {order.products[0].quantity}</p>
                    </div>
                </div> */}

            </div>}
        </div>
    );
}

export default Order