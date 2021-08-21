import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch} from 'react-redux'
import { addToCart } from '../../features'
import toast from 'react-hot-toast';
import axios from 'axios'
import './ProductInfo.css'

const ProductInfo = () => {
    const [product, setProduct] = useState({})
    const { product_id } = useParams();
    const cartDispatch = useDispatch()

    const getProduct = async () => {
        try {
            let res = await axios.post('http://localhost:5000/v1/auth/get_product', { product_id: product_id });
            setProduct(res.data.data)

        } catch (error) {

        }
    }

    const addProduct = (product_id) => {
        cartDispatch(addToCart({product_id:product_id})).unwrap()
        .then(res=>{
            toast.success(res.message, {
                duration: 1500,
                position: 'top-right',
            })
        })
        .catch(err=>{
            toast.error(err.message, {
                duration: 1800,
                position: 'top-right',
            })
        })
    }

    useEffect(() => {
        getProduct()
        // eslint-disable-next-line
    }, [])


    return (
        <div className="container">
            <div className="product_desc">

                <div className="product_image">
                    <img className="product_img" src={product.image} alt="watch" />


                </div>

                <div className="product_info">
                    <span className="product_brand">{product.brand}</span>
                    <span className="product_name">{product.name}</span>
                    <hr style={{ marginBottom: "0.5rem" }} />
                    <div>
                        <span className="product_price">Rs. {product.price} </span>
                        <span style={{ fontSize: "1.2rem", textDecoration: "line-through", letterSpacing: "0.05rem", marginRight: "0.2rem" }}>Rs. 1700</span>
                        <span>(10% OFF)</span>
                    </div>

                    <div>inclusive of all taxes</div>
                    <p className="prod_desc">{product.description}</p>
                    <div className="action_btn">
                        <button className="cart_btn" onClick={()=>{addProduct(product_id)}}>ADD TO CART</button>
                        <button className="wishlist_btn">ADD TO WISHLIST</button>
                    </div>
                </div>

            </div>

        </div>
    );
}


export default ProductInfo