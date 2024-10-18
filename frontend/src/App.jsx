import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './Layout';
import PageNotFound from './components/PageNotFound';

// bootstrap css imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// pages imports
import PropertyTax from './pages/PropertyTax';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PropertyManagement from './pages/dashboard/PropertyManagement';
import AdminLogin from './pages/dashboard/AdminLogin';
import DashboardLayout from './DashboardLayout';
import UserManagement from './pages/dashboard/UserManagement';
import Dashboard from './pages/dashboard/Dashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="property" element={<PropertyManagement />} />
          <Route path="user" element={<UserManagement />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="property-tax" element={<PropertyTax />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
