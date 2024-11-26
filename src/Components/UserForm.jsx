// src/components/UserForm.jsx

import React, { useState, useEffect } from 'react';
import { addUser, updateUser, fetchRoles } from '../services/api';

const UserForm = ({ user, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({ name: '', email: '', role: '', active: true });
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const response = await fetchRoles();
                setRoles(response.data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        loadRoles();

        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(''); // Clear error on input change
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateRole = (role) => {
        return roles.some(r => r.name.toLowerCase() === role.toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!validateRole(formData.role)) {
            setError('The specified role does not exist.');
            return;
        }

        try {
            if (user.id) {
                await updateUser(formData);
            } else {
                await addUser(formData);
            }
            onRefresh();
            onClose();
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gradient-to-r from-teal-800 p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-lg font-bold text-white mb-4">{user.id ? 'Edit User' : 'Add User'}</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Name" 
                        required 
                        className="border border-gray-300 p-2 mb-3 w-full text-black"
                    />
                    <input 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Email" 
                        required 
                        className="border border-gray-300 p-2 mb-3 w-full text-black"
                    />
                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>} {/* Display error message */}
                    <input 
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange} 
                        placeholder="Role" 
                        required 
                        className="border border-gray-300 p-2 mb-3 w-full text-black"
                    />
                    <label className="flex items-center mb-3 text-white">
                        Active:
                        <input 
                            type="checkbox" 
                            name="active" 
                            checked={formData.active} 
                            onChange={(e) => setFormData({ ...formData, active: e.target.checked })} 
                            className="ml-2"
                        />
                    </label>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;