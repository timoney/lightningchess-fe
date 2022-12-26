import React, {createContext, useState, useEffect } from 'react'

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [userProfile, setUserProfile] = useState(null)
  useEffect(() => {
    fetch('/profile', { mode: 'no-cors' })
      .then(res => {
        if (res.ok) return res.json()
        else return {}
      })
      .then(profile => setUserProfile(profile))
  }, [])

  if (userProfile === null) return <div>Loading...</div>

  return (
    <AuthContext.Provider value= { userProfile }>
      {props.children}
    </AuthContext.Provider>
  )
}