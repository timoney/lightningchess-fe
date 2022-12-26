import React, { useContext, useState} from 'react'
import { AuthContext } from '../../contexts/Auth'
import { getDashboardTime, getUseFriendlyStatus, getOpponent } from '../../utils/utils'
import ChallengeDetailsContainer from './ChallengeDetailsContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'

const ChallengeTable = ({rows}) => {
  const userProfile = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const handleClose = () => {
    setSelectedRow({});
    setOpen(false);
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell align="right">Opponent</TableCell>
              <TableCell align="right">Created at</TableCell>
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
                <TableCell component="th" scope="row">{getUseFriendlyStatus(userProfile,row)}</TableCell>
                <TableCell align="right">{getOpponent(userProfile, row)}</TableCell>
                <TableCell align="right">{getDashboardTime(row.created_on)}</TableCell>
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
        <ChallengeDetailsContainer selectedChallenge={selectedRow} setOpen={setOpen}/>
      </Modal>
    </div>
  );
}

export default ChallengeTable