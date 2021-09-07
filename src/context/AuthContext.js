import React, {useContext, useState, useEffect} from "react"
import { auth } from "../firebase_config";
import firebase from "firebase";
import app from "../firebase_config"

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const provider = new firebase.auth.GoogleAuthProvider();


  function signup(email, password, dName, m) {
    return auth.createUserWithEmailAndPassword(email, password).then((user) => {
      var currentUser = app.auth().currentUser;
      currentUser.updateProfile({
          displayName: dName
      })
      }).catch((error) => {
          //ERororror
      });
  }

  function login(email, password){
    return auth.signInWithEmailAndPassword(email, password)
  }

 
  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function updateDisplayName(name) {
    return currentUser.updateProfile({
         displayName: name
      })
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe

  }, [])

  


  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateDisplayName
  }

  return(
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

