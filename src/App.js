
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Description from './pages/Description'
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/description" element={<Description />} />
      </Routes>
    </>

  );
}

export default App;
