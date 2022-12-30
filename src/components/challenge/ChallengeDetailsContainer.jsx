import React, { useContext, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { AuthContext } from '../../contexts/Auth';
import ChallengeDetails from './ChallengeDetails'
import Payment from '../wallet/Payment'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const ChallengeDetailsContainer = ({selectedChallenge}) => {
  // selectedChallenge is starting state
  const [challengeDetails, setChallengeDetails] = useState(selectedChallenge)
  const userProfile = useContext(AuthContext)

  const fetchInvoice = () => {
    if (challengeDetails.status !== "COMPLETED") {
      fetch(`/api/challenge/${challengeDetails.id}`, { mode: 'no-cors' })
        .then(res => {
          if (res.ok) return res.json()
          else return {}
        })
        .then(c => {
          console.log(`fetched challenge: ${JSON.stringify(c, null, ' ')}`);
          if (challengeDetails.status !== c.state) {
            // update challenge details if different
            setChallengeDetails(c)
          }
        })
    }
  }

  useInterval(fetchInvoice, 2000)
  
  const submitAcceptChallenge = async () => {
    let id = challengeDetails.id
    let constValuesJson = JSON.stringify({id}, null, " ")
    console.log(`values: ${constValuesJson}`)
  
    const response = await fetch('/api/accept-challenge', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: constValuesJson,
      mode: 'no-cors', 
    })

    console.log(`response: ${response}`)
    const data = await response.json()
    console.log(`data: ${data}`)
    console.log(`data: ${JSON.stringify(data, null, ' ')}`)
    setChallengeDetails(data)
  }
  
  let acceptChallengeButton = null
  if (challengeDetails.status === "WAITING FOR ACCEPTANCE" && userProfile.username === challengeDetails.opp_username) { 
    acceptChallengeButton = <Button variant="contained" onClick={submitAcceptChallenge}type="submit">Accept challenge</Button>
  }

  let playHereButton = null
  if (challengeDetails.status === "ACCEPTED") {
    playHereButton = 
    (<Box textAlign='center' sx={{my: 4}}>
      <Button onClick={() => window.open(`https://lichess.org/${challengeDetails.lichess_challenge_id}`, '_blank')} variant="contained" size="large" color="success">Play Here!</Button>
    </Box>)
  }
  
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        {playHereButton}
        {acceptChallengeButton}
        <ChallengeDetails challenge={challengeDetails}/>
      </Paper>
    </Container>
  )
}

export default ChallengeDetailsContainer