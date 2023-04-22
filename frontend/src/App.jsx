import { useState } from 'react'
import './App.css'
import Navbar from './components/user/Navbar'
import SignIn from './components/auth/SignIn'

function App() {
  return (
    <>
      <Navbar />
      <SignIn />
    </>
  )
}

export default App
