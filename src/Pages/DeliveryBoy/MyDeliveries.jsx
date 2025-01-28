import axiosPublic from "@/Hooks/axiosPublic";
import { AuthContext } from "@/Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LocationModal from "./LocationModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const MyDeliveries = () => {
  const [modalData, setModalData] = useState(null);
  const { user } = useContext(AuthContext);
  const axios = axiosPublic();

  // Get logged-in delivery man's data
  const { data: deliveryMan, isLoading: loadingUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // Get all parcels
  const {
    data: allParcels = [],
    isLoading: loadingParcels,
    refetch,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axios.get("/parcels");
      return res.data;
    },
  });

  // Filter parcels that match the delivery man's ID
  const assignedParcels = allParcels.filter(
    (parcel) => parcel.deliveryManId === deliveryMan?._id
  );

  if (loadingUser || loadingParcels) {
    return <Loader></Loader>;
  }

  // Date formatting function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle delivered action
  const handleDelivered = async (parcelId, status) => {
    if (status === "Delivered") {
      toast.info("This parcel is already delivered.");
      return;
    }

    toast.info("Updating parcel status to Delivered...");
    const updateInfo = {
      status: "Delivered",
    };
    try {
      await axios.patch(`/parcels/update/${parcelId}`, updateInfo);
      refetch();
      toast.success("Parcel marked as delivered successfully!");
    } catch (error) {
      console.error("Delivery update failed:", error);
      toast.error("Failed to update parcel status.");
    }
  };

  // Handle cancel delivery
  const handleCancel = async (parcelId, status) => {
    if (status === "Cancelled") {
      toast.info("This parcel is already cancelled.");
      return;
    }

    toast.info("Cancelling delivery...");
    const updateInfo = {
      status: "Cancelled",
    };
    try {
      await axios.patch(`/parcels/update/${parcelId}`, updateInfo);
      refetch();
      toast.success("Delivery cancelled successfully!");
    } catch (error) {
      console.error("Cancellation failed:", error);
      toast.error("Failed to cancel delivery.");
    }
  };

  // Modal open handler
  const openModal = (latitude, longitude) => {
    setModalData({ latitude, longitude });
  };

  // Modal close handler
  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        My Assigned Deliveries
      </h2>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {assignedParcels.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Parcel Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Sender
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Receiver
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Deliver By
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
              {assignedParcels.map((parcel) => (
                <tr key={parcel._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium capitalize">
                    {parcel.parcelType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {parcel.senderName}
                    <br />
                    <span className="text-gray-500 text-xs">
                      {parcel.senderPhone}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {parcel.receiverName}
                    <br />
                    <span className="text-gray-500 text-xs">
                      {parcel.receiverPhone}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(parcel.approximateDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                        parcel.status === "On the Way"
                          ? "bg-blue-100 text-blue-800"
                          : parcel.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : parcel.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      disabled={
                        parcel.status === "Delivered" ||
                        parcel.status === "Cancelled"
                      }
                      className="px-3 py-1.5 bg-red-100 text-red-800 rounded-md hover:bg-red-200 text-sm"
                      onClick={() => handleCancel(parcel._id, parcel.status)}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={parcel.status === "Cancelled"}
                      className="px-3 py-1.5 bg-green-100 text-green-800 rounded-md hover:bg-green-200 text-sm"
                      onClick={() => handleDelivered(parcel._id, parcel.status)}
                    >
                      Delivered
                    </button>
                    <button
                      onClick={() => openModal(parcel.latitude, parcel.longitude)}
                      className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 text-sm"
                    >
                      View Location
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No deliveries assigned to you yet</p>
        </div>
      )}
      {modalData && (
        <LocationModal
          isOpen={!!modalData}
          onClose={closeModal}
          latitude={modalData.latitude}
          longitude={modalData.longitude}
        />
      )}
    </div>
  );
};

export default MyDeliveries;