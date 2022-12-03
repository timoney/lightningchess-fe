import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { useInterval } from 'usehooks-ts'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const CreateChallengeWaiting = ({gameInfo, setOpen}) => {
  const [isAccepted, setIsAccepted] = useState(false)
  const [acceptedGameInfo, setAcceptedGameInfo] = useState({})

  console.log(`gameInfo: ${JSON.stringify(gameInfo, null, ' ')}`)

  // poll each second to see if game started
  const fetchChallenges = () => {
    fetch('/api/challenges', { mode: 'no-cors' })
      .then(res => {
        if (res.ok) return res.json()
        else return {}
      })
      .then(challenges => {
        let gameAccepted = challenges.filter(x => x.status.toUpperCase() === 'ACCEPTED' && x.id === gameInfo.id)
        console.log(`gameAccepted: ${JSON.stringify(gameAccepted, null, ' ')}`)
        if (gameAccepted.length == 1) {
          let accepted = gameAccepted[0]
          setIsAccepted(true)
          setAcceptedGameInfo(accepted)
          window.open(`https://lichess.org/${accepted.lichess_challenge_id}`, '_blank')
        }
      })
  }

  useInterval(fetchChallenges, 1000)

  const getMessage = () => {
    if (isAccepted) {
      return (
        <div>
          <Typography component="h1" variant="h4" align="center">
              Challenge has been accepted!
          </Typography>
          <Box textAlign='center'>
            <Button onClick={() => window.open(`https://lichess.org/${acceptedGameInfo.lichess_challenge_id}`, '_blank')} variant="contained" size="large" color="success">Play Here!</Button>
          </Box>
        </div>
      )
    } else {
      return (
        <div>
          <Box sx={{ display: 'flex', m: 1}} justifyContent="center">
            <CircularProgress />
          </Box>
          <Typography component="h1" variant="h5" align="center" sx={{ m: 4 }}>
            Waiting for {gameInfo.opp_username} to accept the challenge.
          </Typography>
          <Box textAlign='center'>
            <Button onClick={() => setOpen(false)} variant="contained" size="small">Back to dashboard</Button>
          </Box>
        </div>
      )
    }
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        {getMessage()}
      </Paper>
    </Container>
  )
}

export default CreateChallengeWaiting