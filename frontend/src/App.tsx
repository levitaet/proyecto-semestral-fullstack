import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomeComponent from './components/home/HomeComponent'
import PostDetail from './components/post/PostDetail'
import Profile from './components/profile/Profile'
import Register from './components/register/Register'
import Login from './components/login/Login'
import Form from './components/form/Form'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user, errorMessage, handleLogin, handleLogout } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<HomeComponent  onLogout={handleLogout} />} 
        />
        <Route 
          path="/post/:id" 
          element={<PostDetail />} 
        />
        <Route 
          path="/profile" 
          element={
            user ? (
              <Profile />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Register />
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={handleLogin} errorMessage={errorMessage} />
            )
          } 
        />
        <Route 
          path="/new-post" 
          element={
            user ? (
              <Form />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
