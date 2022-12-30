import React, { useState } from 'react'
import { useInterval } from 'usehooks-ts'

import GenerateInvoice from './GenerateInvoice'
import ViewTx from './ViewTx'
import Withdrawal from './Withdrawal'
import Balance from '../Balance'

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
  const [isGenerateOpen, setIsGenerateOpen] = useState(false)
  const [isViewTxOpen, setIsViewTxOpen] = useState(false)
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState({})

  const fetchTransactions = () => {
    fetch('/api/transactions', { mode: 'no-cors' })
      .then(res => {
        if (res.ok) return res.json()
        else return {}
      })
      .then(transactions => {
        let sorted = transactions.sort((a, b) => b.transaction_id - a.transaction_id )
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
        <Balance />
        <Button onClick={() => setIsGenerateOpen(true)} variant="contained" size="large">Fund</Button>
        <Button onClick={() => setIsWithdrawalOpen(true)} variant="contained" size="large">Withdrawal</Button>
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
                    setSelectedRow(row)
                    setIsViewTxOpen(true)
                  }}
                  hover
                  selected= {selectedRow.id === row.id}
                >
                  <TableCell>{row.ttype}</TableCell>
                  <TableCell>{row.detail}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.state}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={isGenerateOpen}
          onClose={() => setIsGenerateOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <GenerateInvoice setIsOpen={setIsGenerateOpen}/>
        </Modal>
        <Modal
          open={isViewTxOpen}
          onClose={() => {
            setSelectedRow({})
            setIsViewTxOpen(false)
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ViewTx selectedTx={selectedRow} setIsOpen={setIsViewTxOpen}/>
        </Modal>
        <Modal
          open={isWithdrawalOpen}
          onClose={() => setIsWithdrawalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Withdrawal setIsOpen={setIsWithdrawalOpen}/>
        </Modal>
      </div>)
  }
}

export default Wallet