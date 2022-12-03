import React, {useContext, useState} from 'react';
import { AuthContext } from '../../contexts/Auth';
import { getColor, getLocalTime, getStatus, getOpponent } from '../../utils/utils'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ChallengeDetails = ({challenge, setOpen}) => {
  const userProfile = useContext(AuthContext)
  const [challengeId, setChallengeId] = useState("");

  const submitChallengeAccept = async () => {
    const challengeAccept = {id: challenge.id}
  
    const challengeAcceptJson = JSON.stringify(challengeAccept, null, " ");
    console.log(`values: ${challengeAcceptJson}`)
  
    const response = await fetch('/api/challenge-accept', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: challengeAcceptJson,
      mode: 'no-cors', 
    })
    console.log(`response: ${response}`)
    const data = await response.json()
    console.log(`data: ${data}`)
    console.log(`data: ${JSON.stringify(data, null, ' ')}`)
    setChallengeId(data.challenge.id)
    window.open(`https://lichess.org/${data.challenge.id}`, '_blank')
  }

  const getChallengeInfoButton = () => {
    const id = challenge.lichess_challenge_id ? challenge.lichess_challenge_id : challengeId
    const status = getStatus(userProfile, challenge)
    if (status === "Waiting for opponent to accept") {
      return <Button onClick={() => setOpen(false)} variant="contained" size="small">Back to dashboard</Button>
    }
    if (id && status === "Waiting for you to play") {
      return <Button onClick={() => window.open(`https://lichess.org/${id}`, '_blank')} variant="contained" size="large">Play Here</Button>
    }
    if (status === 'Waiting for you to accept') { 
      return <Button onClick={submitChallengeAccept} variant="contained" size="large">Accept</Button>
    }
    return null
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Box sx={{ml: 8, mr: 7, my: 4}}>
          <Typography variant="h6">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid xs={4}>Created at:</Grid>
              <Grid xs={8}>{getLocalTime(challenge.created_on)}</Grid>
              <Grid xs={4}>Status:</Grid>
              <Grid xs={8}>{getStatus(userProfile, challenge)}</Grid>
              <Grid xs={4}>Opponent:</Grid>
              <Grid xs={8}>{getOpponent(userProfile, challenge)}</Grid>
              <Grid xs={4}>Your color:</Grid>
              <Grid xs={8}>{getColor(userProfile, challenge)}</Grid>
              <Grid xs={4}>Time limit:</Grid>
              <Grid xs={8}>{challenge.time_limit / 60} minutes</Grid>
              <Grid xs={4}>Increment:</Grid>
              <Grid xs={8}>{challenge.increment} seconds</Grid>
              <Grid xs={4}>Sats:</Grid>
              <Grid xs={8}>{challenge.sats}</Grid>
            </Grid>
          </Typography>
        </Box>
        <Box textAlign='center'>
          {getChallengeInfoButton()}
        </Box>
      </Paper>
    </Container>
  )
}

export default ChallengeDetails