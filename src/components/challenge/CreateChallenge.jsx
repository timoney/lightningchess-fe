import React, { useState } from 'react'
import { useFormik } from 'formik'
import CreateChallengeWaiting from './CreateChallengeWaiting'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const CreateChallenge = ({setOpen}) => {
  const [gameInfo, setGameInfo] = useState(null)
  const [timeLimit, setTimeLimit] = useState(5)
  const [increment, setIncrement] = useState(0)

  const submitChallenge = async (values) => {
    values.time_limit = values.time_limit * 60
    values.opponent_time_limit = values.opponent_time_limit * 60
    values.sats = Number(values.sats)

    let constValuesJson = JSON.stringify(values, null, " ");
    console.log(`values: ${constValuesJson}`)
  
    const response = await fetch('/api/challenge', { 
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
    setGameInfo(data)
  }

  const formik = useFormik({
    initialValues: { opp_username: '', time_limit: 5, opponent_time_limit: 0, increment: 0, color: 'white', sats: '100'},
    onSubmit: submitChallenge,
  })

  const sliderChangeLimit = (e, v) => {
    formik.setFieldValue('time_limit', v);
    setTimeLimit(v)
  }

  const sliderChangeIncrement = (e, v) => {
    formik.setFieldValue('increment', v);
    setIncrement(v)
  }

  const onChangeColor = (e) => {
    formik.setFieldValue('color', e.target.value);
  }

  if (gameInfo == null) {
    return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Challenge
        </Typography>
          <form onSubmit={formik.handleSubmit}>
              <TextField id="opp_username" value={formik.values.opp_username} onChange={formik.handleChange} label="Opponent" variant="outlined" margin="normal" /><br/>
              <Typography id="limit-slider" gutterBottom>Minutes per side: {timeLimit}</Typography>
              <Slider id="time_limit" value={formik.values.time_limit} aria-labelledby="limit-slider" onChange={ sliderChangeLimit } step={1} marks min={1} max={10} valueLabelDisplay="auto" /><br/>
              <Typography id="increment-slider" gutterBottom>Increment in seconds: {increment}</Typography>
              <Slider id="increment" value={formik.values.increment} aria-labelledby="increment-slider" onChange={ sliderChangeIncrement } step={1} marks min={0} max={10} valueLabelDisplay="auto" /><br/>
              <FormControl>
                <InputLabel id="color-label">Color</InputLabel>
                <Select
                  labelId="color-label"
                  id="color"
                  value={formik.values.color}
                  label="Color"
                  onChange={onChangeColor}
                >
                  <MenuItem value={"white"}>White</MenuItem>
                  <MenuItem value={"black"}>Black</MenuItem>
                </Select>
              </FormControl><br/>
              <TextField id="sats" value={formik.values.sats} onChange={formik.handleChange} label="Sats" variant="outlined" margin="normal"/><br/>
              <Button variant="contained" type="submit">Submit</Button>
          </form>
      </Paper>
    </Container>)
  } else {
    return <CreateChallengeWaiting gameInfo={gameInfo} setOpen={setOpen}/>
  } 

}

export default CreateChallenge