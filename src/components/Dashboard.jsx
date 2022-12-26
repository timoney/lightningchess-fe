import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChallengeTable from './challenge/ChallengeTable'
import ChallengeButton from './challenge/ChallengeButton'
import { useInterval } from 'usehooks-ts'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [challenges, setChallenges] = useState([])
  let navigate = useNavigate()

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

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', m: 10 }} justifyContent="center">
        <CircularProgress />
      </Box>
    )
  } else {
    const ct = (challenges && challenges.length > 0) ? <ChallengeTable rows={challenges} /> : <p>No challenges</p>
    return (
      <Box textAlign='center'>
        <Box sx={{mt: 5}}>
          <ChallengeButton variant="contained" size="large">Challenge</ChallengeButton>
        </Box>
        <Box sx={{mt: 5}}>
          <Button onClick={ () => navigate('/wallet') }variant="contained" size="large">Fund Account</Button>
        </Box>
        <Box sx={{m: 4}}>
          <h2>Challenges</h2>
          {ct}
        </Box>
      </Box>
    )
  }
}

export default Dashboard