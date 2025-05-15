import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cinai from "./Pages/Cinai";
import Home from "./Pages/Coverpage"
import Man from "./Pages/Homepage"
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cinai" element={<Cinai />} />
        <Route path="/Homepage" element={<Man />} />
      </Routes>
    </Router>
  );
}

export default App;


