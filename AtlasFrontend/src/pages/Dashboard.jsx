import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import MainDashboard from '../components/MainDashboard'

const Dashboard = () => {
    return (
        <>
            <Topbar />
            <MainDashboard>
                <p>Scientists Fear Natural Cures Could Replace Big Pharma- What They Don’t Wnat You To Know</p>
            </MainDashboard>
            <Sidebar />
            
        </>
                
    )
}
export default Dashboard
