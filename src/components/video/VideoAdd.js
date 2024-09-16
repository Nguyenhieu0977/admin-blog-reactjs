import { Link as LinkFix } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import requestApi from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import CustomUploadAdaptor from "../../helpers/CustomUploadAdapter";


const VideoAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  // const [category, setCatagory] = useState([]);
  const [thumbnailData, setThumbnailData] = useState("");
  const [videoData, setVideoData] = useState("");

  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

 
  const handleSubmitFormAdd = async (data) => {
    dispatch(actions.controlLoading(true));
    console.log("Data=>", data);
    let formData = new FormData();
    for (let key in data) {
      if (key == "thumbnail") {
        formData.append(key, data[key][0]);
      } else if (key == "url") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    try {
      const res = await requestApi(
        "/videos",
        "POST",
        formData,
        "json",
        "multipart/form-data"
      );
      console.log("res=>", res);
      dispatch(actions.controlLoading(false));
      toast.success("Thêm mới Video thành công!", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/videos"), 3000);
    } catch (error) {
      console.log("Error", error);
      dispatch(actions.controlLoading(false));
    }
  };

  // useEffect(() => {
  //   requestApi(`/categories`, "GET")
  //     .then((response) => {
  //       console.log("response=> ", response.data);
  //       setCatagory(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // console.log(category);
  const onThumbnailChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailData(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setVideoData(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  function UploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      // Configure the URL to the upload script in your backend here!
      return new CustomUploadAdaptor(loader);
    };
  }
  const onChange = (currentNode, selectedNodes) => {
    console.log("onChange::", currentNode, selectedNodes);
  };
  const onAction = (node, action) => {
    console.log("onAction::", action, node);
  };
  const onNodeToggle = (currentNode) => {
    console.log("onNodeToggle::", currentNode);
  };

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          {/* <h1 className="mt-4">Tables</h1> */}
          <ol className="breadcrumb mb-4 fixed-top bg-white pb-2">
            <li className="breadcrumb-item">
              <LinkFix to={"/"}>Trang chủ</LinkFix>
            </li>
            <li className="breadcrumb-item active">
              <LinkFix to={"/posts"}>Danh mục Video</LinkFix>
            </li>
            <li className="breadcrumb-item active">Thêm mới Video</li>
          </ol>
          {/* <div className='mb-3'>
                        <LinkFix className='btn btn-sm btn-success me-2' to="/users"><i className="fa fa-plus"></i> Trờ về danh mục bài viêt</LinkFix>
                    </div> */}
          <div className="card mb-4">
            <div className="card-header">Thêm mới Video</div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-5">
                    <div className="mb-1 mt-1">
                      <label className="form-label">Tiêu đề</label>
                      <div className="input-group">
                        <input
                          type="text"
                          {...register("title", {
                            required: "Tiêu đề không được để trống!",
                          })}
                          className="form-control"
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                        {errors.title && (
                          <p style={{ color: "red" }}>
                            {" "}
                            {errors.title.message}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* <div className="mb-1">
                      <label className="form-label">Mô tả ngắn</label>
                      <div className="input-group">
                        <textarea
                          rows={4}
                          type="text"
                          {...register("description", {
                            required: "Mô tả ngắn không được để trống!",
                          })}
                          className="form-control"
                          i
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                      </div>
                      {errors.description && (
                        <p style={{ color: "red" }}>
                          {" "}
                          {errors.description.message}
                        </p>
                      )}
                    </div> */}

<div className="md-3">
                      <label className="form-label">Ảnh đại diện</label>
                      <br />
                      {thumbnailData && (
                        <img
                          src={thumbnailData}
                          className="img-thumbnail rounded mb-3"
                        />
                      )}
                      <div className="input-file">
                        <label
                          htmlFor="file"
                          className="btn-file btn-sm btn btn-primary"
                        >
                          Chọn ảnh đại diện
                        </label>
                        <br />
                        <input
                          id="file"
                          type="file"
                          name="thumbnail"
                          accept="image/*"
                          {...register("thumbnail", {
                            required: "Ảnh đại diện không được để trống!",
                            onChange: onThumbnailChange,
                          })}
                        />
                      </div>
                      {errors.thumbnail && (
                        <p style={{ color: "red" }}>
                          {" "}
                          {errors.thumbnail.message}
                        </p>
                      )}
                    </div>

                    {/* <div className="mb-3">
                      <label className="form-label">Danh mục</label>
                      <div className="input-group">
                        <select
                          // defaultValue="default"
                          {...register("category")}
                          className="form-select form-select-sm"
                          aria-label="Small select example"
                          name="category"
                        >
                          <option value="default" disabled="disabled">
                            Chọn danh mục
                          </option>
                          {category?.map((item) => (
                            <>
                              <option value={item.id} key={item.id}>
                                {item.name}{" "}
                              </option>
                              {item?.children.map((i1) => (
                                <>
                                  <option value={i1.id} key={i1.id}>
                                    |---{i1.name}{" "}
                                  </option>
                                  {i1?.children.map((i2) => (
                                    <>
                                      <option value={i2.id} key={i2.id}>
                                        |------{i2.name}{" "}
                                      </option>
                                    </>
                                  ))}
                                </>
                              ))}
                            </>
                          ))}
                        </select>
                      </div>
                      {errors.category && (
                        <p style={{ color: "red" }}>
                          {" "}
                          {errors.category.message}
                        </p>
                      )}
                    </div> */}
                    <div className="mb-3">
                      <label className="form-label">Trạng thái</label>
                      <div className="input-group">
                        <select
                          // defaultValue="default"
                          {...register("status")}
                          className="form-select form-select-sm"
                          aria-label="Small select example"
                          name="status"
                        >
                          <option value="default" disabled="disabled">
                            Chọn trạng thái
                          </option>
                          <option value="1">Kích hoạt</option>
                          <option value="2">Chưa kích hoạt</option>
                        </select>
                      </div>
                      {errors.status && (
                        <p style={{ color: "red" }}>
                          {" "}
                          {errors.status.message}
                        </p>
                      )}
                    </div>


                    
                  </div>
                  <div className="col-md-7">
                  <div className="md-1">
                      <label className="form-label">Chọn Video đăng tải</label>
                      <br />
                      {videoData && (
                        <video
                          src={videoData}
                          controls
                          // autoplay
                          className="img-thumbnail rounded mb-3"
                        />
                      )}
                      <div className="input-file">
                        {/* <label
                          htmlFor="filevideo"
                          className="btn-file btn-sm btn btn-primary"
                        >
                          Chọn Video đăng tải
                        </label> */}
                        {/* <br /> */}
                        {/* <video id="video"></video> */}
                        <input
                          id="filevideo"
                          type="file"
                          name="url"
                          accept="video/mp4,video/mkv, video/x-m4v,video/*"
                          {...register("url", {
                            required: "Video đăng tải không được để trống!",
                            onChange: onVideoChange,
                          })}
                          
                        />
                      </div>
                      {errors.url && (
                        <p style={{ color: "red" }}>
                          {" "}
                          {errors.url.message}
                        </p>
                      )}
                    </div>



                    
                    <div className="mb-3 mt-3">
                      <div className="input-group">
                        <button
                          type="button"
                          onClick={handleSubmit(handleSubmitFormAdd)}
                          className="btn btn-info"
                        >
                          Thêm mới
                        </button>
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
  );
};

export default VideoAdd;
