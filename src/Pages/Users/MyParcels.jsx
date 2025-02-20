import axiosPublic from "@/Hooks/axiosPublic";
import { AuthContext } from "@/Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import toast from "react-hot-toast";

const MyParcels = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axios = axiosPublic();
  const { user } = useContext(AuthContext);

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/parcels/${user?.email}`);
      return res.data;

    },
    enabled: !!user?.email
  });
 
  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  // Date formatting function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Booked Parcels
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Parcel Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Requested Delivery
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Approximate Delivery
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Deliveryman
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Booking Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parcels.map((parcel) => (
              <tr
                key={parcel._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {parcel.parcelType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(parcel.promisedDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {parcel.approximateDate
                    ? formatDate(parcel.approximateDate)
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {parcel.deliveryManId || "Not assigned"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(parcel.orderedDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      parcel.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : parcel.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <div className="flex items-center gap-2">
                    <Link to={`/dashboard/update/${parcel._id}`}>
                      <button
                        className={`px-3 py-1.5 rounded-md text-sm ${
                          parcel.status !== "pending"
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                        disabled={parcel.status !== "pending"}
                      >
                        Update
                      </button>
                    </Link>
                    <button
                      className={`px-3 py-1.5 rounded-md text-sm ${
                        parcel.status !== "pending"
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                      disabled={parcel.status !== "pending"}
                      onClick={() => console.log("Cancel", parcel._id)}
                    >
                      Cancel
                    </button>
                    {parcel.status === "Delivered" && (
                      <button
                        className="px-3 py-1.5 rounded-md text-sm bg-purple-100 text-purple-800 hover:bg-purple-200"
                        onClick={() => setSelectedParcel(parcel)}
                      >
                        Review
                      </button>
                    )}
                    {parcel.status === "pending" && (
                      <Link
                        to={
                          parcel.paymentStatus === "Paid"
                            ? "#"
                            : `/dashboard/payment/${parcel._id}`
                        }
                        className={`px-3 py-1.5 rounded-md text-sm ${
                          parcel.paymentStatus === "Paid"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                        onClick={(e) => {
                          if (parcel.paymentStatus === "Paid") {
                            e.preventDefault(); // Prevent navigation
                            toast.error(
                              "This parcel has already been paid for."
                            );
                          }
                        }}
                      >
                        {parcel.paymentStatus === "Paid" ? "Paid" : "Pay"}
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {parcels.length === 0 && (
        <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No parcels booked yet</p>
        </div>
      )}
      {/* Review Modal */}
      {selectedParcel && (
        <ReviewModal
          parcel={selectedParcel}
          closeModal={() => setSelectedParcel(null)} // Close modal
          refetch={refetch} // Refetch data after submitting review
        />
      )}
    </div>
  );
};
export default MyParcels;
