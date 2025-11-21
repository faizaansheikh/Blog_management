
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './auth/Login';
import Dashboard from './dashboard/Page';

import Register from './auth/Register';
import { useAntdMessage } from './customHooks/useAntdMessage';
import ProtectedRoute from './components/layout/ProtectedRoute';
function App() {
    const { contextHolder} = useAntdMessage();

  return (
    <BrowserRouter>
    {contextHolder}
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
        <Route path="/register" element={<Register />} />

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
