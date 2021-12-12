import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login';
import Verification from './components/Verification';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/verification" element={<Verification />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
