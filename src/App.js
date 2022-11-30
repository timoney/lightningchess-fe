import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import { AuthProvider } from './contexts/Auth'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";

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
            <CssBaseline />
            <Header/>
            <Main/>
            </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
