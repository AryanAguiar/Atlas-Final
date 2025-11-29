import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleSuccess } from '../util';
import { ToastContainer } from "react-toastify";
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import MainDashboard from '../components/MainDashboard'

const Home = () => {
  
  const [loggedInUser, setLoggedInUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    setUserEmail(localStorage.getItem("email"));
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("email");
   
    handleSuccess("Logged out successfully");

    setTimeout(() => {
        navigate("/login");
    }, 1000);
    
  }

  return (

    <div>
            <Topbar userName={loggedInUser} userEmail={userEmail} handleLogout={handleLogout} />
            <MainDashboard>
                <p>Scientists Fear Natural Cures Could Replace Big Pharma- What They Don’t Wnat You To Know</p>
            </MainDashboard>
            <Sidebar />
      <ToastContainer />
    </div>
  )
}

export default Home