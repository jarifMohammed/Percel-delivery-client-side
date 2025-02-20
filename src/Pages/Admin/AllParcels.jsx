import axiosPublic from "@/Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import Modal from "./Modal";

const AllParcels = () => {
  const [selectedParcel, setSelectedParcel] = useState(null); // State for selected parcel
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const axios = axiosPublic();

  const { data: parcels = [],refetch} = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axios.get("/parcels");
      // console.log(res.data);
      return res.data;
    },
  });

  const openModal = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedParcel(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parcels.map((parcel) => (
          <div
            key={parcel._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {parcel.parcelType}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Weight: {parcel.parcelWeight} kg
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    parcel.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {parcel.status}
                </span>
              </div>

              <div className="space-y-2 border-t border-b py-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sender:</span>
                  <span className="text-gray-900">{parcel.senderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Receiver:</span>
                  <span className="text-gray-900">{parcel.receiverName}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="text-gray-900">
                    {format(new Date(parcel.orderedDate), "dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Requested Date:</span>
                  <span className="text-gray-900">
                    {format(new Date(parcel.promisedDate), "dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className="text-gray-900">৳{parcel.deliveryFee}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-1">Delivery Address:</p>
                <p className="text-sm text-gray-900 font-medium">
                  {parcel.deliveryAddress}
                </p>
              </div>

              <button
  disabled={parcel.status === "Delivered" || parcel.status === "Cancelled" || parcel.status === "On The Way"}
  onClick={() => openModal(parcel)}
  className={`mt-4 w-full py-2 px-4 rounded-md transition-colors ${
    parcel.status === "Delivered" || parcel.status === "Cancelled" || parcel.status === "On the Way"
      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
      : "bg-blue-600 text-white hover:bg-blue-700"
  }`}
>
  Manage
</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <Modal refetch={refetch} parcel={selectedParcel} closeModal={closeModal} />
      )}
    </div>
  );
};

export default AllParcels;
