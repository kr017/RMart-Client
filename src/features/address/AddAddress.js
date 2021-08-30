import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import style from './Address.module.css'
import { useDispatch } from 'react-redux';
import { addUserAddress } from './addressSlice'
import toast from 'react-hot-toast'

const AddAddressForm = ({state})=>{
    
    const dispatch = useDispatch()
    
    return(
        <Formik
        initialValues={{ street1: '',street2:'', city: '',pincode:'',state:'',country:'' }}
        validationSchema={Yup.object({
            // street1: Yup.string().trim().required('Street1 is required'),
            // city: Yup.string().trim().required('City is required'),
            // state: Yup.string().trim().required('State is required'),
            // country: Yup.string().trim().required('Country is required')
        })}
        onSubmit={(values) => {
            dispatch(addUserAddress(values)).unwrap()
            .then(res=>{
                toast.success(res.message, {
                    duration: 1500,
                    position: 'top-right',
                })
                state(false)
            })
            .catch(err=>{
                console.log("err",err)
            })
        }}
    >   
        <Form className={style.address_form}>
            <div className={style.form_heading}>
                <h2>Address</h2>
                <span className={style.cancel_form} onClick={()=>{state(false)}}><i className="far fa-times-circle"></i></span>
            </div>
            <div>
                <Field className={style.text_line} maxLength="36" name="street1" type="text" placeholder="Enter your street1" />
                <span className={style.err_msg}><ErrorMessage name="street1" /></span>
            </div>
            <div>
                <Field className={style.text_line} maxLength="30" name="street2" type="text" placeholder="Enter your street2" />
                <span><ErrorMessage name="street2" /></span>
            </div>
            <div>
                <Field className={style.text_line}  name="city" type="text" placeholder="Enter your city" />
                <span className={style.err_msg}><ErrorMessage  name="city" /></span>
            </div>
            <div>
                <Field className={style.text_line}  name="pincode" type="text" placeholder="Enter pincode" />
                <span className={style.err_msg}><ErrorMessage  name="pincode" /></span>
            </div>
            <div>
                <Field className={style.text_line}  name="state" type="text" placeholder="Enter your state" />
                <span className={style.err_msg}> <ErrorMessage  name="state" /> </span>
            </div>
            <div>
                <Field className={style.text_line}  name="country" type="text" placeholder="Enter your country" />
                <span  className={style.err_msg}> <ErrorMessage name="country" /> </span>
            </div>
            <div>
                <button className={style.address_btn}  type="submit">Add</button>
            </div>
        </Form>

    </Formik>
    );
}

export default AddAddressForm 