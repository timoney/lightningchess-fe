import React from 'react'
import { useQRCode } from 'next-qrcode'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const Payment = ({text}) => {
  const { SVG } = useQRCode();

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">Payment</Typography>
      <Box textAlign='center' my={2}>
        <SVG
            text={text}
            options={{
              margin: 2,
              width: 200,
            }}
        />
      </Box>
      <Box sx={{ display: 'flex', my: 2 }} justifyContent="center">
        <CircularProgress />
      </Box>
    </React.Fragment>
  )

}

export default Payment