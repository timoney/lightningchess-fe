import React, { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import Dashboard from './Dashboard';
import Welcome from './Welcome';

const Main = () => {
  const userProfile = useContext(AuthContext)

  return userProfile.username ? <Dashboard/> : <Welcome/>
}

export default Main