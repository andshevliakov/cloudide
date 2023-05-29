import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AuthPage from './authPages/AuthPage';
import MainCanvas from './mainCanvas/MainCanvas';
import SpawnerPage from './spawnerPage/spawnerPage';

function App() {
  return (
    <Router basename="/ide">
      <Routes>
        <Route path="/" element={<MainCanvas />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path='/spawner' element={<SpawnerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
