import axiosPublic from "@/Hooks/axiosPublic";
import { AuthContext } from "@/Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";


const MyParcels = () => {
    const axios = axiosPublic();
    const { user } = useContext(AuthContext);
    
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/parcels/${user?.email}`);
            return res.data;
        }
    });

    // Date formatting function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">My Booked Parcels</h2>
            
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 border">Parcel Type</th>
                          
                            <th className="px-4 py-2 border">Requested Delivery Date</th>
                            <th className="px-4 py-2 border">Approximate Delivery Date</th>
                            <th className="px-4 py-2 border">Deliveryman ID</th>
                            <th className="px-4 py-2 border">Booking Date</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map(parcel => (
                            <tr key={parcel._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{parcel.parcelType}</td>
                                
                                <td className="px-4 py-2 border">
                                    {formatDate(parcel.promisedDate)}
                                </td>
                                <td className="px-4 py-2 border">
                                    {parcel.approximateDeliveryDate || 'N/A'}
                                </td>
                                <td className="px-4 py-2 border">
                                    {parcel.deliverymanId || 'Not assigned'}
                                </td>
                                <td className="px-4 py-2 border">
                                    {formatDate(parcel.orderedDate)}
                                </td>
                                <td className="px-4 py-2 border">
                                    <span className={`px-2 py-1 rounded-3xl ${
                                        parcel.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                                        parcel.status === 'delivered' ? 'bg-green-200 text-green-800' :
                                        'bg-gray-200 text-gray-800'
                                    }`}>
                                        {parcel.status}
                                    </span>
                                </td>
                               <div className="">
                               <td className="px-4 py-2 border flex space-x-2">
                                   <Link to={`/dashboard/update/${parcel._id}`}>
                                   <button
                                        className="bg-slate-300  px-3 py-1 rounded hover:bg-blue-100"
                                        disabled={parcel.status !== 'pending'}
                                    >
                                        Update
                                    </button>
                                   </Link>
                                    <button
                                    disabled={parcel.status !== 'pending'}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => console.log('Cancel', parcel._id)}
                                    >
                                        Cancel
                                    </button>
                                    {parcel.status === 'delivered' && (
                                        <button
                                            className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                                            onClick={() => console.log('Review', parcel._id)}
                                        >
                                            Review
                                        </button>
                                    )}
                                    {parcel.status === 'pending' && (
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            onClick={() => console.log('Pay', parcel._id)}
                                        >
                                            Pay
                                        </button>
                                    )}
                                </td>
                               </div>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {parcels.length === 0 && (
                <div className="text-center mt-4 text-gray-500">
                    No parcels booked yet
                </div>
            )}
        </div>
    );
};

export default MyParcels;