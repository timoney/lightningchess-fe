import React, { useState } from 'react'

import { useFormik } from 'formik'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const Withdrawal = ({setIsOpen}) => {

  const [state, setState] = useState("")

  const sendPayment = async (values) => {

    let constValuesJson = JSON.stringify(values, null, " ")
    console.log(`values: ${constValuesJson}`)
  
    const response = await fetch('api/send-payment', { 
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
    if (data.complete) {
      setState("COMPLETE")
    } else {
      setState("FAILED")
    }
    setIsOpen(false)
  }

  const formik = useFormik({
    initialValues: { payment_request: ''},
    onSubmit: sendPayment,
  })

  if (state == "COMPLETE" || state == "FAILED") {
    return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            {state}
          </Typography>
        </Paper>
      </Container>
    )
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Payment request
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField id="payment_request" value={formik.values.payment_request} onChange={formik.handleChange} label="Payment request" variant="outlined" margin="normal"/><br/>
          <Button variant="contained" type="submit">Withdrawal</Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Withdrawal