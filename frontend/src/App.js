import React, {useState} from 'react';
import './App.css';
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import HomePage from "./shared/pages/HomePage/HomePage";
import AccountPage from "./users/pages/AccountPage/AccountPage";
import {ProfileProvider} from "./contexts/Profile_context";

const App = () => {

  return (
      <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path="/user/:userId" element={<AccountPage/>}/>
        </Routes>
      </BrowserRouter>
      </ProfileProvider>
  );
}

export default App;
