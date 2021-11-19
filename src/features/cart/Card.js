import { useState } from 'react'
import style from './Cart.module.css'
import { useDispatch} from 'react-redux'
import  {updateQty,removeProduct,moveToWishlist,getUserWishlist} from '../../features'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CartCard = ({item}) => {

    const [qty,setQty] = useState(item.quantity)
    const dispatch = useDispatch()

    const addItem = (id)=>{
        setQty(prevoius=>prevoius+1)
        dispatch(updateQty({product_id:id,qty:qty+1}))

    }

    const minusItem = (id)=>{
        if(qty>1){
            setQty(prevoius=>prevoius-1)
            dispatch(updateQty({product_id:id,qty:qty-1}))
        } else{
            dispatch(removeProduct({product_id:id})).unwrap()
            .then()
            .catch(err=>{
                console.log("err",err)
            })

        }
    }

    const removeItem = (id)=>{
        dispatch(removeProduct({product_id:id})).unwrap()
        .then()
        .catch(err=>{
            console.log("err",err)
        })
    }

    const moveItemToWishlist = (id)=>{
        dispatch(moveToWishlist({product_id:id})).unwrap()
        .then(res=>{
            dispatch(getUserWishlist())
            toast.success(res.message, {
                duration: 1500,
                position: 'top-right',
            })
        })
        .catch(err=>{
            toast.error("Something went wrong,Please try again later!!!", {
                duration: 1500,
                position: 'top-right',
            })
        })
    }

    return (
        <div className={style.cart_card}>
                <div>
                <Link to={`/shop/${item._id}`}>  <img className={style.cart_product_img} src={item.image} alt="watch" /></Link>
                </div>

                <div className={style.cart_product_info}>
                    <p className={style.cart_product_name}>{item.name} </p>
                    <div >
                        <span className={style.cart_product_price}>Price : Rs. {item.price}</span>
                    </div>
                    <div className={style.cart_product_qty}>
                        <button className={style.btn_update} onClick={()=>{addItem(item._id)}}>+</button>
                        <span style={{margin:"0rem 0.2rem"}}>{qty}</span>
                        <button className={style.btn_update} onClick={()=>{minusItem(item._id)}}>-</button>
                    </div>
                    <div >
                        <span className={style.cart_product_price} >Sub Total : Rs. {qty*item.price}</span>
                    </div>
                    <div className={style.cart_product_action}>
                        <button className={style.cart_btn_remove} onClick={()=>{removeItem(item._id)}}><i className="fas fa-trash-alt"></i></button>
                        <button className={style.cart_btn_wishlist} onClick={()=>{moveItemToWishlist(item._id)}} ><i className="far fa-heart"></i></button>
                    </div>
                </div>           

        </div>
    )
}

export default CartCard