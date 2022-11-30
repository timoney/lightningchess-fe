import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/Auth'
import WaitingTable from './WaitingTable'
import ChallengeButton from './challenge/ChallengeButton'
import { useInterval } from 'usehooks-ts'

const Dashboard = () => {
  const userProfile = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true);
  const [sentToChallenges, setSentToChallenges] = useState([]);
  const [sentByChallenges, setSentByChallenges] = useState([]);

  const fetchChallenges = () => {
    fetch('/api/challenges', { mode: 'no-cors' })
      .then(res => {
        if (res.ok) return res.json()
        else return {}
      })
      .then(challenges => {
        let sorted = challenges.sort((a, b) => a.value - b.value )
        let sentToChallenges = sorted.filter(x => x.status.toUpperCase() === 'WAITING' && x.opp_username === userProfile.username)
        let sentByChallenges = sorted.filter(x => x.status.toUpperCase() === 'WAITING' && x.username === userProfile.username)
        setIsLoading(false)
        setSentByChallenges(sentByChallenges)
        setSentToChallenges(sentToChallenges)
      })
  }

  useInterval(fetchChallenges, 2000)

  if (isLoading) {
     return <p>Loading challenges...</p>
  } else {
    const stc = (sentToChallenges && sentToChallenges.length > 0) ? <WaitingTable rows={sentToChallenges} /> : <p>No pending challenges</p>
    const sbc = (sentByChallenges && sentByChallenges.length > 0) ? <WaitingTable rows={sentByChallenges} /> : <p>No challenges sent</p>
    return (
      <div>
        <ChallengeButton variant="contained" size="large">Challenge</ChallengeButton>
        <p>Challenges waiting for you</p>
        {stc}
        <p>Challenges you Sent</p>
        {sbc}
      </div>
    )
  }
}

export default Dashboard