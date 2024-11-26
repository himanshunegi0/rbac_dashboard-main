// src/components/RoleForm.jsx

import React, { useState, useEffect } from 'react';
import { addRole, updateRole } from '../services/api';

const RoleForm = ({ role, onClose, onRefresh }) => {
    // Initialize form data with empty values and ensure permissions is always an array
    const [formData, setFormData] = useState({ name: '', permissions: [] });

    useEffect(() => {
        if (role) {
            // Ensure permissions is initialized as an array
            setFormData({
                ...role,
                permissions: Array.isArray(role.permissions) ? role.permissions : [] // Ensure permissions is always an array
            });
        }
    }, [role]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePermissionsChange = (e) => {
        const value = e.target.value;

        // Update permissions based on checkbox state
        setFormData((prev) => {
            const newPermissions = prev.permissions.includes(value)
                ? prev.permissions.filter((perm) => perm !== value)
                : [...prev.permissions, value];

            return { ...prev, permissions: newPermissions };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (role.id) {
                await updateRole(formData); // Update existing role
            } else {
                await addRole(formData); // Add new role
            }
            onRefresh(); // Refresh roles list after saving changes
            onClose(); // Close modal after successful save
        } catch (error) {
            console.error("Error saving role:", error); // Log any errors that occur during save
        }
    };

    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gradient-to-r from-teal-800 p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-lg font-bold mb-[20px] text-white">{role.id ? 'Edit Role' : 'Add Role'}</h3>

                <form onSubmit={handleSubmit}>
                    <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Role Name" 
                        required 
                        className='border border-gray-400 p-[10px] mb-[10px] w-full text-black' 
                    />

                    {/* Permissions Checkboxes */}
                    {['Read', 'Write', 'Delete'].map((perm) => (
                        <label key={perm} className='flex items-center text-white mb-2'>
                            {perm}
                            <input 
                                type='checkbox' 
                                value={perm} 
                                checked={formData.permissions.includes(perm)} 
                                onChange={handlePermissionsChange} 
                                className="ml-2"
                            />
                        </label>
                    ))}

                    <div className='flex justify-end mt-[20px]'>
                        <button type='submit' className='bg-blue-500 text-white px-[10px] py-[5px] rounded mr-[10px]'>Save</button>
                        <button type='button' onClick={onClose} className='bg-gray-500 text-white px-[10px] py-[5px] rounded'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoleForm;