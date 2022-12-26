import React, { useContext, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { AuthContext } from '../../contexts/Auth';
import ChallengeDetails from './ChallengeDetails'
import ChallengePayment from './ChallengePayment'
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

  let maybeChallengePayment = null
  let message = null
  if (challengeDetails.status === "NEED PAYMENT" && userProfile.username === challengeDetails.username) { 
    maybeChallengePayment = <ChallengePayment text={challengeDetails.payment_request} />
    message = <Typography component="body1" align="center">If challenge is not accepted in an hour, funds will be returned.</Typography>
  }
  
  if (challengeDetails.status === "NEED OPP PAYMENT" && userProfile.username === challengeDetails.opp_username) { 
    maybeChallengePayment = <ChallengePayment text={challengeDetails.opp_payment_request} />
    message = <Typography component="body1" align="center">Make payment to accepted the challenge</Typography>
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
        {maybeChallengePayment}
        <ChallengeDetails challenge={challengeDetails}/>
        {message}
      </Paper>
    </Container>
  )
}

export default ChallengeDetailsContainer