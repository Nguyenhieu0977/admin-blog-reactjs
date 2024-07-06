import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import requestApi from '../helpers/api';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions'
import { AreaChart } from '@mantine/charts';
// import { data } from '../components/db/dbchart.js';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

import { DefaultizedPieValueType } from '@mui/x-charts/models';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const data2 = [
    { value: 5, label: 'A' },
    { value: 10, label: 'B' },
    { value: 15, label: 'C' },
    { value: 20, label: 'D' },
];

const size = {
    width: 400,
    height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
}));

const data = [
    { label: 'Group A', value: 400, color: '#0088FE' },
    { label: 'Group B', value: 300, color: '#00C49F' },
    { label: 'Group C', value: 300, color: '#FFBB28' },
    { label: 'Group D', value: 200, color: '#FF8042' },
];

const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
};

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const amtData = [2400, 2210, 2290, 2000, 2181, 2500, 2100];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];

const items = [
    { value: 10, label: 'Series A ( no Id )' },
    { id: 'id_B', value: 15, label: 'Series B' },
    { id: 'id_C', value: 20, label: 'Series C' },
];




const Dashboard = () => {
    const dispatch = useDispatch()

    const [dashboardData, setDashboardData] = useState({});

    console.log(data)

    const { width, height, left, top } = useDrawingArea();

    useEffect(() => {
        // requestApi('/users', 'GET', []).then(response => {
        //     console.log(response)
        //     setDashboardData({
        //         ...dashboardData, totalUser: response.data.total
        //     })
        // }).catch(err => {
        //     console.log(err)
        // })

        const promiseUser = requestApi('/users', 'GET')
        const promisePost = requestApi('/posts', 'GET')
        dispatch(actions.controlLoading(true))
        Promise.all([promiseUser, promisePost]).then((res) => {
            setDashboardData({
                ...dashboardData, totalUser: res[0].data.total, totalPost: res[1].data.total
            })
            dispatch(actions.controlLoading(false))
        }).catch(error => {
            console.log('error => ', error)
            dispatch(actions.controlLoading(false))
        })

    }, [])

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    {/* <h4 className="mt-4">Tổng quan</h4> */}
                    <ol className="breadcrumb mb-2 sticky-top bg-white">
                        <li className="breadcrumb-item active mb-2">Tổng quan hệ thống</li>
                    </ol>
                    <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">Danh mục tài khoản
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {dashboardData.totalUser}
                                    </span>

                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to="/users" className="small text-white stretched-link" href="#">Xem chi tiết</Link>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body">Danh mục bài viết
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {dashboardData.totalPost}
                                    </span>

                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <Link to="/posts" className="small text-white stretched-link" href="#">Xem chi tiết</Link>

                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body">Danh mục Video</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="#">Xem chi tiết</a>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-danger text-white mb-4">
                                <div className="card-body">Danger Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="#">View Details</a>
                                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                </div>
                            </div>
                        </div>

                        ================================================================================================================

                        <BarChart
                            width={500}
                            height={300}
                            series={[
                                { data: pData, label: 'pv', id: 'pvId' },
                                { data: uData, label: 'uv', id: 'uvId' },
                            ]}
                            xAxis={[{ data: xLabels, scaleType: 'band' }]}
                        />

                        <BarChart
                            width={500}
                            height={300}
                            series={[
                                { data: pData, label: 'pv', id: 'pvId', stack: 'total' },
                                { data: uData, label: 'uv', id: 'uvId', stack: 'total' },
                            ]}
                            xAxis={[{ data: xLabels, scaleType: 'band' }]}
                        />

                        <BarChart
                            width={500}
                            height={300}
                            series={[
                                { data: pData, label: 'pv', stack: 'stack1' },
                                { data: amtData, label: 'amt' },
                                { data: uData, label: 'uv', stack: 'stack1' },
                            ]}
                            xAxis={[{ data: xLabels, scaleType: 'band' }]}
                        />

                        <LineChart
                            width={500}
                            height={300}
                            series={[
                                { data: pData, label: 'pv' },
                                { data: uData, label: 'uv' },
                            ]}
                            xAxis={[{ scaleType: 'point', data: xLabels }]}
                        />

                        <PieChart
                            series={[
                                {
                                    outerRadius: 80,
                                    data,
                                    arcLabel: getArcLabel,
                                },
                            ]}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'white',
                                    fontSize: 14,
                                },
                            }}
                            {...sizing}
                        />

                        <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
                            <PieCenterLabel>Center label</PieCenterLabel>
                        </PieChart>

                    </div>



                </div>
            </main>
        </div>
    )
}

export default Dashboard

function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }