import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import requestApi from '../helpers/api';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onChange = (event) => {
        let target = event.target;
        setLoginData({
            ...loginData, [target.name]: target.value
        });
    }

    useEffect(() => {
        if (isSubmitted) {
            validateForm();
        }
    }, [loginData])

    const validateForm = () => {
        let isValid = true;
        const errors = {};
        if (loginData.email === '' || loginData.email === undefined) {
            errors.email = "Bạn vui lòng nhập Email"
        } else {
            let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginData.email)
            if (!valid) {
                errors.email = "Email không đúng định dạng!"
            }
        }

        if (loginData.password === '' || loginData.password === undefined) {
            errors.password = "Vui lòng nhập mật khẩu!"
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            isValid = false;
        } else {
            setFormErrors({});
        }

        return isValid;
    }

    const onSubmit = () => {
        console.log(loginData)
        let valid = validateForm();
        if (valid) {
            //request login api
            console.log("request login api")
            dispatch(actions.controlLoading(true))
            requestApi('/auth/login', 'POST', loginData).then((res) => {
                console.log(res)
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                dispatch(actions.controlLoading(false))
                navigate('/');
            }).catch(err => {
                dispatch(actions.controlLoading(false))
                console.log(err)
                if (typeof err.response !== "undefined") {
                    if (err.response.status !== 201) {
                        toast.error(err.response.data.message, { position: "top-center" })
                    }
                } else {
                    toast.error("Máy chủ không hoạt động. Vui lòng liên hệ quản trị viên!", { position: "top-center" })
                }
            })
        }

        setIsSubmitted(true);
    }

    return (
        <div id="layoutAuthentication" className='bg-primary'>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" type="email" name='email' onChange={onChange} placeholder="Ví dụ: khachieu@qk7.bqp" />
                                                <label>Email address</label>
                                                {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name='password' type="password" onChange={onChange} placeholder="Nhập mật khẩu" />
                                                <label>Password</label>
                                                {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a className="small" href="password.html">Forgot Password?</a>
                                                <button className="btn btn-primary" type='button' onClick={onSubmit}>Đăng nhập</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small">
                                            <Link to='/register'>Bạn chưa có tài khoản? Đăng ký!</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Ban Công nghệ thông tin Quân khu 7 - 2024</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Login