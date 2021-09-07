import React, {useState, useEffect} from 'react'
import Navbar from "../../Dashboard/Navbar/Navbar"
import UpdateProfile from "../../Dashboard/Profile/UpdateProfile/UpdateProfile";
import { useHistory } from "react-router-dom" 


const Profile = () => {

  const menuProfile = "Home"
  const menuLogout = "Logout";
  const history = useHistory();
  const [loading, setLoading] = useState(true);



  const handleHome = () => {
    history.push("/");
  }

  return (
    <>
      <Navbar  handleHome={handleHome} menuProfile={menuProfile} menuLogout={menuLogout} />
      <UpdateProfile  />
    </>
  )
}

export default Profile
