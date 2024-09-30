import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './context/ProtectedRoute';
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Ytb from "./pages/ytb/Ytb";

import PrivacyPolicy from "./pages/privacy-policy/Privacy-policy"


function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="/ytb" element={<ProtectedRoute element={<Ytb />} />} />
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />


              <Route index path="/" element={<Home />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/login" element={<Login />} />

              
              <Route path="/privacy-policy" element={<PrivacyPolicy />}  />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
