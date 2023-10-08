import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './components/pages/Register';
import Welcome from './components/pages/Welcome';
import Login from './components/pages/Login';
import Todos from './components/todos/Todos';
import { AuthContext } from './auth-context';

function App() {
  const { credentials } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          {!credentials?.username && <Route path="/register" exact element={<Register />} />}
          {!credentials?.username && <Route path="/login" exact element={<Login />} />}
          {credentials?.username && <Route path="/todos" exact element={<Todos />} />}
          <Route path="/" exact element={<Welcome />} />
          <Route exact path="*" element={<Welcome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
