import { useEffect, useState } from 'react'
import style from './Order.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';


const OrderTable = () => {

    const [orders, setOrders] = useState([]);
    

    const getUserAllOrders = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND}v1/api/get_user_all_orders`)
            setOrders(res.data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getUserAllOrders()
    }, [])

    return (
        <div className="container">
            {orders.length > 0 && <div className={style.order_table}>
                <div className={style.table_heading}><h2 >Orders</h2></div>
                

                <table className={style.orders}>
                    <tr>
                        <th>No</th>
                        <th>Order Id</th>
                        <th>Date</th>
                    </tr>
                    {
                        orders.map((order,index) => {
                            return <tr style={{cursor:'pointer'}}>
                                <td>{index+1}</td>
                                <td><Link className={style.order_id} to={`/order/${order._id}`}>{order.order_id}</Link></td>
                                <td>{order.created_at}</td>
                            </tr>
                        })
                    }
                </table>
            </div>
            }
        </div>
    )
}

export default OrderTable