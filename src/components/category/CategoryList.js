import React, { useEffect, useState } from 'react'
import DataTable from '../common/DataTable'
import requestApi from '../../helpers/api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'
import DataTableCate from '../common/DataTableCate'

const CategoryList = () => {
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
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
            name: "Tên danh mục",
            element: row => row.name
        },
        {
            name: "Mô tà",
            element: row => row.description
        },
        {
            name: "Ngày tạo",
            element: row => moment(row.created_at).format('DD/MM/YYYY hh:mm A')
        },
        {
            name: "Cập nhật",
            element: row => moment(row.updated_at).format('DD/MM/YYYY hh:mm A')
        },
        {
            name: "Thao tác",
            element: row => (
                <>
                <Link to={`/categories/edit/${row.id}`} className="btn btn-sm btn-warning me-1" title='Sửa' ><i className="fa fa-pencil" ></i></Link>
                    {/* <button type="button" className="btn btn-sm btn-warning me-1"><i className="fa fa-pencil"></i> Edit</button> */}
                    <button type="button" title='Xóa' className="btn btn-sm btn-danger me-1" onClick={() => handleDelete(row.id)}><i className="fa fa-trash"></i></button>
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
            requestApi(`/categories/${deleteItem}`, 'DELETE', []).then(response => {
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
            requestApi(`/categories/multiple?ids=${selectedRows.toString()}`, 'DELETE', []).then(response => {
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
        requestApi(`/categories${query}`, 'GET', []).then(response => {
            console.log("response=> ", response)
            setCategories(response.data)
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
                    {/* <h3 className="mt-4">Danh mục</h3> */}
                    <ol className="breadcrumb mb-4 sticky-top bg-white pb-2">
                        <li className="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
                        <li className="breadcrumb-item active">Danh mục</li>
                    </ol>
                    {/* <div className='mb-3'> */}
                        {/* <Link className='btn btn-sm btn-success me-2' to="/categories/add"><i className="fa fa-plus"></i>Tạo mới</Link> */}
                        {/* <button type='button' className='btn btn-sm btn-success me-2'><i className="fa fa-plus"></i> Add new</button> */}
                        {/* {selectedRows.length > 0 && <button type='button' className='btn btn-sm btn-danger' onClick={handleMultiDelete}><i className="fa fa-trash"></i>Xóa tất cả lựa chọn</button>} */}
                    {/* </div> */}
                    <DataTableCate
                        name="Danh sách danh mục"
                        data={categories}
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
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure want to delete?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                    <Button className='btn-danger' onClick={requestDeleteApi}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CategoryList