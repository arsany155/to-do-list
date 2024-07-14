import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
  <div className='w-full h-fit'>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/home' element={<Home/>} />
    </Routes>
  </div>
    </>
  );
}

export default App;
