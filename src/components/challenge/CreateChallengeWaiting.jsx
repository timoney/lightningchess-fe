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
        if (gameAccepted.length == 1) {
          setIsAccepted(true)
          console.log(`gameAccepted: ${JSON.stringify(gameAccepted, null, ' ')}`)
          setAcceptedGameInfo(gameAccepted)
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
          <Button onClick={() => window.open(`https://lichess.org/${acceptedGameInfo.lichess_challenge_id}`, '_blank')} variant="contained" size="large">Play Here!</Button>
        </div>
      )
    } else {
      return (
        <div>
          <Box sx={{ display: 'flex' }} justifyContent="center">
            <CircularProgress />
          </Box>
          <Typography component="h1" variant="h4" align="center">
            Waiting for {gameInfo.opp_username} to accept the challenge.
          </Typography>
          <Button onClick={() => setOpen(false)} variant="contained" size="medium">Back to dashboard</Button>
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