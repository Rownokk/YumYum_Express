import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Settings from './pages/Settings/Settings';
import Dashboard from './pages/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false); // State to manage sign-in status
  const url = "http://localhost:2000";

  const handleSignIn = (success) => {
    setIsSignedIn(success); // Update sign-in status
  };

  return (
    <div>
      <ToastContainer />
      <Navbar onSignIn={handleSignIn} isSignedIn={isSignedIn} /> {/* Pass state and handler to Navbar */}
      <hr />
      <div className="app-content">
        {isSignedIn && <Sidebar />} {/* Render Sidebar only if signed in */}
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/settings" element={<Settings url={url} />} />
          <Route path="/dashboard" element={<Dashboard url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

