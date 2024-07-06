import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import * as actions from "../redux/actions"
import requestApi from "../helpers/api"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState({})
    const [isSelectProfle, setIsSelectProfile] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()

    
    useEffect(() => {
        dispatch(actions.controlLoading(true))
        requestApi('/users/profile', "GET").then(res => {
            console.log(res)
            setProfileData({ ...res.data, avatar: process.env.REACT_APP_API_URL + "/" + res.data.avatar })
            dispatch(actions.controlLoading(false))
        }).catch(error => {
            console.log("error =>", error)
            dispatch(actions.controlLoading(false))
        })
    }, [])

    const onProfileChange = (event) => {
        if (event.target.files) {
            const file = event.target.files[0]
            let reader = new FileReader();
            reader.onload = (e) => {
                setProfileData({
                    ...profileData, avatar: reader.result, file: file
                })
                setIsSelectProfile(true)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmitFormAdd = async (data) => {
        dispatch(actions.controlLoading(true))
        console.log("Data=>", data)
        let formData = new FormData()
        for (let key in data) {
            if (key == 'avatar') {
                formData.append(key, data[key][0])
            }
            else {
                formData.append(key, data[key])
            }
        }
        try {
            const res = await requestApi('/upload', 'POST', formData, 'json', 'multipart/form-data')
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật ảnh đại diện thành công!', { position: "top-center", autoClose: 2000 })
            setTimeout(() => navigate("/profile"), 3000)
        } catch (error) {
            console.log("Error", error)
            dispatch(actions.controlLoading(false))
        }
    }

    const handelUpdateAvatar = () => {
        let formData = new FormData()
        formData.append('avatar', profileData.file)

        dispatch(actions.controlLoading(true))
        requestApi('/users/upload-avatar', 'POST', formData, 'json', 'multipart/form-data').then(res =>{
            console.log("res=>", res)
            dispatch(actions.controlLoading(false))
            setIsSelectProfile(false)
            toast.success("Cập nhật thông tin tài khoản thành công!", {position: 'top-center', autoClose:2000})
        }).catch(err =>{
            console.log("err=>", err)
            dispatch(actions.controlLoading(false))
        })
    }


    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h5 className="mt-4">Cập nhật thông tin người dùng</h5>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
                        <li className="breadcrumb-item active">Cập nhật thông tin người dùng</li>
                    </ol>
                    <div className='mb-3'>

                    </div>
                    <div className="card">
                        <div className="card-header">
                            Cập nhật ảnh đại diện
                        </div>
                        <div className="card-body">
                            <div className="row-md-3">
                                <div className="col-md-4">
                                    <img src={profileData.avatar ? profileData.avatar : "../assets/images/icon-avatar.png"} className="img-thumbnail rounded mb-3" /><br />
                                    <div className="input-file float-start">
                                        <label htmlFor="file" className="btn-file btn-sm btn btn-primary">Chon file</label>

                                        <input id="file" type="file" name="avatar" accept="image/*" onChange = {onProfileChange} />
                                    </div>
                                    <div className="mb-3">
                                        {isSelectProfle &&  <button type='button' onClick={handelUpdateAvatar} className='btn btn-sm btn-success float-end' ><i className="fa fa-plus"></i> Cập nhật</button>}
                                       
                                    </div>


                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Profile