import axiosSecure from "@/Hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllDeliveryman = () => {
    const axios = axiosSecure();
    
    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get("/users");
            return res.data.filter(user => user.role === "deliveryman");
        },
    });

    const { data: parcels = [] } = useQuery({
        queryKey: ["parcels"],
        queryFn: async () => {
            const res = await axios.get("/parcels");
            return res.data;
        },
    });

    const getDeliveredCount = (userId) => {
        return parcels.filter(parcel => 
            parcel.deliveryManId === userId && 
            parcel.status === 'Delivered'
        ).length;
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Delivery Agents</h2>
            
            <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Agent</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Parcels Delivered</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Performance</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img 
                                            src={user.photo || '/default-avatar.png'} 
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                        />
                                        <div className="ml-4">
                                            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {user.phone || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
    <div className="flex items-center">
        <span className="text-lg font-bold text-green-600">
            {getDeliveredCount(user._id)}
        </span>
        <span className="ml-2 text-sm text-gray-500">delivered</span>
    </div>
</td>
<td className="px-6 py-4 whitespace-nowrap">
    <div className="flex items-center">
        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
                getDeliveredCount(user._id) >= 10
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
            }`}
        >
            {getDeliveredCount(user._id) >= 10
                ? 'High Performer'
                : 'Needs Improvement'}
        </span>
    </div>
</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    
                               </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg">No delivery agents found</p>
                </div>
            )}
        </div>
    );
};

export default AllDeliveryman;