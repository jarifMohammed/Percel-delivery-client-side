import React, { useContext } from "react";
import { Package, Users, CheckCircle } from "lucide-react";
import CountUp from "react-countup";
import axiosPublic from "@/Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "@/Providers/AuthProvider";

// StatisticCard component
const StatisticCard = ({ title, value, icon: Icon, suffix = "" }) => (
  <div className="bg-white p-6  rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <Icon className="h-4 w-4 text-gray-500" />
    </div>
    <div className="text-2xl font-bold">
      <CountUp end={value} duration={2.5} separator="," />
      {suffix}
    </div>
  </div>
);

const Stats = () => {
  // Access user from AuthContext
  

  // Initialize axios instances
  const axios = axiosPublic();
  

  // Fetch users data
  

  // Fetch parcels data
  const {
    data: parcels = [],
    isLoading: isParcelsLoading,
    isError: isParcelsError,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axios.get("/parcels");
      return res.data;
    },
  });

  // Calculate statistics
  
  const deliveredParcels = parcels.filter(
    (parcel) => parcel.status === "Delivered"
  ).length;
  const totalBookings = parcels.filter((parcel) =>
    ["On the Way", "Pending"].includes(parcel.status)
  ).length;

  // Handle loading and error states
  if ( isParcelsLoading) {
    return <div>Loading...</div>;
  }

  if (isParcelsError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatisticCard
        title="Total Bookings"
        value={totalBookings}
        icon={Package}
      />
     
      <StatisticCard
        title="Delivered Parcels"
        value={deliveredParcels}
        icon={CheckCircle}
      />
    </div>
  );
};

export default Stats;