import React, { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import Challenge from './Challenge'
import Welcome from './Welcome'

const Main = () => {
  const userProfile = useContext(AuthContext)

  return userProfile.username ? <Challenge/> : <Welcome/>
}

export default Main