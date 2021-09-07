import React from 'react'
import Dashboard from "./components/Dashboard/Dashboard";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Profile from "./components/Dashboard/Profile/Profile"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import PriveteRoute from "./PrivateRoute"
import "./index.css";

const App = () => {


  return (
    <>
    <Router>
      <AuthProvider>
        <Switch>
          <PriveteRoute exact path="/" component={Dashboard} />
          <PriveteRoute path="/profile" component={Profile} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
      </Router>
    </>
  )
}

export default App

