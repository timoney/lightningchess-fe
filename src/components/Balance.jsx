import React, { useState } from 'react'
import { useInterval } from 'usehooks-ts'

import { Link } from "react-router-dom";
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

const Balance = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [sats, setSats] = useState(0)
  
  const fetchBalance = () => {
    fetch(`/api/balance`, { mode: 'no-cors' })
      .then(res => {
        if (res.ok) return res.json()
        else return {}
      })
      .then(b => {
        console.log(`fetched balance: ${JSON.stringify(b, null, ' ')}`);
        setSats(b.balance)
        setIsLoading(false)
      })
  }

  useInterval(fetchBalance, 3000)

  let satsDisplay = null
  if (isLoading) {
    satsDisplay = <CircularProgress />
  } else {
    satsDisplay = (
      <Box textAlign='center' sx={{display: 'inline-flex'}}>
        <Typography variant="h4" display="inline">{ sats }</Typography>
        <Link to="/wallet"><Typography variant="subtitle1" display="inline" sx={{ml: 2}}>Fund</Typography></Link>
        <Link to="/wallet"><Typography variant="subtitle1" display="inline" sx={{mx: 1}}>Withdrawal</Typography></Link>
        <Link to="/wallet"><Typography variant="subtitle1" display="inline">View transactions</Typography></Link>
      </Box>
    )
  }

  return (
    <Box textAlign='center' sx={{my: 3}}>
      <Typography variant="h4">Sats: {satsDisplay}</Typography>
    </Box>
  )
}

export default Balance