import React, {useContext, useState} from 'react';
import { AuthContext } from '../../contexts/Auth';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

const ChallengeDetails = ({challenge}) => {
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
  }

  const getChallengeInfoButton = () => {
    const id = challenge.lichess_challenge_id ? challenge.lichess_challenge_id : challengeId
    if (id && challenge.status.toUpperCase() !== "COMPLETED") {
      return <Button onClick={() => window.open(`https://lichess.org/${id}`, '_blank')} variant="contained" size="large">Play Here!</Button>
    }
    if (userProfile.username !== challenge.username) { 
      if (challenge.status.toUpperCase() === 'WAITING') {
        return <Button onClick={submitChallengeAccept} variant="contained" size="large">Accept</Button>
      }
    }
    return null
  }

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Challenge
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Id: {challenge.id} <br/> 
        Username: {challenge.username}<br/> 
        Time limit: {challenge.time_limit}<br/> 
        Increment: {challenge.increment}<br/> 
        color: {challenge.color === 'white' ? 'black': 'white'}<br/> 
        sats: {challenge.sats}<br/> 
      </Typography>
      {getChallengeInfoButton()}
    </Box>
  )
}

export default ChallengeDetails