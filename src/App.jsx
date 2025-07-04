import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp'; // Create this next
import CorporateDetails from './components/CorporateDetails';
import SuccessMessage from './components/SuccessMessage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/corporate" element={<CorporateDetails />} />
        <Route path="/success" element={<SuccessMessage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
