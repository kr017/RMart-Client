
import './Filter.css'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { getProducts } from '../../features'
const { createSliderWithTooltip } = Slider;


const Filter = (props) => {
    const Range = createSliderWithTooltip(Slider.Range);
    let userPrference = JSON.parse(localStorage.getItem('filter'))
    const [filter, setFilter] = useState(userPrference || { brands: [], gender: [], price: '', range: [] })
    const dispatch = useDispatch();

    const handleBrands = (brand) => {
        let value = {
            brands: !filter.brands.includes(brand) ? [...filter.brands, brand] : filter.brands.filter(b => b !== brand),
            gender: filter.gender,
            price: filter.price,
            range: filter.range,
        }
        setFilter(value)
        localStorage.setItem('filter', JSON.stringify(value))
        getAllProducts(value)
    }

    const handleGender = (gender) => {
        let value = {
            brands: filter.brands,
            gender: !filter.gender.includes(gender) ? [...filter.gender, gender] : filter.gender.filter(g => g !== gender),
            price: filter.price,
            range: filter.range,
        }
        setFilter(value)
        localStorage.setItem('filter', JSON.stringify(value))
        getAllProducts(value);
    }

    const handlePrice = (order) => {
        let value = {
            brands: filter.brands,
            gender: filter.gender,
            price: order,
            range: filter.range,
        }
        setFilter(value)
        localStorage.setItem('filter', JSON.stringify(value))
        getAllProducts(value);
    }

    // const log = (value) => {
    //     setFilter({ brands: filter.brands, price: filter.price, gender: filter.gender, range: value })
    // }

    const clearFilter = () => {
        setFilter({ brands: [], gender: [], price: '', range: [] })
        localStorage.removeItem('filter')
        dispatch(getProducts())
    }

    const getAllProducts = (filter) => {
        dispatch(getProducts({ filter: filter }))
    }

    let brands = ['Rollex', 'Titan', 'Fastrack', 'Fossil', 'Sonata', 'Roadster']
    let gender = ['Male', 'Female', 'Unisex']



    return (
        <div className={props.modalState ? "filter_modal" : "filter_close"}  >
            <div className="filter_content">
                <div>
                    <div style={{display:'flex',justifyContent:'flex-end', cursor:"pointer"}}>
                        <span onClick={()=>{props.state(false)}}><i className="fas fa-times"></i></span>
                    </div>
                    <div className="filter_header">
                        <h2>Filters</h2>
                        <span onClick={clearFilter}>CLEAR ALL</span>
                    </div>
                    <div >
                        <h4>Brands</h4>

                        <div className="row">
                            {
                                brands.map((brand, index) => {
                                    return <div key={index} className="pretty p-default p-curve p-fill labels">
                                        <input type="checkbox" id={brand} value={brand} onChange={() => { handleBrands(brand) }} checked={filter.brands.includes(brand) ? true : false} />
                                        <div className="state">
                                            <label htmlFor={brand}>{brand}</label>
                                        </div>



                                    </div>
                                })
                            }


                        </div>
                    </div>
                    <div>
                        <h4>Gender</h4>
                        <div className="row">
                            {
                                gender.map((gen, index) => {
                                    return <div key={index} className="pretty p-default p-curve p-fill labels">
                                        <input type="checkbox" id={gen} value={gen} onChange={() => { handleGender(gen) }} checked={filter.gender.includes(gen) ? true : false} />
                                        <div className="state">
                                            <label htmlFor={gen}>{gen}</label>
                                        </div>
                                    </div>
                                })
                            }

                        </div>
                    </div>

                </div>
                <div>
                    <h4>Price</h4>
                    <div className="row">
                        <div className="pretty p-default p-round labels">
                            <input type="radio" name="radio1" value="-1" onChange={() => { handlePrice(-1) }} checked={filter.price === -1 ? true : false} />
                            <div className="state">
                                <label htmlFor="">High to Low</label>
                            </div>
                        </div>

                        <div className="pretty p-default p-round labels">
                            <input type="radio" name="radio1" value="1" onChange={() => { handlePrice(1) }} checked={filter.price === 1 ? true : false} />
                            <div className="state">
                                <label>Low to High</label>
                            </div>
                        </div>
                    </div>



                </div>
                <div>
                    <h4>Price Range</h4>
                    <Range
                        min={0}
                        max={10000}
                        tipFormatter={value => `${value}`}
                        step={500}
                        defaultValue={[0, 10000]}
                        //draggableTrack
                        //onChange={log}
                        className="labels"
                    />
                </div>


            </div>
        </div>
    )
}

export default Filter