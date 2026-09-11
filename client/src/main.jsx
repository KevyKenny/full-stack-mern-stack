import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import GuestRoute from './components/GuestRoute.jsx'
import About from './pages/About.jsx'
import EditTask from './pages/EditTask.jsx'
import AdminHome from './pages/AdminHome.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:id/edit"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute adminOnly>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
         <Route
          path="/about"
          element={
            <GuestRoute>
              <About />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
