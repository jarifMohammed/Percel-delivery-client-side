import axiosPublic from "@/Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import Modal from "./Modal";

const AllParcels = () => {
  const [selectedParcel, setSelectedParcel] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(10); 
  const axios = axiosPublic();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axios.get("/parcels");
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

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = parcels.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Parcel Type</th>
              <th className="py-2 px-4 border-b">Weight (kg)</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Sender</th>
              <th className="py-2 px-4 border-b">Receiver</th>
              <th className="py-2 px-4 border-b">Order Date</th>
              <th className="py-2 px-4 border-b">Requested Date</th>
              <th className="py-2 px-4 border-b">Delivery Fee</th>
              <th className="py-2 px-4 border-b">Delivery Address</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{parcel.parcelType}</td>
                <td className="py-2 px-4 border-b">{parcel.parcelWeight}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      parcel.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{parcel.senderName}</td>
                <td className="py-2 px-4 border-b">{parcel.receiverName}</td>
                <td className="py-2 px-4 border-b">
                  {format(new Date(parcel.orderedDate), "dd MMM yyyy")}
                </td>
                <td className="py-2 px-4 border-b">
                  {format(new Date(parcel.promisedDate), "dd MMM yyyy")}
                </td>
                <td className="py-2 px-4 border-b">৳{parcel.deliveryFee}</td>
                <td className="py-2 px-4 border-b">{parcel.deliveryAddress}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    disabled={
                      parcel.status === "Delivered" ||
                      parcel.status === "Cancelled" ||
                      parcel.status === "On The Way"
                    }
                    onClick={() => openModal(parcel)}
                    className={`py-1 px-3 rounded-md transition-colors ${
                      parcel.status === "Delivered" ||
                      parcel.status === "Cancelled" ||
                      parcel.status === "On the Way"
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="inline-flex items-center -space-x-px">
            {Array.from({ length: Math.ceil(parcels.length / itemsPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`py-2 px-3 leading-tight ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <Modal refetch={refetch} parcel={selectedParcel} closeModal={closeModal} />
      )}
    </div>
  );
};

export default AllParcels;