import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import { AuthProvider } from './contexts/Auth'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header/>
        <Main/>
      </AuthProvider>
    </div>
  );
}

export default App;
