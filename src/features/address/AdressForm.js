import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateUserAddress } from './addressSlice'
import style from './Address.module.css'
import toast from 'react-hot-toast'

const AddressForm = ({ address, setText, text }) => {
    const [updateAddress, setUpdateAddress] = useState(true)
    const [buttonText, setButtonText] = useState('Select')
    const [addr, setAddr] = useState({
        street1: address.line1 ? address.line1 :'',
        street2: address.line2 ? address.line2:'',
        city: address.city ? address.city : '',
        pincode: address.postal_code ? address.postal_code:'',
        state: address.state ? address.state : '',
        country: address.country ? address.country :''
    })
    const dispatch = useDispatch();

    const handleAddress = (id) => {
        if (updateAddress && buttonText === 'Select') {
            setText({
                value: 'Selected',
                id: id
            })

        } else if (updateAddress && buttonText === 'Selected') {
            setText({
                value: 'Selected',
                id: ""
            })
            setButtonText('Select')
        } else {
            let updatedAddr = addr;
            updatedAddr.address_id = address._id 
            dispatch(updateUserAddress(addr)).unwrap()
            .then(res=>{
                toast.success(res.message, {
                    duration: 1500,
                    position: 'top-right',
                })
                setUpdateAddress(!updateAddress)
            })
            .catch(err=>{
                console.log("err",err)
            })
            
        }
    }

    const handleUpdateAddress = () => {
        if (buttonText === 'Selected' || buttonText === 'Select') {
            setButtonText('Update')
        } 
        if(!updateAddress){
            setAddr({
                street1: address.line1,
                street2: address.line2,
                city: address.city,
                pincode: address.postal_code,
                state: address.state,
                country: address.country 
            })
        }

        setUpdateAddress(!updateAddress)
    }

    const editAddress = (value) => {
        console.log("value",value)
        setAddr({
            street1: value.key==="street1" ? value.street1 : address.line1,
            street2: value.key==="street2" ? value.street2: address.line2,
            city: value.key==="city" ? value.city: address.city,
            pincode: value.key==="pincode" ? value.pincode: address.postal_code,
            state: value.key==="state" ? value.state: address.state,
            country: value.key==="country" ? value.country: address.country
        })
    }

    useEffect(() => {
        console.log("inside use effect")
        if (text.id === address._id && updateAddress) {
            setButtonText('Selected')
        } else if (text.id !== address._id && updateAddress) {
            setButtonText('Select')
        } else {
            //text.id === address.id && updateAddress ? setButtonText('Selected') : setButtonText('Select')
        }
        // eslint-disable-next-line
    }, [text, updateAddress])

    return (
        <Formik
            // initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                // email: Yup.string().trim().email('Invalid email address.').required('Email is required'),
                // password: Yup.string().trim().required('Password is required')
            })}
        >
            <Form className={style.address_form}>
                <div className={style.form_heading}>
                    <h2>Address</h2>
                    <span className={style.edit_form} onClick={handleUpdateAddress}>
                      {updateAddress ? <i className="fas fa-pen"></i> : <i className="far fa-times-circle fa-lg"></i>}
                      </span>
                </div>
                <div>
                    <Field className={style.text_line} maxLength="30" name="street1" type="text" placeholder="Enter your street1" readOnly={updateAddress} value={addr.street1} onChange={(e)=>{editAddress({key:'street1',street1:e.target.value})}} />
                    <span><ErrorMessage name="street1" /></span>
                </div>
                <div>
                    <Field className={style.text_line} maxLength="30" name="street2" type="text" placeholder="Enter your street2" readOnly={updateAddress} value={addr.street2} onChange={(e)=>{editAddress({key:'street2',street2:e.target.value})}} />
                    <span><ErrorMessage name="street2" /></span>
                </div>
                <div>
                    <Field className={style.text_line} name="city" type="text" placeholder="Enter your city" readOnly={updateAddress} value={addr.city} onChange={(e)=>{editAddress({key:'city',city:e.target.value})}} />
                    <span><ErrorMessage name="city" /></span>
                </div>
                <div>
                    <Field className={style.text_line} name="pincode" type="text" placeholder="Enter pincode" readOnly={updateAddress} value={addr.pincode} onChange={(e)=>{editAddress({key:'pincode',pincode:e.target.value})}}/>
                    <span><ErrorMessage name="pincode" /></span>
                </div>
                <div>
                    <Field className={style.text_line} name="state" type="text" placeholder="Enter your state" readOnly={updateAddress} value={addr.state} onChange={(e)=>{editAddress({key:'state',state:e.target.value})}} />
                    <span> <ErrorMessage name="state" /> </span>
                </div>
                <div>
                    <Field className={style.text_line} name="country" type="text" placeholder="Enter your country" readOnly={updateAddress} value={addr.country} onChange={(e)=>{editAddress({key:'country',country:e.target.value})}} />
                    <span> <ErrorMessage name="country" /> </span>
                </div>
                <div>
                    <button className={style.address_btn} type="button" onClick={() => { handleAddress(address._id) }}>{buttonText}</button>
                </div>
            </Form>

        </Formik>
    );
}

export default AddressForm