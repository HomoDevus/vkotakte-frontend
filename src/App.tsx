import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import LayoutWrapper from './components/layout/LayoutWrapper/LayoutWrapper'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import Profile from './components/content/Profile/Profile'
import ErrorPage from './pages/ErrorPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import Users from './components/content/Users/Users';
import Feed from './components/content/Feed/Feed';

function App() {
  return (
    <Routes>
      <Route path='*' errorElement={<ErrorPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <LayoutWrapper />
          </ProtectedRoute>
        }
      >
        <Route path='profile/:userId' element={<Profile />} />
        <Route path='profile' element={<Profile />} />
        <Route path='users' element={<Users />} />
        <Route path='feed' element={<Feed />} />
      </Route>
    </Routes>
  )
}

export default App
