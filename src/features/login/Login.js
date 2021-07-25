import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import styles from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { loadingStatus, loginUser } from './userSlice'
import { useHistory } from 'react-router-dom'
import { Loader } from '../../components'
import toast from 'react-hot-toast';


const Login = () => {
    const loading = useSelector(loadingStatus);
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className="container">
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                    email: Yup.string().trim().email('Invalid email address.').required('Email is required'),
                    password: Yup.string().trim().required('Password is required')
                })}
                onSubmit={(values) => {
                    dispatch(loginUser(values)).unwrap()
                        .then((user) => {
                            toast.success(user.message, {
                                duration: 1500,
                                position: 'top-right',
                            })
                            history.push('/home')
                        })
                        .catch((err) => {
                            toast.error(err.message, {
                                duration: 1500,
                                position: 'top-right',
                            })
                        })
                }}
            >   
                <Form>
                    <div>
                        <h2 className={styles.form_heading}>Login</h2>
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
                        <button className={styles.btn_login} type="submit">Login</button>
                        <div><span style={{ fontSize: "0.9rem" }}>Don't have account.?<Link to="/signup">Signup</Link> </span> </div>
                    </div>
                </Form>

            </Formik>
            {loading && <Loader loading={loading} />}
        </div>
    );
}

export default Login