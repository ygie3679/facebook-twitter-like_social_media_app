import React, {useState} from 'react';
import './App.css';
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import HomePage from "./shared/pages/HomePage/HomePage";

const App = () => {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
