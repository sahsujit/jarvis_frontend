import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Customize from './pages/Customize'
import { userDataContext } from './context/UserContext'

const App = () => {
  const {userData,setUserData} = useContext(userDataContext)
  return (
    <div>
      <Routes>
        <Route path="/" element={userData?.assistantImage && userData?.assistantName ? <Home /> : <Navigate to="/customize" />} />
        <Route path="/customize" element={userData ?<Customize /> : <Navigate to="/signin" />} />

        <Route path="/signin" element={!userData ?  <SignIn />: <Navigate to="/" />} />
        <Route path="/signup" element={ !userData ? <SignUp />: <Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App