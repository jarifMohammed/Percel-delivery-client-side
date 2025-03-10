import axiosSecure from "@/Hooks/axiosSecure";
import { AuthContext } from "@/Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Modal = ({ parcel, closeModal,refetch}) => {
  const axios = axiosSecure();
  const { user: currentUser } = useContext(AuthContext);
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users = []} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("/users");
      return res.data?.filter(user => user?.role === "deliveryman");
    },
  });
  // console.log("Users Data:", users);

  const filteredUsers = users.filter(user =>
    user?.name?.toLowerCase().includes(searchTerm.toLowerCase())


  );

  

  const assignDeliveryMan = async () => {
    const updateIdStatus = {
        deliveryManId: selectedDeliveryMan._id,
        approximateDate:deliveryDate,
        status:'On the Way'
        
    }
    if (!selectedDeliveryMan) {
      alert("Please select a delivery man.");
      return;
    }

    try {
      await axios.patch(`/parcels/assign/${parcel._id}`,updateIdStatus);
      refetch()
      alert("Delivery man assigned successfully!");
      
      closeModal();
      
    } catch (error) {
      console.error(error);
      alert("Failed to assign delivery man.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Parcel Management</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-8">
          {/* Parcel Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-lg">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Sender</h3>
              <p className="font-medium text-gray-900">{parcel.senderName}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Receiver</h3>
              <p className="font-medium text-gray-900">{parcel.receiverName}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Parcel Type</h3>
              <p className="font-medium text-gray-900 capitalize">{parcel.parcelType}</p>
            </div>
          </div>

          {/* Delivery Team Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Select Delivery Agent</h3>
              <div className="w-64">
                <input
                  type="text"
                  placeholder="Search delivery agents..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className={`p-4 border rounded-xl cursor-pointer transition-all ${
                    selectedDeliveryMan?._id === user._id
                      ? "border-blue-500 bg-blue-50"
                      : "hover:border-blue-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedDeliveryMan(user)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {user.phone || 'No contact available'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Approximate Delivery Date</h3>
            <div className="max-w-xs">
              <DatePicker
                selected={deliveryDate}
                onChange={(date) => setDeliveryDate(date)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                popperPlacement="auto"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex justify-end space-x-3">
            <button
              onClick={closeModal}
              className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={assignDeliveryMan}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Confirm Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;