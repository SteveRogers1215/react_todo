import './App.css';
import React from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import ToDo from './components/ToDo/ToDo'
import Categories from './components/Categories/Categories'
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer';
import AuthProvider from './contexts/AuthContext';
import LoginLanding from './components/Auth/LoginLanding';
import Landing from './components/Login/Landing';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
      <Navigation/>
      <Routes>
        <Route path='/login' element={<LoginLanding/>}/>
        <Route path='/' element={<Landing/>}/>
        <Route path='/categories' element={<ProtectedRoute><Categories/></ProtectedRoute>}/>
        <Route path='/todos' element={<ProtectedRoute><ToDo/></ProtectedRoute>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
      </Router>
      </AuthProvider>
    </div>
  );
}


