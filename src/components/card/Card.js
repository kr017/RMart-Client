import Watch from './tadeusz-lakota-Tb38UzCvKCY-unsplash.jpg'
import './Card.css'

const Card = () => {
    return (
        <div className="card">
            <div className="product-image">
                <img className="prod-img" src={Watch} alt="watch" />
            </div>
            <div className="product-details">
                <h3 className="product-name">Rollex</h3>
                <span className="product-price">RS. 15000</span>
            </div>
            <div className="card-action">
                <button className="btn-shopping"><i className="fas fa-shopping-bag shop"></i>Shop</button>
            </div>

        </div>
    );
}

export default Card