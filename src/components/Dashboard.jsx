import React, { useState } from 'react'

import Balance from './Balance'
import ChallengeTable from './challenge/ChallengeTable'
import ChallengeButton from './challenge/ChallengeButton'
import { useInterval } from 'usehooks-ts'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [challenges, setChallenges] = useState([])

  const fetchChallenges = () => {
    fetch('/api/challenges', { mode: 'no-cors' })
      .then(res => {
        if (res.ok) return res.json()
        else return {}
      })
      .then(challenges => {
        let sorted = challenges.sort((a, b) => b.id - a.id )
        setIsLoading(false)
        setChallenges(sorted)
      })
  }

  useInterval(fetchChallenges, 2000)

  let tableComponent = null;
   if (isLoading) {
    tableComponent = <CircularProgress /> 
  } else {
    tableComponent = (challenges && challenges.length > 0) ? <ChallengeTable rows={challenges} /> : <p>No challenges</p>
  }

  return (
    <Box textAlign='center'>
      <Balance />
      <Box>
        <ChallengeButton variant="contained" size="large" />
      </Box>
      <Box sx={{m: 4}}>
        <h2>Challenges</h2>
        {tableComponent}
      </Box>
    </Box>
  )
}

export default Dashboard