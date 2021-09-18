import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './modal.css'
import axios from 'axios'
import toast from 'react-hot-toast'


const changePassword = ({setUpdatePassword}) => {


    return (
        <div className="modal">
            <div className="modal-content">
                <div style={{ display: 'flex', justifyContent: 'flex-end', cursor: "pointer" }}>
                    <span onClick={()=>{setUpdatePassword(false)}}><i className="fas fa-times"></i></span>
                </div>
                <Formik
                    initialValues={{ password: '', newPassword: '' }}
                    validationSchema={Yup.object({
                        password: Yup.string().trim().required('Current Password is required'),
                        newPassword: Yup.string().trim().required('Old Password is required')
                    })}
                    onSubmit={ async (values) => {
                        try {
                            let res = await axios.put(`${process.env.REACT_APP_BACKEND}v1/api/change_password`,values)
                                setUpdatePassword(false)
                                toast.success(res.data.message,{
                                    duration: 1500,
                                    position: 'top-right',
                                })
                            
                        } catch (error) {
                            toast.error(error.response.data.message,{
                                duration: 1500,
                                position: 'top-right',
                            })
                        }
                    }}
                >
                    <Form className="changePassword">

                        <div>
                            <h3 className="changePasswordHeading">Change Password</h3>
                        </div>
                        <div className="column">
                            <label className="changePassword_label" htmlFor="passsword">Current Password</label>
                            <Field className="changePassword_field" name="password" type="password" placeholder="Enter current password" />
                            <span className="err_msg"><ErrorMessage name="password" /></span>
                        </div>
                        <div className="column">
                            <label className="changePassword_label" htmlFor="newPassword">New Password</label>
                            <Field className="changePassword_field" name="newPassword" type="newPassword" placeholder="Enter new password" />
                            <span className="err_msg" > <ErrorMessage name="newPassword" /> </span>
                        </div>
                        <div>
                            <button className="changePasswordBtn" type="submit">Update</button>

                        </div>
                    </Form>

                </Formik>
            </div>
        </div>
    );
}

export default changePassword