import style from './Order.module.css'




const Order = () => {

    return (
        <div className="container">
            <h2>Order Details</h2>
            <hr></hr>
            <div className={style.order_container}>
                <div className={style.order_summary}>
                    <div className={style.order_table_heading}>
                        <span className={style.ordet_table_heding1}>Items</span>
                        <span className={style.ordet_table_heding2}>Price</span>
                        <span className={style.ordet_table_heding3}>Qty</span>
                    </div>
                    <hr></hr>
                    <div className={style.order_table}>
                        <div className={style.order_name}>
                            <span className={style.order_image_container}>
                                <img className={style.order_image} src="http://localhost:5000/uploads/products/16290121717802170285b-45c8-4a7a-8f25-6c194e5dd6de1576838875775-Roadster-Men-Black-Analogue-and-Digital-Watch-MFB-PN-SM-1545-1.webp" alt="watch" />
                            </span>
                            <span>Men Blue Analouge Watch Pereptual Motion ABCD</span>
                        </div>
                        <div className={style.order_price}>Rs. 423000</div>
                        <div className={style.order_qty}>5</div>
                    </div>

                    <hr></hr>
                    <div className={style.order_table}>
                        <div className={style.order_name}>
                            <span className={style.order_image_container}>
                                <img className={style.order_image} src="http://localhost:5000/uploads/products/16290121717802170285b-45c8-4a7a-8f25-6c194e5dd6de1576838875775-Roadster-Men-Black-Analogue-and-Digital-Watch-MFB-PN-SM-1545-1.webp" alt="watch" />
                            </span>
                            <span>Men Blue Analouge Watch Pereptual Motion ABCD</span>
                        </div>
                        <div className={style.order_price}>Rs. 423000</div>
                        <div className={style.order_qty}>5</div>
                    </div>

                    <hr></hr>
                    <div className={style.order_table}>
                        <div className={style.order_name}>
                            <span className={style.order_image_container}>
                                <img className={style.order_image} src="http://localhost:5000/uploads/products/16290121717802170285b-45c8-4a7a-8f25-6c194e5dd6de1576838875775-Roadster-Men-Black-Analogue-and-Digital-Watch-MFB-PN-SM-1545-1.webp" alt="watch" />
                            </span>
                            <span>Men Blue Analouge </span>
                        </div>
                        <div className={style.order_price}>Rs. 423000</div>
                        <div className={style.order_qty}>5</div>
                    </div>

                    <hr></hr>
                </div>
                <div className={style.order_detail}>
                    <div>
                      <div className={style.order_detail_heading}>Order Summary</div>
                      <hr></hr>
                      <div>
                          <div>Subtotal : Rs. 100000000</div>
                          <div>Shipping Fee: Rs. 0</div>
                          <div>Tax: Rs. 0</div>
                      </div>
                      <hr></hr>
                      <div>Total : Rs. 100000000 </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order