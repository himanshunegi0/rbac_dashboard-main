// src/components/RoleList.jsx

import React, { useEffect, useState } from 'react';
import { fetchRoles, deleteRole } from '../services/api';
import RoleForm from './RoleForm';

const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {
        try {
            const response = await fetchRoles();
            setRoles(response.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            try {
                await deleteRole(id);
                loadRoles();
            } catch (error) {
                console.error("Error deleting role:", error);
            }
        }
    };

    return (
        <div className="p-4 text-white">
            <h2 className="text-xl font-bold mb-4">Role Management</h2>
            <button 
                className="bg-teal-700 hover:scale-110 duration-300 transition-all text-white px-4 py-2 rounded mb-4" 
                onClick={() => setSelectedRole({})}
            >
                Add Role
            </button>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Permissions</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(role => (
                        <tr key={role.id}>
                            {/* Ensure permissions are defined before using join */}
                            {/* Default to an empty string if permissions is undefined */}
                            {/* Check if permissions is defined before using join */}
                            <td className="border border-gray-300 p-2 text-xl">{role.name}</td>
                            <td className="border border-gray-300 p-2 text-xl">{role.permissions ? role.permissions.join(', ') : 'No permissions'}</td>  
                            {/* Render actions */}
                            <td className="border border-gray-300 p-2">
                                <button 
                                    className="bg-lime-700 text-white hover:scale-110 duration-300 transition-all px-2 py-1 rounded mr-1" 
                                    onClick={() => setSelectedRole(role)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="bg-red-600 text-white hover:scale-110 duration-300 transition-all px-2 py-1 rounded" 
                                    onClick={() => handleDelete(role.id)}
                                >
                                    Delete
                                </button>  
                            </td>  
                          </tr>  
                      ))}  
                  </tbody>  
              </table>  

              {selectedRole && (
                  // Pass selected role to RoleForm
                  <RoleForm role={selectedRole} onClose={() => setSelectedRole(null)} onRefresh={loadRoles} />
              )}
          </div >
      );
};

export default RoleList;