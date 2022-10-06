import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/Auth';

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const userProfile = useContext(AuthContext)
  console.log(`profile ${JSON.stringify(userProfile, null, '')}`)
  if (userProfile && userProfile.username) {
    return (
      <div>
        hi {userProfile.username}!
      </div>
    )
  } else {
    return (
      <div>
        Welcome to Lightning Chess!
        <a href="/login">Login</a>
      </div>
    )
  }
}

export default Main