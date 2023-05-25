import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import Dashboard from './components/dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
