import './App.css';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import EmployeeList from './components/EmployeeList.js';
import CreateEmployee from './components/CreateEmployee.js';
import EditEmployee from './components/EditEmployee.js';
import { useState, useEffect } from 'react';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/add" element={<CreateEmployee />} />
            <Route path="/employees/:id" element={<EditEmployee />} />
            
          </Routes>
        </BrowserRouter> 
      </header>
    </div>
  );
}

export default App;