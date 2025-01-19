import React from 'react';
import './index.css';
import Registration from './components/Registration';
import Landing from './components/Landing';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
     
        <Route path ="/" element={<Landing />} />
        <Route path ="/register" element={<Registration />} />
        </Routes>
        </Router>
        
      
      
    </div>
  );
}

export default App;
