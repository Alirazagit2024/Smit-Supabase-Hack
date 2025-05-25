import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Authentication
import Login from './pages/login/Login.jsx';
import Reset from './pages/resetpassword/Reset.jsx';
import UpdatePassword from './pages/updatePassword/UpdatePassword.jsx';
import Signup from './pages/signup/Signup.jsx';

// Pages
import App from './App.jsx';
import About from './pages/about/About.jsx';
import Services from './pages/services/Services.jsx';
import Pricing from './pages/pricing/Pricing.jsx';
import Contact from './pages/contact/Contact.jsx';
import NotFound from './components/Notfound.jsx';
import Unauthorized from './components/Unauthorized.jsx';
import UserChat from './pages/UserChat/UserChat.jsx';
import AdminChat from './pages/AdminChat/AdminChat.jsx';

// Layouts
import NoLayout from './layouts/NoLayout.jsx';
import MainLayout from './layouts/MainLayout.jsx';

// Context
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthContext, AuthProvider } from './context/AuthContext.jsx';
import { AOSProvider } from './components/AOSContext.jsx';

// Routing Guards
import PrivateRoute from './components/PrivateRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Error Boundary
import ErrorBoundary from './components/ErrorBoundary.jsx';

// CSS
import './index.css';
import Userform from './pages/ParticipantForm/ParticipantForm.jsx';
import AdminDashboard from './pages/admin-dashboard/AdminDashboard.jsx';
import EventPage from './pages/eventnamepage/eventnamepage.jsx';
import Manageevents from './pages/manage-events/manageevents.jsx';
import ParticipantsPage from './pages/participants/participants.jsx';
import UserDashboard from './pages/user-dashboard/UserDashboard.jsx';

// Component to handle conditional chat rendering
const ChatRoute = () => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ErrorBoundary>
      {role === 'admin' ? <AdminChat /> : <UserChat />}
    </ErrorBoundary>
  );
};

// Global Chat Wrapper
const ChatWrapper = () => {
  const { user, loading } = useContext(AuthContext);

  // Only show chat icon for authenticated users
  if (loading || !user) {
    return null;
  }

  return (
    <ErrorBoundary>
      <UserChat />
    </ErrorBoundary>
  );
};

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <AOSProvider>
            <Router>
              <ToastContainer position="top-right" autoClose={3000} />
              <ChatWrapper /> {/* Global chatbot */}
              <Routes>
                <Route element={<MainLayout />}>
                  <Route
                    path="/chat"
                    element={
                      <PrivateRoute>
                        <ChatRoute />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <App />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <PrivateRoute>
                        <About />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/services"
                    element={
                      <PrivateRoute>
                        <Services />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/pricing"
                    element={
                      <PrivateRoute>
                        <Pricing />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <PrivateRoute>
                        <Contact />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/user-dashboard"
                    element={
                      <PrivateRoute>
                        <UserDashboard />
                      </PrivateRoute>
                    }
                  />
                   <Route
                    path="/admin-dashboard"
                    element={
                      <PrivateRoute>
                        <AdminDashboard />
                      </PrivateRoute>
                    }
                  />
                   <Route
                    path="/my-events"
                    element={
                      <PrivateRoute>
                        <EventPage />
                      </PrivateRoute>
                    }
                  />
                   <Route
                    path="/manage-events"
                    element={
                      <PrivateRoute>
                        <Manageevents />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/participants"
                    element={
                      <PrivateRoute>
                        <ParticipantsPage />
                      </PrivateRoute>
                    }
                  />
                    <Route
                    path="/form"
                    element={
                      <PrivateRoute>
                        <Userform />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route element={<NoLayout />}>
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      <PublicRoute>
                        <Signup />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/reset"
                    element={
                      <PublicRoute>
                        <Reset />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/update-password"
                    element={
                      <PublicRoute>
                        <UpdatePassword />
                      </PublicRoute>
                    }
                  />
                </Route>
              </Routes>
            </Router>
          </AOSProvider>
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error rendering main.jsx:', error);
}