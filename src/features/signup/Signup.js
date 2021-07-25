import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import  styles from './Signup.module.css'
import { useDispatch,useSelector } from 'react-redux';
import  {loadingStatus, signupUser} from './signupSlice'
import {useHistory} from 'react-router-dom'
import {Loader} from '../../components'

const Signup = () => {
    const loading = useSelector(loadingStatus);
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className="container">
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={Yup.object({
                    name: Yup.string().trim().required('Name is required'),
                    email: Yup.string().trim().email('Invalid email address.').required('Email is required'),
                    password: Yup.string().trim().min(6).required('Password is required')
                })}
                onSubmit={(values) => {
                    dispatch(signupUser(values)).unwrap()
                    .then(()=>{
                        history.push('/login')
                    })
                    .catch((err)=>{
                        console.log("err",err)
                    })
                }}
            >
                <Form className={styles.signup_form}>
                    <div>
                        <h2 className={styles.form_heading}>Sign Up</h2>
                    </div>
                    <div className={styles.column}>
                        <label className={styles.form_label} htmlFor="name">Name</label>
                        <Field className={styles.form_field} name="name" type="text" placeholder="Enter your name" />
                        <span className={styles.err_msg}><ErrorMessage  name="name" /></span>
                    </div>
                    <div className={styles.column}>
                        <label className={styles.form_label} htmlFor="email">Email</label>
                        <Field className={styles.form_field} name="email" type="text" placeholder="Enter your email" />
                        <span className={styles.err_msg}><ErrorMessage name="email" /></span>
                    </div>
                    <div className={styles.column}>
                        <label className={styles.form_label} htmlFor="password">Password</label>
                        <Field className={styles.form_field} name="password" type="password" placeholder="Enter your password" />
                        <span className={styles.err_msg}> <ErrorMessage name="password" /> </span>
                    </div>
                    <div>
                    <button className={styles.btn_signup} type="submit">Sign Up</button>
                     <div><span>Already registerd ?<Link to="/login">Login</Link> </span> </div>
                    </div>
                </Form>

            </Formik>
            {loading && <Loader loading={loading} />} 
        </div>
    );
}

export default Signup