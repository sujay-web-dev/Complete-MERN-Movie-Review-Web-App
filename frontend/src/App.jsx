import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Navbar from './components/user/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Home from './components/Home';
import EmailVerication from './components/auth/EmailVerication';
import ForgetPassword from './components/auth/ForgetPassword';
import ConfirmPassword from './components/auth/ConfirmPassword';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/signin' element={<SignIn />} />
        <Route path='/auth/signup' element={<SignUp />} />
        <Route path='/auth/verification' element={<EmailVerication />} />
        <Route path='/auth/forget-password' element={<ForgetPassword />} />
        <Route path='/auth/confirm-password' element={<ConfirmPassword />} />
      </Routes>
    </>
  )
}

export default App
