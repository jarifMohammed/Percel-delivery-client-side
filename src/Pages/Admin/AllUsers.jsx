import axiosSecure from "@/Hooks/axiosSecure";
import { AuthContext } from "@/Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaUserShield, FaTrashAlt } from "react-icons/fa";
 // Add this import

const AllUsers = () => {
    const axios = axiosSecure();
    const { user: currentUser } = useContext(AuthContext); // Get current logged-in user

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get('/users');
            return res.data;
        }
    });

    // Handle Make Admin
    const handleMakeAdmin = (user) => {
        axios.patch(`/users/admin/${user._id}`)
            .then(res => {
                // console.log(res.data);
                refetch();
            })
            .catch(error => {
                console.error("Error making admin:", error);
            });
    };

    // Handle Delete User with confirmation
    const handleDeleteUser = (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            axios.delete(`/users/${user._id}`)
                .then(() => refetch())
                .catch(error => {
                    console.error("Error deleting user:", error);
                });
        }
    };

    return (
        <div className="overflow-x-auto p-4">
            <table className="table-auto w-full text-left bg-white shadow-md rounded-lg">
                {/* Table Head */}
                <thead className="bg-gray-100 text-gray-800">
                    <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3 text-center">Action</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="avatar">
                                        <div className="w-12 h-12 rounded-full">
                                            <img src={user.photo} alt="User Avatar" className="object-cover" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.phone}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-700">{user.email}</td>
                            <td className="px-6 py-4 text-gray-700 capitalize">{user.role}</td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex justify-center gap-3">
                                    {/* Make Admin Button */}
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        disabled={user.role === 'admin'}
                                        className={`btn btn-xs ${user.role === 'admin' ? 'btn-disabled' : 'btn-success'} flex items-center gap-2`}
                                    >
                                        <FaUserShield />
                                        {user.role === 'admin' ? 'Admin' : 'Make Admin'}
                                    </button>

                                    {/* Delete Button - Conditionally Rendered */}
                                    {user.role !== 'admin' && user._id !== currentUser?._id && (
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn btn-xs btn-error flex items-center gap-2 text-black"
                                        >
                                            <FaTrashAlt /> Delete
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;