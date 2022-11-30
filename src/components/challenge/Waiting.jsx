import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Waiting = () => {
  const [isWaiting, setIsWaiting] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  // poll each second to see if game started

  if (isWaiting) {
     return <p>Waiting for person to accept. Send them a link to the challenge!</p>
  } else if (isPlaying) {
    return <p>Challenge has been accepted, play here!</p>
  } else {
    return <p>Done playing!</p>
  }
}

export default Waiting