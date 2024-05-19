import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import React from "react";
import ProtectedRoute from "./context/ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Homepage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;
