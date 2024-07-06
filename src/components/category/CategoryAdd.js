import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import * as actions from "../../redux/actions"
import requestApi from "../../helpers/api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

const CategoryAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const [category, setCatagory] = useState([])

    const handleSubmitFormAdd = async (data) => {
        dispatch(actions.controlLoading(true))
        console.log("Data=>", data)
        try {
            const res = await requestApi('/categories', 'POST', data)
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Tạo danh mục thành công!', { position: "top-center", autoClose: 2000 })
            setTimeout(()=>navigate("/categories"), 3000)
        } catch (error) {
            console.log("Error", error)
            dispatch(actions.controlLoading(false))
        }
    }

    useEffect(() => {
        requestApi(`/categories`, 'GET').then(response => {
            console.log("response=> ", response.data)
            setCatagory(response.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    {/* <h1 className="mt-4">Tables</h1> */}
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
                        <li className="breadcrumb-item active">Thêm mới danh mục</li>
                    </ol>
                    <div className='mb-3'>
                        <Link className='btn btn-sm btn-success me-2' to="/users"><i className="fa fa-plus"></i> Danh sách danh mục</Link>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">
                            Thêm mới tài khoản
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="col-md-6">
                                    <div className="mb-3 mt-3">
                                        <label className="form-label">Tên danh mục</label>
                                        <div className="input-group">
                                            <input type="text" {...register('name', { required: 'Tên danh mục không được để trống!' })} className="form-control" aria-describedby="basic-addon3 basic-addon4" />
                                            {errors.name && <p style={{ color: "red" }}> {errors.name.message}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <label className="form-label">Tên danh mục</label>
                                        <div className="input-group">
                                            <input type="text" {...register('description', { required: 'Mô tả danh mục không được để trống!' })} className="form-control" aria-describedby="basic-addon3 basic-addon4" />
                                            {errors.description && <p style={{ color: "red" }}> {errors.description.message}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <label className="form-label">Danh mục cha</label>
                                        <div className="input-group">
                                            <select defaultValue="default" {...register('idCate')} className="form-select form-select-sm" aria-label="Small select example">
                                                <option value={0} >--Chọn danh mục--</option>
                                                {category?.map(item => (
                                                    <>
                                                        <option value={item.id} key={item.id}>{item.name} </option>
                                                        {item?.children.map(i => (
                                                            <>
                                                                <option value={i.id} key={i.id}>|---{i.name} </option>
                                                                {i?.children.map(i2 => (
                                                                    <>
                                                                        <option value={i2.id} key={i2.id}>|------{i2.name} </option>
                                                                    </>
                                                                ))}
                                                            </>
                                                        ))}
                                                    </>
                                                )
                                                )}
                                            </select>
                                        </div>
                                            {errors.idCate && <p style={{ color: "red" }}> {errors.idCate.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Trạng thái</label>
                                        <div className="input-group">
                                            <select defaultValue="default" {...register('status')} className="form-select form-select-sm" aria-label="Small select example">
                                                <option value="default" disabled="disabled">Chọn trạng thái</option>
                                                <option value="1">Kích hoạt</option>
                                                <option value="2">Không kích hoạt</option>
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

export default CategoryAdd