// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update import
import UserList from './components/UserList';
import RoleList from './components/RoleList';
import Sidebar from './Components/Sidebar'; // Include Sidebar
import Dashboard from './Components/Dashboard'; // Include Dashboard

const App = () => {
  return (
      <Router>
          <div className="flex bg-gradient-to-br from-emerald-950 to-blue-900">
              <Sidebar />
              <div className="flex-grow p-4">
                  <Routes> {/* Use Routes instead of Switch */}
                      <Route path="/" element={<Dashboard />} /> {/* Main Dashboard */}
                      <Route path="/users" element={<UserList />} /> {/* User Management */}
                      <Route path="/roles" element={<RoleList />} /> {/* Role Management */}
                  </Routes>
              </div>
          </div>
      </Router>
  );
};

export default App;