import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { getColor, getLocalTime, getUseFriendlyStatus, getOpponent } from '../../utils/utils'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const ChallengeDetails = ({challenge}) => {
  const userProfile = useContext(AuthContext)
  return (
    <Box sx={{ml: 8, mr: 7, my: 4}}>
      <Typography variant="h6">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={4}>Status:</Grid>
          <Grid xs={8}>{getUseFriendlyStatus(userProfile, challenge)}</Grid>
          <Grid xs={4}>Created at:</Grid>
          <Grid xs={8}>{getLocalTime(challenge.created_on)}</Grid>
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
  )
}

export default ChallengeDetails