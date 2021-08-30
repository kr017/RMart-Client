import AddressForm from './AdressForm'
import AddAddressForm from './AddAddress'
import style from './Address.module.css'
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getUserAddressList } from './addressSlice'
import toast from 'react-hot-toast'

const Address = () => {
    const addresses = useSelector((state) => state.address.addresses)
    const [addForm, setAddForm] = useState(false)
    const [buttonText, setButtonText] = useState({ value: 'Select', id:null })
    const dispatch = useDispatch()

    const addAddressForm = () => {
        return <AddAddressForm state={setAddForm} />
    }

    const onContinue = ()=>{
        console.log(buttonText)
        if(buttonText.id === ''|| buttonText.id === null){
            toast.error('Please select one address.', {
                duration: 2500,
                position: 'top-right',
            })
        }
    }

    useEffect(()=>{
        dispatch(getUserAddressList())
        // eslint-disable-next-line
    },[])
    return (
        <div className="container">
            <div className={style.address_container} >
                {
                    addresses.map((addr,index)=>{
                        return <AddressForm key={index} address={addr} setText={setButtonText} text={buttonText} />
                    })
                }
                {addForm && addAddressForm()}
                <Formik>
                    <Form className={style.address_form} style={{ border: "dotted" }}>
                        <span className={style.add_address} onClick={() => { setAddForm(!addForm) }} >
                            {addForm ? <i className="far fa-times-circle"></i> : <i className="fas fa-plus-circle"></i>}
                        </span>
                    </Form>
                </Formik>
            </div>
            <div className={style.continue}>
                <button className={style.continue_button} onClick={onContinue}>Continue</button>
            </div>

        </div>

    );
}


export default Address