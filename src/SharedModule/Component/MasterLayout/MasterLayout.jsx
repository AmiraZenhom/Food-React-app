//import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from "../SideBar/SideBar"
import Navbar from "../Navbar/Navbar"
import Styles from './MasterLayout.module.scss'
import Header from '../Header/Header'





export default function MasterLayout({adminData}) {
 
  
  return (
    <>
  
<div className={Styles.container}>
      <div className={Styles.sidebar}>
        <SideBar />
      </div>
      <div className={Styles.content}>
        <div className={`${Styles.header} mx-5`}>
          <Navbar adminData={adminData }  />
          <Header />
        </div>
        <div className={Styles.body}>
          <Outlet />
        </div>
      </div>
   
    </div>
    </>
  )
}
