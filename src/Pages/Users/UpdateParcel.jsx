import axiosPublic from "@/Hooks/axiosPublic";
import { useState } from "react";



import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";

const UpdateParcel = () => {
  const {_id,senderName,senderEmail,senderPhone,parcelType,parcelWeight,receiverName,receiverPhone,deliveryAddress,longitude,latitude,promisedDate} = useLoaderData()
  // console.log(promisedDate);
   
    const axios = axiosPublic();
    const [deliveryFee, setDeliveryFee] = useState(0);

    // Fetch user data
    

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: senderName || '',
            email:senderEmail || '',
            phone: senderPhone || '',
            parcelType: parcelType || '',
            weight: parcelWeight || '',
            receiverName: receiverName || '',
            receiverPhone: receiverPhone || '',
            deliveryAddress: deliveryAddress || '',
            latitude: latitude || '',
            longitude: longitude || '',
            requestedDeliveryDate: promisedDate || '',
            
        }
    });

    // Calculate delivery fee based on weight
    const calculateDeliveryFee = (weight) => {
        if (weight <= 1) return 50;
        if (weight <= 2) return 150;
        return 200;
    };

    const onSubmit =async (data) => {
        const parcelInfo = {
            senderName: data.name,
            senderEmail: data.email,
            senderPhone: data.phone,
            receiverName: data.receiverName,
            receiverPhone: data.receiverPhone,
            deliveryFee: data.deliveryFee,
            deliveryAddress: data.deliveryAddress,
            parcelWeight: data.weight,
            promisedDate: data.requestedDeliveryDate,
            parcelType: data.parcelType,
            latitude: data.latitude,
            longitude: data.longitude,
            
            orderedDate: new Date().toISOString()
        };
        // Change to PUT/PATCH request for update
      const res =  axios.patch(`/parcels/${_id}`, parcelInfo)
      .then(() => alert("Parcel updated successfully!"))
        // console.log(res.data);
            
            
    };

    const handleWeightChange = (e) => {
        const weight = e.target.value;
        const fee = calculateDeliveryFee(weight);
        setDeliveryFee(fee);
        setValue("deliveryFee", fee);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        ✏️ Update Your Parcel
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Sender Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-blue-200 pb-2">
                Sender Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                    Full Name
                  </label>
                  
                <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                readOnly
              />
                  
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    readOnly
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="number"
                    {...register("phone", { required: "Phone number is required" })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    readOnly
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* Parcel Details Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-blue-200 pb-2">
                Parcel Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="parcelType" className="block text-sm font-medium text-gray-600 mb-1">
                    Parcel Type
                  </label>
                  <select
                  defaultValue={parcelType}
                    id="parcelType"
                    {...register("parcelType", { required: "Parcel type is required" })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="">Select Parcel Type</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothes">Clothes</option>
                    <option value="documents">Documents</option>
                  </select>
                  {errors.parcelType && <p className="text-red-500 text-sm mt-1">{errors.parcelType.message}</p>}
                </div>

                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-600 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    id="weight"
                    type="number"
                    step="0.1"
                    {...register("weight", { 
                      required: "Weight is required", 
                      min: { value: 0.1, message: "Weight must be greater than 0" }
                    })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="0.5"
                    onChange={handleWeightChange}
                  />
                  {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
                </div>

                <div>
                  <label htmlFor="deliveryFee" className="block text-sm font-medium text-gray-600 mb-1">
                    Delivery Fee
                    <span className="text-xs text-gray-500 ml-1">(auto-calculated)</span>
                  </label>
                  <div className="relative">
                    <input
                      id="deliveryFee"
                      type="text"
                      value={`৳${deliveryFee}`}
                      readOnly
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 font-medium text-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Receiver Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-blue-200 pb-2">
                Receiver Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="receiverName" className="block text-sm font-medium text-gray-600 mb-1">
                    Receiver's Name
                  </label>
                  <input
                    id="receiverName"
                    type="text"
                    {...register("receiverName", { required: "Receiver's name is required" })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Jane Smith"
                  />
                  {errors.receiverName && <p className="text-red-500 text-sm mt-1">{errors.receiverName.message}</p>}
                </div>

                <div>
                  <label htmlFor="receiverPhone" className="block text-sm font-medium text-gray-600 mb-1">
                    Receiver's Phone
                  </label>
                  <input
                    id="receiverPhone"
                    type="text"
                    {...register("receiverPhone", { required: "Receiver's phone is required" })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="+880 9876 543210"
                  />
                  {errors.receiverPhone && <p className="text-red-500 text-sm mt-1">{errors.receiverPhone.message}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Details Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-blue-200 pb-2">
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-600 mb-1">
                    Delivery Address
                  </label>
                  <input
                    id="deliveryAddress"
                    type="text"
                    {...register("deliveryAddress", { required: "Delivery address is required" })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="123 Street, City, Country"
                  />
                  {errors.deliveryAddress && <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-600 mb-1">
                      Latitude
                    </label>
                    <input
                      id="latitude"
                      type="number"
                      step="any"
                      
                      {...register("latitude", { 
                        required: "Latitude is required",
                        valueAsNumber:true
                     })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="23.8103"
                    />
                    {errors.latitude && <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-600 mb-1">
                      Longitude
                    </label>
                    <input
                      id="longitude"
                      type="number"
                      step="any"
                      {...register("longitude", 
                        { required: "Longitude is required",
                            valueAsNumber:true

                         })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="90.4125"
                    />
                    {errors.longitude && <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="requestedDeliveryDate" className="block text-sm font-medium text-gray-600 mb-1">
                      Delivery Date
                    </label>
                    <input
                      id="requestedDeliveryDate"
                      type="date"
                      {...register("requestedDeliveryDate", { required: "Requested delivery date is required" })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    {errors.requestedDeliveryDate && <p className="text-red-500 text-sm mt-1">{errors.requestedDeliveryDate.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
              >
                Update Parcel 
              </button>
            </div>
          </form>

                </div>
            </div>
        </div>
    );
};

export default UpdateParcel;