import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import * as actions from "../../redux/actions"
import requestApi from "../../helpers/api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const UserAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleSubmitFormAdd = async (data) => {
        dispatch(actions.controlLoading(true))
        console.log("Data=>", data)
        try {
            const res = await requestApi('/users', 'POST', data)
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Tạo tài khoản thành công!', { position: "top-center", autoClose: 2000 })
            setTimeout(()=>navigate("/users"), 3000)
        } catch (error) {
            console.log("Error", error)
            dispatch(actions.controlLoading(false))
        }
    }


    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    {/* <h1 className="mt-4">Tables</h1> */}
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li className="breadcrumb-item active">Thêm mới tài khoản</li>
                    </ol>
                    <div className='mb-3'>
                        <Link className='btn btn-sm btn-success me-2' to="/users"><i className="fa fa-plus"></i> Danh sách tài khoản</Link>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">
                            Thêm mới tài khoản
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="col-md-6">
                                    <div className="mb-3 mt-3">
                                        <label className="form-label">Tên</label>
                                        <div className="input-group">
                                            <input type="text" {...register('first_name', { required: 'Tên không được để trống!' })} className="form-control" aria-describedby="basic-addon3 basic-addon4" />
                                            {errors.first_name && <p style={{ color: "red" }}> {errors.first_name.message}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Họ và tên lót</label>
                                        <div className="input-group">
                                            <input type="text" {...register('last_name', { required: 'Họ, tên lót không được để trống!' })} className="form-control" i aria-describedby="basic-addon3 basic-addon4" />

                                        </div>
                                        {errors.last_name && <p style={{ color: "red" }}> {errors.last_name.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Địa chỉ mail</label>
                                        <div className="input-group">
                                            <input
                                                {...register('email', {
                                                    required: 'Email khong duoc de trong!',
                                                    pattern: {
                                                        value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                                        message: 'Invalid Email address'
                                                    }
                                                })}
                                                type="email" className="form-control" aria-describedby="basic-addon3 basic-addon4" />

                                        </div>
                                        {errors.email && <p style={{ color: "red" }}> {errors.email.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Mật khẩu</label>
                                        <div className="input-group">
                                            <input type="password" {...register('password', { required: 'Mật khẩu không được để trống!' })} className="form-control" aria-describedby="basic-addon3 basic-addon4" />

                                        </div>
                                        {errors.password && <p style={{ color: "red" }}> {errors.password.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Trạng thái</label>
                                        <div className="input-group">
                                            <select defaultValue="default" {...register('status')} className="form-select form-select-sm" aria-label="Small select example">
                                                <option value="default" disabled="disabled">Chọn trạng thái</option>
                                                <option value="1">Active</option>
                                                <option value="2">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <div className="input-group">
                                            <button type="button" onClick={handleSubmit(handleSubmitFormAdd)} className="btn btn-info">Thêm mới</button>
                                        </div>


                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </main>

        </div>
    )
}

export default UserAdd