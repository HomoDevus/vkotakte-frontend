import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import LayoutWrapper from './components/layout/LayoutWrapper/LayoutWrapper'
import { ProtectedRoute } from './components/common/ProtectedRoute';
import Profile from './components/content/Profile';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Routes>
      <Route path='*' element={<ErrorPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/*<Route path="/register" element={<RegisterPage />} />*/}
      <Route path="/" element={<ProtectedRoute><LayoutWrapper /></ProtectedRoute>}>
        <Route path="profile">
          <Route path=":userId" element={<Profile />} />
          <Route path="" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
