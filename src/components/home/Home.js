import { useEffect,useState } from 'react';
import './Home.css'
import Card from '../card/Card'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, products, userInfo, getUserWishlist, getUserCart } from '../../features'
import Filter from '../filter/Filter'

const Home = () => {
    const [modal,setModal] = useState(false)
    const dispatch = useDispatch();
    const product = useSelector(products)
    const user = useSelector(userInfo)
    let userPrference = {filter:JSON.parse(localStorage.getItem('filter'))}
    const handleFilter =()=>{
        setModal(prevState=>!prevState)
    }

    useEffect(() => {
        dispatch(getProducts(userPrference))
        if (user.name && user.accessToken) {
            dispatch(getUserWishlist())
            dispatch(getUserCart())
        }
        // eslint-disable-next-line
    }, [dispatch])

    return (
        <div>
            <Filter modalState={modal} state={setModal}/>
            <div className="container">
                <div className="product-container">
                    {product.map(item => {
                        return <Card key={item._id} _id={item._id} name={item.name} price={item.price} image={item.image} />
                    })}
                </div>
                <div className="filter" onClick={handleFilter}>
                    <i className="fas  fa-filter fa-xs funnel"></i>
                </div>
            </div>
        </div>
    );
}

export default Home