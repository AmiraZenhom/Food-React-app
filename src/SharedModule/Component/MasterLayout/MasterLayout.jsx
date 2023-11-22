//import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from "../SideBar/SideBar"
import Navbar from "../Navbar/Navbar"
import Header from "../Header/Header"
export default function MasterLayout({adminData}) {
  return (
    <>
   <div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
            <div className="side-bar">
                  <SideBar/>
            </div>
        </div>
        <div className="col-md-10">
            <div className="info">
              <Navbar adminData={adminData}/>
              <Header/>
                <Outlet/>

            </div>
        </div>
    </div>
   </div>
    </>
  )
}
