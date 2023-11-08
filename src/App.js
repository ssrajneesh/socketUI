import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router'; // Import Navigate from 'react-router'
import Chat from './Chat';
import Login from './Login';


// Set the initial value of isLoggedIn based on localStorage
function App() {
  const storedToken = localStorage.getItem('token');
  console.log(storedToken)

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={storedToken ? <Chat /> : <Navigate to="/login" />}
      />
      {/* <Route path="/" element={<Chat />} /> */}

    </Routes>
  );
}

export default App;
