// src/components/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gradient-to-bl from-black text-white w-64 min-h-screen p-4">
            <h2 className="text-lg font-bold mb-4">Dashboard</h2>
            <ul>
                <li className="mb-2">
                    <Link to="/" className="hover:text-gray-400 text-lg">Home</Link>
                </li>
                <li className="mb-2">
                    <Link to="/users" className="hover:text-gray-400 text-lg">User Management</Link>
                </li>
                <li className="mb-2">
                    <Link to="/roles" className="hover:text-gray-400 text-lg">Role Management</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;