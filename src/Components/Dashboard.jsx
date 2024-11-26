// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchRoles } from '../services/api';

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [roleCount, setRoleCount] = useState(0);

    useEffect(() => {
        const loadCounts = async () => {
            try {
                const usersResponse = await fetchUsers();
                const rolesResponse = await fetchRoles();
                setUserCount(usersResponse.data.length);
                setRoleCount(rolesResponse.data.length);
            } catch (error) {
                console.error("Error fetching counts:", error);
            }
        };

        loadCounts();
    }, []);

    return (
        <div className="p-4  w-full h-screen">
            <h1 className="text-2xl font-bold text-white mb-4">Dashboard</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold">Total Users</h2>
                    <p className="text-3xl">{userCount}</p>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold">Total Roles</h2>
                    <p className="text-3xl">{roleCount}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;