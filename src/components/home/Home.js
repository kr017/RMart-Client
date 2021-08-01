import { useEffect } from 'react';
import './Home.css'
import Card from '../card/Card'
import { useDispatch,useSelector } from 'react-redux';
import  {getProducts,products,userInfo,getUserWishlist} from '../../features'


const Home = () => {
    const dispatch = useDispatch();
    const product = useSelector(products)
    const user = useSelector(userInfo)

    useEffect(()=>{
        dispatch(getProducts())
        if(user.name && user.accessToken){
            dispatch(getUserWishlist())
        }
        // eslint-disable-next-line
    },[dispatch])

    return (
  
        <div className="container">
            <div className="product-container">
                {product.map(item=>{
                    return <Card key={item._id}  _id={item._id} name={item.name} price={item.price} image={item.image} />
                })}
            </div>
        </div>
    );
}

export default Home