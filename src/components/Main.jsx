import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'
import Dashboard from './Dashboard'
import Welcome from './Welcome'
import Wallet from './wallet/Wallet'

const Main = () => {
  const userProfile = useContext(AuthContext)
  let authedPages = (
    <BrowserRouter>
      <Routes>
        <Route path="/wallet" element={<Wallet />}/>
        <Route path="/" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
  return userProfile.username ? authedPages : <Welcome/>
}

export default Main