import { useDispatch, useSelector } from 'react-redux'
//import emptyCart from './emptyCart.svg'
import style from './Cart.module.css'
import CartCard from './Card'
import { useEffect } from 'react'
import  {getUserCart} from '../../features'


const Cart = () => {
    const products = useSelector((state) => state.cart.products)
    const cartValue = useSelector((state)=> state.cart.cartValue) 
    const dispatch = useDispatch()
    
    useEffect(()=>{
       dispatch(getUserCart())
    },[])
    return (
        <div className="container">
            <div className={style.cart_container}>
                {products.map((item,index)=>{
                    return <CartCard key={index} item={item} />
                })}
            </div>
            <hr className={style.cart_line}/>
            <div>
                <span>Total Cart Price : Rs. {cartValue}</span>
            </div>
        </div>
    )
}

export default Cart