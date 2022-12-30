import React, { useContext } from 'react'
import { AuthContext } from '../contexts/Auth'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const Header = () => {
  const userProfile = useContext(AuthContext)
  let username = null
  if (userProfile.username) {
    username = <Typography>{userProfile.username}</Typography>
  }

  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        position: 'relative',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        Lightning Chess
        </Typography>
        {username}
      </Toolbar>
    </AppBar>
  )
}

export default Header