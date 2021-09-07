import React, {useRef, useState} from "react";
import { useAuth} from "../../context/AuthContext"
import { Link, useHistory } from "react-router-dom";

import "./Login.css"


const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to sign in")
    }

    setLoading(false)

  }

 


  return (
    <>
      <div id="login" >
        <div class="container" >
          <div class="content" >
            <div class="into" >
              <h2>Login</h2>
              <p>Log in and start creating your next task</p>
              <p>Do not have an account ? <Link to="/signup">Sign up</Link></p>
            </div>  
          </div>
          <div class="content" >
            <div class="into" >
              <form onSubmit={handleSubmit} >
                <div>
                {error && <p class="error" >Failed to login</p>}
                  <input placeholder="Email" type="email" required ref={emailRef}  />
                  <input placeholder="Password" type="password" ref={passwordRef}  />
                </div>
                <div class="login_section" >
                  <button disabled={loading} type="submit" >Login</button>
                  <p class="forgot" >Forgot your password ? <Link to="/forgot-password">Forgot Password</Link></p>
                </div>             
              </form>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default Login