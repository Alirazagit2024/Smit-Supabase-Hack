import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx";
import UserDashboard from "./pages/userdashboard/UserDashboard.jsx";
import AdminDashboard from "./pages/admindashboard/AdminDashboard.jsx";

function App() {
  const { role, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;
  }

  // Redirect based on role
  if (role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  } else if (role === "user") {
    return <Navigate to="/user-dashboard" replace />;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
}

export default App;
