export const getColor = (userProfile, gameInfo) => {
  if (userProfile.username === gameInfo.username) { 
    return gameInfo.color
  } else {
    return gameInfo.color === 'white' ? 'black' : 'white'
  }
}

export const getDashboardTime = (dateStrUtc) => {
  // convert to local time
  const dateUtc = new Date(dateStrUtc)
  const newDate = new Date(dateUtc.getTime() - dateUtc.getTimezoneOffset()*60*1000)

  const dateCurrent = new Date()

  // if its the current date only return time
  if (newDate.toLocaleDateString() === dateCurrent.toLocaleDateString()) {
    return newDate.toLocaleTimeString()
  } else {
    return newDate.toLocaleDateString()
  }
}

export const getLocalTime = (dateStrUtc) => {
  // convert to local time
  const dateUtc = new Date(dateStrUtc)
  const newDate = new Date(dateUtc.getTime() - dateUtc.getTimezoneOffset()*60*1000)
  return newDate.toLocaleString()
}

export const getStatus = (userProfile, gameInfo) => {
  if (userProfile.username === gameInfo.username) {
    if (gameInfo.status === "WAITING") {
      return "Waiting for opponent to accept"
    } else if (gameInfo.status === "ACCEPTED") {
      return "Waiting for you to play"
    }
  } else {
    if (gameInfo.status === "WAITING") {
      return "Waiting for you to accept"
    }
  }
}

export const getOpponent = (userProfile, gameInfo) => {
  if (userProfile.username === gameInfo.username) {
    return gameInfo.opp_username
  } else {
    return gameInfo.username
  }
}