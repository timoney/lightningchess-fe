import React, { useState } from 'react'
import { useInterval } from 'usehooks-ts'

import GenerateInvoice from './GenerateInvoice'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal';

const Wallet = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [modalComponent, setModalComponent] = useState(null)

  const openCreateInvoice = () => {
    setModalComponent(<GenerateInvoice setIsOpen={setIsOpen}/>)
    setIsOpen(true)
  }

  const fetchTransactions = () => {
    fetch('/api/transactions', { mode: 'no-cors' })
      .then(res => {
        if (res.ok) return res.json()
        else return {}
      })
      .then(transactions => {
        let sorted = transactions.sort((a, b) => b.id - a.id )
        setIsLoading(false)
        setTransactions(sorted)
      })
  }

  useInterval(fetchTransactions, 2000)
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', m: 10 }} justifyContent="center">
        <CircularProgress />
      </Box>
    )
  } else {
    return (
      <div>
        <Button onClick={openCreateInvoice} variant="contained" size="large">Fund</Button>
        <Button onClick={console.log("withrawal")} variant="contained" size="large">Withdrawal</Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Detail</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => {
                    console.log("hi")
                  }}
                  hover
                >
                  <TableCell>row.ttype</TableCell>
                  <TableCell>row.detail</TableCell>
                  <TableCell>row.amount</TableCell>
                  <TableCell>row.state</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={isOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {modalComponent}
        </Modal>
      </div>)
  }
}

export default Wallet