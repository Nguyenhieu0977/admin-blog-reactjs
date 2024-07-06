import React, { useEffect, useState } from 'react'
import DataTable from '../common/DataTable'
import requestApi from '../../helpers/api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormatDatetime from '../../helpers/common'

const PostList = () => {
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const [numOfPage, setNumOfPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())

    const columns = [
        {
            name: "ID",
            element: row => row.id
        },
        {
            name: "Tiêu đề",
            element: row => row.title
        },
        {
            name: "Mô tả",
            element: row => row.summary
        },
        {
            name: "Ảnh đại diện",
            element: row => <img width="100px" src={process.env.REACT_APP_API_URL + '/' + row.thumbnail} />
        },
        {
            name: "Thời gian tạo",
            element: row => FormatDatetime(row.created_at)
        },
        {
            name: "Thời gian cập nhật",
            element: row => FormatDatetime(row.updated_at)
        },
        {
            name: "Thao tác",
            element: row => (
                <>
                <Link to={`/post/edit/${row.id}`} className="btn btn-sm btn-warning me-1"><i className="fa fa-pencil"></i></Link>
                    {/* <button type="button" className="btn btn-sm btn-warning me-1"><i className="fa fa-pencil"></i> Edit</button> */}
                    <button type="button" className="btn btn-sm btn-danger me-1" onClick={() => handleDelete(row.id)}><i className="fa fa-trash"></i></button>
                </>
            )
        }
    ]

    const handleDelete = (id) => {
        console.log("single delete with id => ", id)
        setShowModal(true)
        setDeleteItem(id)
        setDeleteType('single')
    }

    const handleMultiDelete = () => {
        console.log("multi delete => ", selectedRows)
        setShowModal(true)
        setDeleteType('multi')
    }

    const requestDeleteApi = () => {
        if (deleteType === 'single') {
            dispatch(actions.controlLoading(true))
            requestApi(`/users/${deleteItem}`, 'DELETE', []).then(response => {
                setShowModal(false)
                setRefresh(Date.now())
                dispatch(actions.controlLoading(false))
            }).catch(err => {
                console.log(err)
                setShowModal(false)
                dispatch(actions.controlLoading(false))
            })
        } else {
            dispatch(actions.controlLoading(true))
            requestApi(`/users/multiple?ids=${selectedRows.toString()}`, 'DELETE', []).then(response => {
                setShowModal(false)
                setRefresh(Date.now())
                setSelectedRows([])
                dispatch(actions.controlLoading(false))
            }).catch(err => {
                console.log(err)
                setShowModal(false)
                dispatch(actions.controlLoading(false))
            })
        }
    }

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`
        requestApi(`/posts${query}`, 'GET', []).then(response => {
            console.log("response=> ", response)
            setUsers(response.data.data)
            setNumOfPage(response.data.lastPage)
            dispatch(actions.controlLoading(false))
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false))
        })
    }, [currentPage, itemsPerPage, searchString, refresh])

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    {/* <h3 className="mt-4">Danh mục bài viết</h3> */}
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><Link to={"/"}>Trang chủ</Link></li>
                        <li className="breadcrumb-item active">Danh mục bài viết</li>
                    </ol>
                    <div className='mb-3'>
                        <Link className='btn btn-sm btn-success me-2' to="/posts/add"><i className="fa fa-plus"></i>Thêm mới</Link>
                        {/* <button type='button' className='btn btn-sm btn-success me-2'><i className="fa fa-plus"></i> Add new</button> */}
                        {selectedRows.length > 0 && <button type='button' className='btn btn-sm btn-danger' onClick={handleMultiDelete}><i className="fa fa-trash"></i> Xóa các bài viết đã chọn</button>}
                    </div>
                    <DataTable
                        name="Danh dục bài viết"
                        data={users}
                        columns={columns}
                        numOfPage={numOfPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onChangeItemsPerPage={setItemsPerPage}
                        onKeySearch={(keyword) => {
                            console.log("keyword in user list comp=> ", keyword)
                            setSearchString(keyword)
                        }}
                        onSelectedRows={rows => {
                            console.log("selected rows in uselist=> ", rows)
                            setSelectedRows(rows)
                        }}
                    />
                </div>
            </main>
            <Modal show={showModal} onHide={() => setShowModal(false)} size='sm'>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa bài viết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Xác nhận xóa bài viết đã chọn?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>Đóng</Button>
                    <Button className='btn-danger' onClick={requestDeleteApi}>Chấp nhận xóa</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PostList