import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import  './modal.css'
import { useDispatch,useSelector } from 'react-redux';
import  {updateProfile} from '../../features'
import {useHistory} from 'react-router-dom'
import {Loader} from '../../components'
import { userInfo} from '../../features'
import { useState } from 'react';
import toast from 'react-hot-toast' 

const EditProfile = () => {
    const user = useSelector(userInfo)
    const [profile,setProfile] = useState({name:user.name,email:user.email,mobile:user.mobile})
    const [loader,setLoader] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const handleProfileChange =(key,value)=>{
        console.log("val",value)
        setProfile({
            name: key==='name' ? value : profile.name,
            email: key==='email' ? value : profile.email,
            mobile: key==='mobile'? value : profile.mobile 
        })
    }


    return (
        <div className="container">
            <Formik
                initialValues={{ name: profile.name, email:profile.email,mobile:profile.mobile }}
                enableReinitialize
                validationSchema={Yup.object({
                    name: Yup.string().trim().required('Name is required'),
                    email: Yup.string().trim().email('Invalid email address.').required('Email is required'),
                    mobile: Yup.string().trim().matches(phoneRegExp, 'Phone number is not valid').required('Mobile number is required')
                })}
                onSubmit={(values) => {
                    dispatch(updateProfile(values)).unwrap()
                    .then((res)=>{
                        setLoader(true)
                        toast.success(res.message,{
                            duration: 1500,
                            position: 'top-right',
                        })
                        history.push('/home')
                        setLoader(false)
                    })
                    .catch((err)=>{
                        setLoader(false)
                        toast.error(err.message,{
                            duration: 1500,
                            position: 'top-right',
                        })
                    })
                }}
            >
                <Form className="editProfile_form">
                    <div>
                        <h2 className="editProfile_heading">Edit Profile</h2>
                    </div>
                    <div className="column">
                        <label className="editProfile_label" htmlFor="name">Name</label>
                        <Field className="editProfile_field" name="name" type="text" placeholder="Enter your name" value={profile.name} onChange={(e)=>{handleProfileChange('name',e.target.value) }} />
                        <span className="err_msg"><ErrorMessage  name="name" /></span>
                    </div>
                    <div className="column">
                        <label className="editProfile_label" htmlFor="email">Email</label>
                        <Field className="editProfile_field" name="email" type="text" placeholder="Enter your email" value={profile.email}  onChange={(e)=>{handleProfileChange('email',e.target.value)}} />
                        <span className="err_msg"><ErrorMessage name="email" /></span>
                    </div>
                    <div className="column">
                        <label className="editProfile_label" htmlFor="mobile">Mobile</label>
                        <Field className="editProfile_field" name="mobile" type="text" placeholder="Enter your mobile number" value={profile.mobile}  onChange={(e)=>{handleProfileChange('mobile',e.target.value)}} />
                        <span className="err_msg"> <ErrorMessage name="mobile" /> </span>
                    </div>
                    <div>
                    <button className="editProfile_btn" type="submit">Save</button>
                    </div>
                </Form>

            </Formik>
             {loader && <Loader loading={loader} />} 
        </div>
    );
}

export default EditProfile