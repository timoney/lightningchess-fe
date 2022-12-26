import './App.css';

import React, { useContext } from 'react'

import Dashboard from './components/Dashboard'
import Welcome from './components/Welcome'
import Layout from './components/Layout'
import Wallet from './components/wallet/Wallet'
import { AuthProvider, AuthContext } from './contexts/Auth'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#4c8ec2',
        main: '#006191',
        dark: '#003763',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffff70',
        main: '#f7de3a',
        dark: '#c0ad00',
        contrastText: '#000',
      },
      mode: 'dark',
    },
  });

  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>} 
                />
                <Route path="/wallet" element={
                  <RequireAuth>
                    <Wallet />
                  </RequireAuth>}
                />
                <Route path="/welcome" element={<Welcome/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

function RequireAuth({ children }) {
  const userProfile = useContext(AuthContext)

  if (!userProfile.username) {
    return <Navigate to="/welcome"/>;
  }

  return children;
}

export default App;
