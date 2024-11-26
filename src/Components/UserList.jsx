// src/components/UserList.jsx

import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../services/api';
import UserForm from './UserForm';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const response = await fetchUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id);
                loadUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <div className="p-4 text-white">
            <h2 className="text-xl font-bold mb-4">User Management</h2>
            <button 
                className="bg-teal-700 hover:scale-110 duration-300 transition-all text-white px-4 py-2 rounded mb-4" 
                onClick={() => setSelectedUser({})}
            >
                Add User
            </button>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Role</th>
                            <th className="border border-gray-300 p-2">Status</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="border text-xl border-gray-300 p-2">{user.name}</td>
                                <td className="border text-xl border-gray-300 p-2">{user.email}</td>
                                <td className="border text-xl border-gray-300 p-2">{user.role}</td>
                                <td className={`border text-xl border-gray-300 p-2 ${user.active?"text-green-500":"text-red-500"}`}>{user.active ? 'Active' : 'Inactive'}</td>
                                <td className="border  border-gray-300 p-2">
                                    <button 
                                        className="bg-lime-700 hover:scale-110 duration-300 transition-all text-white px-2 py-1 rounded mr-1" 
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="bg-red-600 hover:scale-110 duration-300 transition-all text-white px-2 py-1 rounded" 
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedUser && (
                <UserForm user={selectedUser} onClose={() => setSelectedUser(null)} onRefresh={loadUsers} />
            )}
        </div>
    );
};

export default UserList;