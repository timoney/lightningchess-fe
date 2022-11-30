import React, { useState} from 'react';
import ChallengeAcceptForm from './challenge/ChallengeAcceptForm'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';

const WaitingTable = ({rows}) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const handleClose = () => {
    setSelectedRow({});
    setOpen(false);
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Opponent</TableCell>
              <TableCell align="right">Your Color</TableCell>
              <TableCell align="right">Time Control</TableCell>
              <TableCell align="right">Increment</TableCell>
              <TableCell align="right">Sats</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => {
                  setSelectedRow(row)
                  setOpen(true)
                }}
                hover
                selected= {selectedRow.id === row.id}
              >
                <TableCell component="th" scope="row">
                  {row.opp_username}
                </TableCell>
                <TableCell align="right">{row.color === 'white' ? 'black' : 'white'}</TableCell>
                <TableCell align="right">{row.time_limit}</TableCell>
                <TableCell align="right">{row.increment}</TableCell>
                <TableCell align="right">{row.sats}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ChallengeAcceptForm challenge={selectedRow}/>
      </Modal>
    </div>
  );
}

export default WaitingTable