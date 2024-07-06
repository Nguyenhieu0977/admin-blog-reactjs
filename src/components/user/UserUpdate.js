import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import * as actions from "../../redux/actions"
import { useEffect } from "react"
import requestApi from "../../helpers/api"
import { toast } from "react-toastify"

const UserUpdate = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    console.log(params.id)
    const {register, setValue, handleSubmit, formState:{errors}} = useForm()

    useEffect(()=>{
        dispatch(actions.controlLoading(true))
        try {
            const getDetailUser = async()=>{
                const res = await requestApi(`/users/${params.id}`, 'GET')
                console.log("res=>",res)
                dispatch(actions.controlLoading(false))
                const fields = ['first_name', 'last_name', 'status']
                fields.forEach((field) => setValue(field, res.data[field]));
            } 
            getDetailUser()
        } catch (error) {
            console.log("Error=>", error)
            dispatch(actions.controlLoading(false))
        }
    },[])

    const handleSubmitFormUpadte = async (data)=>{
        dispatch(actions.controlLoading(true))
        console.log(data)
        try {
            const res = await requestApi(`/users/${params.id}`,'PUT',data)
            dispatch(actions.controlLoading(false))
            toast.success('Update successfully', {position:'top-center', autoClose:2000})
            setTimeout(()=>navigate('/users'),3000)
            
        } catch (error) {
            console.log('error =>', error)
            dispatch(actions.controlLoading(false))
        }
    }

  return (
    <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Tables</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li className="breadcrumb-item active">Tables</li>
                    </ol>
                    <div className='mb-3'>
                        <Link className='btn btn-sm btn-success me-2' to="/users"><i className="fa fa-plus"></i> Users List</Link>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">
                            Add User
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="col-md-6">
                                    <div className="mb-3 mt-3">
                                        <label className="form-label">First Name</label>
                                        <div className="input-group">
                                            <input type="text" {...register('first_name', { required: 'Ten khong duoc de trong!' })} className="form-control" aria-describedby="basic-addon3 basic-addon4" />
                                            {errors.first_name && <p style={{ color: "red" }}> {errors.first_name.message}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Last Name</label>
                                        <div className="input-group">
                                            <input type="text" {...register('last_name', { required: 'Ho ten lot khong duoc de trong!' })} className="form-control" i aria-describedby="basic-addon3 basic-addon4" />

                                        </div>
                                        {errors.last_name && <p style={{ color: "red" }}> {errors.last_name.message}</p>}
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <div className="input-group">
                                            <select {...register('status')} className="form-select form-select-sm" aria-label="Small select example">
                                                <option selected>Chon trang thai</option>
                                                <option value="1">Active</option>
                                                <option value="2">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <div className="input-group">
                                            <button type="button" onClick={handleSubmit(handleSubmitFormUpadte)} className="btn btn-info">Add</button>
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

export default UserUpdate