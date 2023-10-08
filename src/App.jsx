import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './components/pages/Register';
import Welcome from './components/pages/Welcome';
import Login from './components/pages/Login';
import Todos from './components/todos/Todos';
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
            <Route path="/todos" exact element={<Todos />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
