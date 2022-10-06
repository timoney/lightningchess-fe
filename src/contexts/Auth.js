import React, {createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [userProfile, setUserProfile] = useState(null)
  useEffect(() => {
    console.log('fetching!')
    fetch('/profile', { mode: 'no-cors' })
      .then(res => {
        console.log('got heem!')
        if (res.ok) {
          return res.json()
        }
        else return {}
      })
      .then(profile => {
        console.log(`profile: ${JSON.stringify(profile, null, " ")}`)
        setUserProfile(profile)
      })
  }, [])

  if (userProfile === null) {
    console.log('null!!!!')
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value= { userProfile }>
      {props.children}
    </AuthContext.Provider>
  )
}