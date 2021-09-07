import React, {useRef, useState, useEffect} from "react";
import "./UpdateProfile.css"
import firebase from "firebase";
import { useAuth } from "../../../../context/AuthContext"
import { useHistory } from "react-router-dom"
import unphoto from "../../../../img/up.png";

const UpdateProfile = () => {

  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail, updateDisplayName } = useAuth();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [img, setImg] = useState(null);
  

  


 function handleSubmit(e) {
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match")
    }

    const promises = [];
    setLoading(true)
    setError("")
    if(emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if(nameRef.current.value) {
      promises.push(updateDisplayName(nameRef.current.value))
    }

    if(passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(()=> {
      history.push("/");
    }).catch(() => {
      setError("Failed to update account")
      alert("Something is wrong. Reload page and try again.")
    }).finally(() => {
      setLoading(false)
    })

    
    if(image) {
       firebase
      .storage()
      .ref("users")
      .child(currentUser.uid + "/profile.jpg")
      .put(img); 
    }
   
    

  }


  const handleChange = (e) => {
    
    let file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = function(){
        const result = reader.result;
        setImage(result);
      }
      reader.readAsDataURL(file);
    }

    setImg(file);

  }


  const getProfileImage = () => {
   firebase
      .storage()
      .ref('users')
      .child(currentUser.uid + "/profile.jpg")
      .getDownloadURL()
      .then(imgUrl => {
        setUrl(imgUrl);
      });
  }


  useEffect(() => {
    getProfileImage();
  }, [])


  return (
    <>
    <div id="update-profile" >
      <div class="container" >
        <h2>Profile</h2>
        <div class="bg bg-prf" type="file" style={{backgroundImage: `url(${image || url || unphoto})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", width:"80px", height:"80px", position: "relative", borderRadius: "100%" }} >
        </div>
        <input type="file" name="file" id="file" class="inputfile" onChange={handleChange} />
        <label for="file">Choose a file</label>
        <form onSubmit={handleSubmit} >        
          <input type="text" ref={nameRef} defaultValue={currentUser.displayName}   />
          <input type="email" ref={emailRef} required defaultValue={currentUser.email} />
          <input type="password" ref={passwordRef} placeholder="Leave password blank to keep the same" />
          <input type="password" ref={passwordConfirmRef} placeholder="Leave password blank to keep the same"/>
          <button disabled={loading}  type="submit">Update</button>
        </form>
      </div>
     </div>
    </>
  )
}

export default UpdateProfile