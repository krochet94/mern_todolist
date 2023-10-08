import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Login from './components/Login';
import { AuthProvider } from './auth-context';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" exact element={<Welcome />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
