import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/Auth'
import ChallengeTable from './challenge/ChallengeTable'
import ChallengeButton from './challenge/ChallengeButton'
import { useInterval } from 'usehooks-ts'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Dashboard = () => {
  const userProfile = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true);
  const [sentToChallenges, setSentToChallenges] = useState([]);
  const [sentByChallenges, setSentByChallenges] = useState([]);
  const [readyToPlayChallenges, setReadyToPlayChallenges] = useState([]);

  const fetchChallenges = () => {
    fetch('/api/challenges', { mode: 'no-cors' })
      .then(res => {
        if (res.ok) return res.json()
        else return {}
      })
      .then(challenges => {
        let sorted = challenges.sort((a, b) => a.id - b.id )
        let sentToChallenges = sorted.filter(x => x.status.toUpperCase() === 'WAITING' && x.opp_username === userProfile.username)
        let sentByChallenges = sorted.filter(x => x.status.toUpperCase() === 'WAITING' && x.username === userProfile.username)
        let readyToPlayChallenges = sorted.filter(x => x.status.toUpperCase() === 'ACCEPTED')
        setIsLoading(false)
        setSentByChallenges(sentByChallenges)
        setSentToChallenges(sentToChallenges)
        setReadyToPlayChallenges(readyToPlayChallenges)
      })
  }

  useInterval(fetchChallenges, 2000)

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }} justifyContent="center">
        <CircularProgress />
      </Box>
    )
  } else {
    const rtpc = (readyToPlayChallenges && readyToPlayChallenges.length > 0) ? <ChallengeTable rows={readyToPlayChallenges} /> : <p>No challenges sent</p>
    const stc = (sentToChallenges && sentToChallenges.length > 0) ? <ChallengeTable rows={sentToChallenges} /> : <p>No pending challenges</p>
    const sbc = (sentByChallenges && sentByChallenges.length > 0) ? <ChallengeTable rows={sentByChallenges} /> : <p>No challenges sent</p>
    return (
      <div>
        <ChallengeButton variant="contained" size="large">Challenge</ChallengeButton>
        <p>Ready to play</p>
        {rtpc}
        <p>Challenges waiting for you</p>
        {stc}
        <p>Challenges you Sent</p>
        {sbc}
      </div>
    )
  }
}

export default Dashboard