
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './auth/Login';
import Dashboard from './dashboard/Page';
import ProtectedRoute from './components/layout/ProtectedRoute';
import UsersList from './dashboard/users/UsersList';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        
      </Routes>
    </BrowserRouter>
  )
}

export default App
