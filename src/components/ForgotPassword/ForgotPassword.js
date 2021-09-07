import React, {useRef, useState} from "react";
import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"

import "./ForgotPassword.css";

const ForgotPassword = () => {

  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)


  async function handleSubmit(e) {
    e.preventDefault();

   
    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)

  }

  return (
    <>
      <div id="forgot-password" >
        <div class="container" >
          <div class="content" >
            <div class="into" >
              <h2>Forgot Password</h2>
              <p>Forgot your password ? Write an email and check the your inbox for further instructions</p>
            </div>  
          </div>
          <div class="content" >
            <div class="into" >
              <form onSubmit={handleSubmit} >
                <div>
                {message && <p class="error" >{message}</p>}
                  <input placeholder="Email" type="email" required ref={emailRef}  />
                </div>
                <div class="forgot-password_section" >
                  <button disabled={loading} type="submit" >Reset Password</button>
                  <p class="forgot" >Go back to <Link to="/login">Login</Link></p>
                </div>             
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword