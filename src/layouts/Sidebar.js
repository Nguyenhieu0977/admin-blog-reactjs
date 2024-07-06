import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import requestApi from '../helpers/api';
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Tree } from '@mantine/core';

const data = [
    {
        label: 'src',
        value: 'src',
        children: [
            {
                label: 'components',
                value: 'src/components',
                children: [
                    { label: 'Accordion.tsx', value: 'src/components/Accordion.tsx' },
                    { label: 'Tree.tsx', value: 'src/components/Tree.tsx' },
                    { label: 'Button.tsx', value: 'src/components/Button.tsx' },
                ],
            },
        ],
    },
    {
        label: 'node_modules',
        value: 'node_modules',
        children: [
            {
                label: 'react',
                value: 'node_modules/react',
                children: [
                    { label: 'index.d.ts', value: 'node_modules/react/index.d.ts' },
                    { label: 'package.json', value: 'node_modules/react/package.json' },
                ],
            },
            {
                label: '@mantine',
                value: 'node_modules/@mantine',
                children: [
                    {
                        label: 'core',
                        value: 'node_modules/@mantine/core',
                        children: [
                            { label: 'index.d.ts', value: 'node_modules/@mantine/core/index.d.ts' },
                            { label: 'package.json', value: 'node_modules/@mantine/core/package.json' },
                        ],
                    },
                    {
                        label: 'hooks',
                        value: 'node_modules/@mantine/hooks',
                        children: [
                            { label: 'index.d.ts', value: 'node_modules/@mantine/core/index.d.ts' },
                            { label: 'package.json', value: 'node_modules/@mantine/core/package.json' },
                        ],
                    },
                    {
                        label: 'form',
                        value: 'node_modules/@mantine/form',
                        children: [
                            { label: 'index.d.ts', value: 'node_modules/@mantine/core/index.d.ts' },
                            { label: 'package.json', value: 'node_modules/@mantine/core/package.json' },
                        ],
                    },
                ],
            },
        ],
    },
    {
        label: 'package.json',
        value: 'package.json',
    },
    {
        label: 'tsconfig.json',
        value: 'tsconfig.json',
    },
];



const Sidebar = () => {
    const navigate = useNavigate();
    const [treeView, setTreeView] = useState([])
    useEffect(() => {
        const getData = async () => {
            const dataTree = await requestApi('/categories', 'GET')
            setTreeView(dataTree.data)
        }
        getData()
    }, [])

    console.log(treeView.data)
    const logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate("/login")
    }
    return (
        <div id="layoutSidenav" className='pl-3' style={{height:"calc(100vh - 16vh)", overflowY: "scroll", minWidth:"250px"}} >
            <nav className="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
            <div className="sticky-top bg-white d-flex justify-content-center text-uppercase fw-bold text-decoration-none">PHÂN HỆ QUẢN TRỊ</div>
                <div className="sb-sidenav-menu">
                
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Phân hệ chung</div>
                        <a className="nav-link" href="/">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Trang chủ
                        </a>
                        
                        <div className="sb-sidenav-menu-heading">Phân hệ Media</div>
                        <Link className="nav-link collapsed" to={'/madia'} data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                            Chuyên mục Video
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/users/add' className='nav-link'>Thêm mới tà khoản</Link>
                                <Link to='/users' className='nav-link'>Danh sách tài khoản</Link>
                            </nav>
                        </div>

                        <div className="sb-sidenav-menu-heading">Phân hệ bài viết</div>
                        <Link className="nav-link collapsed" to={'/categories'} data-bs-toggle="collapse" data-bs-target="#collapsePost" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Danh mục
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="collapsePost" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/categories/add' className='nav-link'>Thêm danh mục</Link>
                                <Link to='/categories' className='nav-link'>Danh sách danh mục</Link>
                            </nav>
                        </div>
                        <Link className="nav-link collapsed" to={'/posts'} data-bs-toggle="collapse" data-bs-target="#collapsePost" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Bài viết
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="collapsePost" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/posts/add' className='nav-link'>Thêm bài viết</Link>
                                <Link to='/posts' className='nav-link'>Danh sách bài viết</Link>
                            </nav>
                        </div>

                        <div className="sb-sidenav-menu-heading">Phân hệ Tài hoản</div>
                        <Link className="nav-link collapsed" to={'/users'} data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                            Tài khoản
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/users/add' className='nav-link'>Thêm mới tà khoản</Link>
                                <Link to='/users' className='nav-link'>Danh sách tài khoản</Link>
                            </nav>
                        </div>


                        <Tree
                            data={treeView}
                            levelOffset={23}
                            renderNode={({ node, expanded, hasChildren, elementProps }) => (
                                <Group gap={5} {...elementProps}>
                                    {hasChildren && (
                                        <IconChevronDown
                                            size={18}
                                            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                        />
                                    )}
                                    <Link to={`/categories/edit/${node.id}`}>
                                        <span >{node.name}</span>
                                    </Link>
                                </Group>
                            )}
                        />
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar