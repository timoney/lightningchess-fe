import React, { useState, useEffect } from 'react';

const login = () => {
  alert('hi');
}

const fetchData = async () => {
  const response = await fetch('https://lightningchess-uq3lf7yjga-uc.a.run.app/login')
  const data = await response.json
  console.log(data);
}

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      Welcome!
      <button onClick={fetchData}>Login</button>
    </div>
  )
}

export default Main