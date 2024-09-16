import { Link as LinkFix, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import * as actions from "../../redux/actions"
import requestApi from "../../helpers/api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import CustomUploadAdaptor from "../../helpers/CustomUploadAdapter"


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
		initialData:
			'<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n    You\'ve successfully created a CKEditor 5 project. This powerful text editor will enhance your application, enabling rich text editing\n    capabilities that are customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n    <li>\n        <strong>Integrate into your app</strong>: time to bring the editing into your application. Take the code you created and add to your\n        application.\n    </li>\n    <li>\n        <strong>Explore features:</strong> Experiment with different plugins and toolbar options to discover what works best for your needs.\n    </li>\n    <li>\n        <strong>Customize your editor:</strong> Tailor the editor\'s configuration to match your application\'s style and requirements. Or even\n        write your plugin!\n    </li>\n</ol>\n<p>\n    Keep experimenting, and don\'t hesitate to push the boundaries of what you can achieve with CKEditor 5. Your feedback is invaluable to us\n    as we strive to improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n    <li>📝 <a href="https://orders.ckeditor.com/trial/premium-features">Trial sign up</a>,</li>\n    <li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n    <li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n    <li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n    <li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n    See this text, but the editor is not starting up? Check the browser\'s console for clues and guidance. It may be related to an incorrect\n    license key if you use premium features or another feature-related requirement. If you cannot make it work, file a GitHub issue, and we\n    will help as soon as possible!\n</p>\n',
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
		placeholder: 'Type or paste your content here!',
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
    

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    {/* <h1 className="mt-4">Tables</h1> */}
                    <ol className="breadcrumb mb-4 fixed-top bg-white pb-2">
                        <li className="breadcrumb-item"><LinkFix to={"/"}>Trang chủ</LinkFix></li>
                        <li className="breadcrumb-item active"><LinkFix to={"/posts"}>Danh mục bài viết</LinkFix></li>
                        <li className="breadcrumb-item active">Cập nhật bài viết</li>
                    </ol>
                    {/* <div className='mb-3'>
                        <LinkFix className='btn btn-sm btn-success me-2' to="/users"><i className="fa fa-plus"></i> Trờ về danh mục bài viêt</LinkFix>
                    </div> */}
                    <div className="card mb-0 mt-0">
                        <div className="card-header">
                            Cập nhật bài viết
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row">
                                <div className="col-md-8">
                                    <div className="mb-3 mt-0">
                                        <label className="form-label">Tiêu đề</label>
                                        <div className="input-group">
                                            <input type="text" {...register('title', { required: 'Tiêu đề không được để trống!' })} className="form-control" aria-describedby="basic-addon3 basic-addon4" />
                                            {errors.title && <p style={{ color: "red" }}> {errors.title.message}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-1 mt-0">
                                        <label className="form-label">Mô tả ngắn</label>
                                        <div className="input-group">
                                            <textarea rows={4} type="text" {...register('summary', { required: 'Mô tả ngắn không được để trống!' })} className="form-control" i aria-describedby="basic-addon3 basic-addon4" />

                                        </div>
                                        {errors.summary && <p style={{ color: "red" }}> {errors.summary.message}</p>}
                                    </div>
                                    <div className="mb-1 mt-0">
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
                                            
                                            config={ editorConfig}
                                        />
                                        {errors.description && <p style={{ color: "red" }}> {errors.description.message}</p>}
                                    </div>
                                    
                                </div>
                                <div className="col-md-4">
                                    
                                    <div className="md-3">
                                        <label className="form-label" >Ảnh đại diện</label><br />
                                        {postData.thumbnail && <img src={postData.thumbnail} className="img-thumbnail rounded mb-3" />}
                                        <div className="input-file">
                                            <label htmlFor="file" className="btn-file btn-sm btn btn-primary">Chọn ảnh đại diện</label><br />
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