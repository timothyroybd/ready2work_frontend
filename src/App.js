import React from 'react';
import './index.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
     
      <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
        <Header />
      </div>
      
    </div>
  );
}

export default App;
