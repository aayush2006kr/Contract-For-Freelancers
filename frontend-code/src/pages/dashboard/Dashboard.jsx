import Sidebar from "../../components/dashboard/Sidebar";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import React from 'react'
import Navbar from "../../components/dashboard/Navbar";

const Dashboard = () => {
  return (
     <div className="min-h-screen bg-black text-white">

    <Sidebar />
    <Navbar/>
    
    </div>
  )
}

export default Dashboard

