import React, {useContext} from 'react';
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

const ChallengeAcceptForm = ({challenge}) => {
  const userProfile = useContext(AuthContext)
  const button =  (userProfile.username === challenge.username) ? null : <Button onClick={() => console.log("clicked")} variant="contained" size="large">Accept</Button>
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
      {button}
    </Box>
  )
}

export default ChallengeAcceptForm