import { Link, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import * as actions from "../../redux/actions"
import requestApi from "../../helpers/api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import CustomUploadAdaptor from "../../helpers/CustomUploadAdapter"
const PostUpdate = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const { register, setValue, handleSubmit, trigger, formState: { errors } } = useForm()
    const [category, setCatagory] = useState([])
    const [postData, setPostData] = useState({})


    const handleSubmitFormAdd = async (data) => {
        dispatch(actions.controlLoading(true))
        console.log("Data=>", data)
        let formData = new FormData()
        for (let key in data) {
            if (key === 'thumbnail') {
                if (data.thumbnail[0] instanceof File) {
                    formData.append(key, data[key][0])
                }
            }
            else {
                formData.append(key, data[key])
            }
        }
        try {
            const res = await requestApi(`/posts/${params.id}`, 'PUT', formData, 'json', 'multipart/form-data')
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Cập nhật bài viết thành công!', { position: "top-center", autoClose: 2000 })
            setTimeout(() => navigate("/posts"), 3000)
        } catch (error) {
            console.log("Error", error)
            dispatch(actions.controlLoading(false))
        }
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        try {
            const renderData = async () => {
                const res = await requestApi("/categories", "GET")
                console.log("res=>", res.data)
                setCatagory(res.data)
                const detailPost = await requestApi(`/posts/${params.id}`, 'GET')
                console.log('detailPost=>', detailPost)
                const fields = ['title', 'summary', 'description', 'thumbnail', 'category', 'status']
                fields.forEach(field => {
                    if (field == 'category') {
                        setValue(field, detailPost.data[field].id)
                    } else {
                        setValue(field, detailPost.data[field])
                    }
                    setPostData({ ...detailPost.data, thumbnail: process.env.REACT_APP_API_URL + '/' + detailPost.data.thumbnail })
                    dispatch(actions.controlLoading(false))
                })
            }
            renderData()

        } catch (error) {
            console.log('err=>', error)
            dispatch(actions.controlLoading(false))

        }
    }, [])
    // console.log(category)]
    const onThumbnailChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setPostData({ ...postData, thumbnail: reader.result })
                // setThumbnailData(reader.result)
            }
            reader.readAsDataURL(event.target.files[0])
        }
    }

    function UploadPlugin( editor ) {
        editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
            // Configure the URL to the upload script in your backend here!
            return new CustomUploadAdaptor( loader );
        };
    }

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    {/* <h1 className="mt-4">Tables</h1> */}
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><Link to={"/"}>Trang chủ</Link></li>
                        <li className="breadcrumb-item active"><Link to={"/posts"}>Danh mục bài viết</Link></li>
                        <li className="breadcrumb-item active">Thêm mới bài viết</li>
                    </ol>
                    <div className='mb-3'>
                        <Link className='btn btn-sm btn-success me-2' to="/users"><i className="fa fa-plus"></i> Trờ về danh mục bài viêt</Link>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">
                            Thêm mới bài viết
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3 mt-3">
                                        <label className="form-label">Tiêu đề</label>
                                        <div className="input-group">
                                            <input type="text" {...register('title', { required: 'Tiêu đề không được để trống!' })} className="form-control" aria-describedby="basic-addon3 basic-addon4" />
                                            {errors.title && <p style={{ color: "red" }}> {errors.title.message}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Mô tả ngắn</label>
                                        <div className="input-group">
                                            <textarea rows={4} type="text" {...register('summary', { required: 'Mô tả ngắn không được để trống!' })} className="form-control" i aria-describedby="basic-addon3 basic-addon4" />

                                        </div>
                                        {errors.summary && <p style={{ color: "red" }}> {errors.summary.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nội dung bài viết</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={postData.description}
                                            onReady={editor => {
                                                register('description', { required: 'Nội dung không được để trống!' })
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                console.log("editor=>", data);
                                                setValue("description", data)
                                                trigger('description')
                                            }}
                                            config={{
                                                extraPlugins: [UploadPlugin]
                                            }}
                                        />
                                        {errors.description && <p style={{ color: "red" }}> {errors.description.message}</p>}
                                    </div>
                                    
                                </div>
                                <div className="col-md-6">
                                    
                                    <div className="md-3">
                                        <label className="form-label" >Ảnh đại diện</label><br />
                                        {postData.thumbnail && <img src={postData.thumbnail} className="img-thumbnail rounded mb-3" />}
                                        <div className="input-file">
                                            <label htmlFor="file" className="btn-file btn-sm btn btn-primary">Chon ảnh đại diện</label><br />
                                            <input id="file" type="file" name="thumbnail" accept="image/*" {...register('thumbnail', {onChange: onThumbnailChange})}/>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Danh mục</label>
                                        <div className="input-group">
                                        <select defaultValue="default" {...register('category')} className="form-select form-select-sm" aria-label="Small select example">
                                                <option value="default" disabled="disabled">Chọn danh mục</option>
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
                                        {errors.category && <p style={{ color: "red" }}> {errors.category.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Trạng thái</label>
                                        <div className="input-group">
                                            <select defaultValue={postData.category?.id} {...register('status')} className="form-select form-select-sm" aria-label="Small select example">
                                                <option value="1">Kích hoạt</option>
                                                <option value="2">Chưa kích hoạt</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <div className="input-group">
                                            <button type="button" onClick={handleSubmit(handleSubmitFormAdd)} className="btn btn-info">Cập nhật</button>
                                        </div>
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

export default PostUpdate