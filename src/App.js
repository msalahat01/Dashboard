import React from 'react';
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { DataProvider } from './DataContext';
import Home from './Pages/Home';
import './App.css';

function App() {
  return (
  <>
    <Router>
    <DataProvider>
      <Routes>
            <Route path="/" element={<Home />} />
      </Routes>
      </DataProvider>
    </Router>
  </>
  )
}

export default App;
