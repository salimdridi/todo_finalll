import React, { useState, useEffect } from 'react'
import Navbar from "../Dashboard/Navbar/Navbar"
import Main from "../Dashboard/Main/Main"

const Dashboard = () => {

  const menuProfile = "Profile"
  const menuLogout = "Logout";



  return (
    <>
      <Navbar menuProfile={menuProfile} menuLogout={menuLogout} />
      <Main />
    </>
  )
}

export default Dashboard
