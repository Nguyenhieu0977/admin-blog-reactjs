import { Link as LinkFix } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import requestApi from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react"
// import ClassicEditor from "@ckeditor/ckeditor5-bui?ld-classic"
import CustomUploadAdaptor from "../../helpers/CustomUploadAdapter";
// import { TableOfContents } from 'ckeditor5-premium-features';
// import DropdownTreeSelect from 'react-dropdown-tree-select'
// import 'react-dropdown-tree-select/dist/styles.css'

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
AccessibilityHelp,
Alignment,
Autoformat,
AutoImage,
AutoLink,
Autosave,
BlockQuote,
Bold,
Code,
CodeBlock,
Essentials,
FindAndReplace,
FontBackgroundColor,
FontColor,
FontFamily,
FontSize,
FullPage,
GeneralHtmlSupport,
Heading,
Highlight,
HorizontalLine,
HtmlComment,
HtmlEmbed,
ImageBlock,
ImageCaption,
ImageInline,
ImageInsert,
ImageInsertViaUrl,
ImageResize,
ImageStyle,
ImageTextAlternative,
ImageToolbar,
ImageUpload,
Indent,
IndentBlock,
Italic,
Link,
LinkImage,
List,
ListProperties,
Markdown,
MediaEmbed,
Paragraph,
PasteFromMarkdownExperimental,
RemoveFormat,
SelectAll,
ShowBlocks,
SimpleUploadAdapter,
SourceEditing,
SpecialCharacters,
SpecialCharactersArrows,
SpecialCharactersCurrency,
SpecialCharactersEssentials,
SpecialCharactersLatin,
SpecialCharactersMathematical,
SpecialCharactersText,
Strikethrough,
Style,
Subscript,
Superscript,
Table,
TableCaption,
TableCellProperties,
TableColumnResize,
TableProperties,
TableToolbar,
TextTransformation,
TodoList,
Underline,
Undo
} from "ckeditor5";

import translations from "ckeditor5/translations/vi.js";

import "ckeditor5/ckeditor5.css";

const PostAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const [category, setCatagory] = useState([]);
  const [thumbnailData, setThumbnailData] = useState("");

  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    extraPlugins: [UploadPlugin],
    toolbar: {
        items: [
    'undo',
    'redo',
    '|',
    'sourceEditing',
    'showBlocks',
    'findAndReplace',
    'selectAll',
    '|',
    'heading',
    'style',
    '|',
    'fontSize',
    'fontFamily',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'subscript',
    'superscript',
    'code',
    'removeFormat',
    '|',
    'specialCharacters',
    'horizontalLine',
    'link',
    'insertImage',
    'insertImageViaUrl',
    'mediaEmbed',
    'insertTable',
    'highlight',
    'blockQuote',
    'codeBlock',
    'htmlEmbed',
    '|',
    'alignment',
    '|',
    'bulletedList',
    'numberedList',
    'todoList',
    'indent',
    'outdent',
    '|',
    'accessibilityHelp'
  ],
  shouldNotGroupWhenFull: true
    },
    plugins: [
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  Paragraph,
  PasteFromMarkdownExperimental,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SimpleUploadAdapter,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo
],
    fontFamily: {
  supportAllValues: true
},
fontSize: {
  options: [10, 12, 14, 'default', 18, 20, 22],
  supportAllValues: true
},
heading: {
  options: [
    {
      model: 'paragraph',
      title: 'Paragraph',
      class: 'ck-heading_paragraph'
    },
    {
      model: 'heading1',
      view: 'h1',
      title: 'Heading 1',
      class: 'ck-heading_heading1'
    },
    {
      model: 'heading2',
      view: 'h2',
      title: 'Heading 2',
      class: 'ck-heading_heading2'
    },
    {
      model: 'heading3',
      view: 'h3',
      title: 'Heading 3',
      class: 'ck-heading_heading3'
    },
    {
      model: 'heading4',
      view: 'h4',
      title: 'Heading 4',
      class: 'ck-heading_heading4'
    },
    {
      model: 'heading5',
      view: 'h5',
      title: 'Heading 5',
      class: 'ck-heading_heading5'
    },
    {
      model: 'heading6',
      view: 'h6',
      title: 'Heading 6',
      class: 'ck-heading_heading6'
    }
  ]
},
htmlSupport: {
  allow: [
    {
      name: /^.*$/,
      styles: true,
      attributes: true,
      classes: true
    }
  ]
},
image: {
  toolbar: [
    'toggleImageCaption',
    'imageTextAlternative',
    '|',
    'imageStyle:inline',
    'imageStyle:wrapText',
    'imageStyle:breakText',
    '|',
    'resizeImage'
  ]
},
initialData: '',
language: 'vi',
link: {
  addTargetToExternalLinks: true,
  defaultProtocol: 'https://',
  decorators: {
    toggleDownloadable: {
      mode: 'manual',
      label: 'Downloadable',
      attributes: {
        download: 'file'
      }
    }
  }
},
list: {
  properties: {
    styles: true,
    startIndex: true,
    reversed: true
  }
},
menuBar: {
  isVisible: true
},
placeholder: 'Nhập nội dung bài viết tại đây!',
style: {
  definitions: [
    {
      name: 'Article category',
      element: 'h3',
      classes: ['category']
    },
    {
      name: 'Title',
      element: 'h2',
      classes: ['document-title']
    },
    {
      name: 'Subtitle',
      element: 'h3',
      classes: ['document-subtitle']
    },
    {
      name: 'Info box',
      element: 'p',
      classes: ['info-box']
    },
    {
      name: 'Side quote',
      element: 'blockquote',
      classes: ['side-quote']
    },
    {
      name: 'Marker',
      element: 'span',
      classes: ['marker']
    },
    {
      name: 'Spoiler',
      element: 'span',
      classes: ['spoiler']
    },
    {
      name: 'Code (dark)',
      element: 'pre',
      classes: ['fancy-code', 'fancy-code-dark']
    },
    {
      name: 'Code (bright)',
      element: 'pre',
      classes: ['fancy-code', 'fancy-code-bright']
    }
  ]
},
table: {
  contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
},
translations: [translations]
}

  const handleSubmitFormAdd = async (data) => {
    dispatch(actions.controlLoading(true));
    console.log("Data=>", data);
    let formData = new FormData();
    for (let key in data) {
      if (key == "thumbnail") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    try {
      const res = await requestApi(
        "/posts",
        "POST",
        formData,
        "json",
        "multipart/form-data"
      );
      console.log("res=>", res);
      dispatch(actions.controlLoading(false));
      toast.success("Thêm mới bài viết thành công!", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/posts"), 3000);
    } catch (error) {
      console.log("Error", error);
      dispatch(actions.controlLoading(false));
    }
  };

  useEffect(() => {
    requestApi(`/categories`, "GET")
      .then((response) => {
        console.log("response=> ", response.data);
        setCatagory(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(category);
  const onThumbnailChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailData(reader.result);
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
              <LinkFix to={"/posts"}>Danh mục bài viết</LinkFix>
            </li>
            <li className="breadcrumb-item active">Thêm mới bài viết</li>
          </ol>
          {/* <div className='mb-3'>
                        <LinkFix className='btn btn-sm btn-success me-2' to="/users"><i className="fa fa-plus"></i> Trờ về danh mục bài viêt</LinkFix>
                    </div> */}
          <div className="card mb-4">
            <div className="card-header">Thêm mới bài viết</div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-8">
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
                    <div className="mb-1">
                      <label className="form-label">Mô tả ngắn</label>
                      <div className="input-group">
                        <textarea
                          rows={4}
                          type="text"
                          {...register("summary", {
                            required: "Mô tả ngắn không được để trống!",
                          })}
                          className="form-control"
                          i
                          aria-describedby="basic-addon3 basic-addon4"
                        />
                      </div>
                      {errors.summary && (
                        <p style={{ color: "red" }}>
                          {" "}
                          {errors.summary.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-1">
                      <label className="form-label">Nội dung bài viết</label>
                      {/* <CKEditor
                              editor={ClassicEditor}
                              onReady={(editor) => {
                                register("description", {
                                  required: "Nội dung không được để trống!",
                                });
                              }}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log("editor=>", data);
                                setValue("description", data);
      
                                trigger("description");
                              }}
                              config={editorConfig}
                            /> */}
                      <CKEditor
                        editor={ClassicEditor}
                        // data="<p>Hello from CKEditor&nbsp;5!</p>"
                        onReady={(editor) => {
                          register("description", {
                            required: "Nội dung không được để trống!",
                          });
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          console.log("editor=>", data);
                          setValue("description", data);

                          trigger("description");
                        }}
                        config={
                          editorConfig
                        }
                      />
                      {/* <div className="input-group">
                                            <textarea type="text" {...register('descripton', { required: 'Nội dung không được để trống!' })} className="form-control" i aria-describedby="basic-addon3 basic-addon4" />

                                        </div> */}
                      {errors.description && (
                        <p style={{ color: "red" }}>
                          {" "}
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
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
                          Chon ảnh đại diện
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
                                        <label className="form-label">Email</label>
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
                                    </div> */}
                    <div className="mb-3">
                      <label className="form-label">Danh mục</label>
                      <div className="input-group">
                        <select
                          defaultValue="default"
                          {...register("category")}
                          className="form-select form-select-sm"
                          aria-label="Small select example"
                        >
                          <option value="default" disabled="disabled">
                            Chọn danh mục
                          </option>
                          {category?.map((item) => (
                            <>
                              <option value={item.id} key={item.id}>
                                {item.name}{" "}
                              </option>
                              {item?.children.map((i) => (
                                <>
                                  <option value={i.id} key={i.id}>
                                    |---{i.name}{" "}
                                  </option>
                                  {i?.children.map((i2) => (
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
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Trạng thái</label>
                      <div className="input-group">
                        <select
                          defaultValue="default"
                          {...register("status")}
                          className="form-select form-select-sm"
                          aria-label="Small select example"
                        >
                          <option value="default" disabled="disabled">
                            Chọn trạng thái
                          </option>
                          <option value="1">Kích hoạt</option>
                          <option value="2">Chưa kích hoạt</option>
                        </select>
                      </div>
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

export default PostAdd;
