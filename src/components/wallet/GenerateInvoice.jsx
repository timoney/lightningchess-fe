import React from 'react'

import { useFormik } from 'formik'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const GenerateInvoice = ({setIsOpen}) => {

  const generateInvoice = async (values) => {
    values.sats = Number(values.sats)

    let constValuesJson = JSON.stringify(values, null, " ")
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
    setIsOpen(false)
  }

  const formik = useFormik({
    initialValues: { sats: '1000'},
    onSubmit: generateInvoice,
  })

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Generate invoice
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField id="sats" value={formik.values.sats} onChange={formik.handleChange} label="Sats" variant="outlined" margin="normal"/><br/>
          <Button variant="contained" type="submit">Generate</Button>
        </form>
      </Paper>
    </Container>
  )
}

export default GenerateInvoice