import { Link as LinkFix, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import requestApi from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const VideoUpdate = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  //   const [category, setCatagory] = useState([]);
  const [videoData, setVideoData] = useState({});

  const handleSubmitFormAdd = async (data) => {
    dispatch(actions.controlLoading(true));
    console.log("Data=>", data);
    let formData = new FormData();
    for (let key in data) {
      if (key === "thumbnail") {
        if (data.thumbnail[0] instanceof File) {
          formData.append(key, data[key][0]);
        }
      } else if (key === "url") {
        if (data.url[0] instanceof File) {
          formData.append(key, data[key][0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }
    try {
      const res = await requestApi(
        `/videos/${params.id}`,
        "PUT",
        formData,
        "json",
        "multipart/form-data"
      );
      console.log("res=>", res);
      dispatch(actions.controlLoading(false));
      toast.success("Cập nhật Video thành công!", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/videos"), 3000);
    } catch (error) {
      console.log("Error", error);
      dispatch(actions.controlLoading(false));
    }
  };

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    try {
      const renderData = async () => {
        const detailVideo = await requestApi(`/videos/${params.id}`, "GET");
        console.log("detailPost=>", detailVideo);
        const fields = ["title", "thumbnail", "url", "status"];
        fields.forEach((field) => {
          setValue(field, detailVideo.data[field]);
          setVideoData({
            ...detailVideo.data,
            thumbnail:
              process.env.REACT_APP_API_URL + "/" + detailVideo.data.thumbnail,
            url: process.env.REACT_APP_API_URL + "/" + detailVideo.data.url,
          });
          dispatch(actions.controlLoading(false));
        });
      };
      renderData();
    } catch (error) {
      console.log("err=>", error);
      dispatch(actions.controlLoading(false));
    }
  }, []);
  // console.log(category)]
  const onThumbnailChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setVideoData({ ...videoData, thumbnail: reader.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setVideoData({ ...videoData, url: reader.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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
              <LinkFix to={"/videos"}>Danh mục Video</LinkFix>
            </li>
            <li className="breadcrumb-item active">Cập nhật Video</li>
          </ol>
          {/* <div className='mb-3'>
                        <LinkFix className='btn btn-sm btn-success me-2' to="/users"><i className="fa fa-plus"></i> Trờ về danh mục bài viêt</LinkFix>
                    </div> */}
          <div className="card mb-0 mt-0">
            <div className="card-header">Cập nhật Video</div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-5">
                    <div className="mb-3 mt-0">
                      <label className="form-label">Tiêu đề Video</label>
                      <div className="input-group">
                        <input
                          type="text"
                          {...register("title", {
                            required: "Tiêu đề Video không được để trống!",
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
                    <div className="md-3">
                      <label className="form-label">Ảnh đại diện</label>
                      <br />
                      {videoData.thumbnail && (
                        <img
                          src={videoData.thumbnail}
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
                            onChange: onThumbnailChange,
                          })}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Trạng thái</label>
                      <div className="input-group">
                        <select
                          defaultValue={videoData.status?.id}
                          {...register("status")}
                          className="form-select form-select-sm"
                          aria-label="Small select example"
                        >
                          <option value="1">Kích hoạt</option>
                          <option value="2">Chưa kích hoạt</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="md-1">
                      <label className="form-label">Chọn Video đăng tải</label>
                      <br />
                      {videoData.url && (
                        <video
                          src={videoData.url}
                          controls
                          className="img-thumbnail rounded mb-3"
                        />
                      )}
                      <div className="input-file">
                        <input
                          id="filevideo"
                          type="file"
                          name="url"
                          accept="video/mp4,video/mkv, video/x-m4v,video/*"
                          {...register("url", {
                            onChange: onVideoChange,
                          })}
                        />
                      </div>
                    </div>
                    <div className="mb-3 mt-3">
                      <div className="input-group">
                        <button
                          type="button"
                          onClick={handleSubmit(handleSubmitFormAdd)}
                          className="btn btn-info"
                        >
                          Cập nhật
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

export default VideoUpdate;
