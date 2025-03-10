
;

import axiosPublic from '@/Hooks/axiosPublic';
import { useQuery } from '@tanstack/react-query';


const Sales = () => {
    const axios = axiosPublic()
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axios.get("/parcels");
      // console.log(res.data); // Log the response
      return Array.isArray(res.data) ? res.data : []; // Ensure it's an array
    },
  });

  // Ensure parcels is an array
  const safeParcels = Array.isArray(parcels) ? parcels : [];

  // Process the parcel data
  const deliveredParcels = safeParcels.filter(parcel => parcel.status === 'Delivered');
  const cancelledParcels = safeParcels.filter(parcel => parcel.status === 'Cancelled');
  const pendingParcels = safeParcels.filter(parcel => parcel.status === 'Pending' || parcel.status === 'On the Way');

  const totalDeliveredPrice = deliveredParcels.reduce((sum, parcel) => sum + (parcel.deliveryFee || 0), 0);
  const totalCancelledPrice = cancelledParcels.reduce((sum, parcel) => sum + (parcel.deliveryFee || 0), 0);
  const totalPendingPrice = pendingParcels.reduce((sum, parcel) => sum + (parcel.deliveryFee || 0), 0);

  return (
    
    <div className="p-5 mx-auto">
     <h1 className="text-2xl font-bold mb-4">Sales Overview</h1>
      <div className="grid  grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Delivered Parcels</h2>
          <p className="text-green-700">Total Price: ${totalDeliveredPrice}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Cancelled Parcels</h2>
          <p className="text-red-700">Total Price: ${totalCancelledPrice}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Pending Parcels</h2>
          <p className="text-yellow-700">Total Price: ${totalPendingPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default Sales;