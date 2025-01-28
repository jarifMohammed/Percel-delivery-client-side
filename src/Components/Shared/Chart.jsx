
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LineChart, Line } from "recharts";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Chart = () => {
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axios.get("/parcels");
      return res.data;
    },
  });

  // Process data for the bar chart (parcels booked per day)
  const processBookedData = (parcels) => {
    const bookedData = {};

    parcels.forEach((parcel) => {
      const date = parcel.orderedDate.split("T")[0]; // Extract the date part
      if (!bookedData[date]) {
        bookedData[date] = 0;
      }
      bookedData[date]++;
    });

    return Object.keys(bookedData).map((date) => ({
      date,
      booked: bookedData[date],
    }));
  };

  // Process data for the line chart (booked vs delivered parcels)
  const processComparisonData = (parcels) => {
    const comparisonData = {};

    parcels.forEach((parcel) => {
      const date = parcel.orderedDate.split("T")[0]; // Extract the date part
      if (!comparisonData[date]) {
        comparisonData[date] = { booked: 0, delivered: 0 };
      }
      comparisonData[date].booked++;
      if (parcel.status === "Delivered") {
        comparisonData[date].delivered++;
      }
    });

    return Object.keys(comparisonData).map((date) => ({
      date,
      booked: comparisonData[date].booked,
      delivered: comparisonData[date].delivered,
    }));
  };

  const bookedData = processBookedData(parcels);
  const comparisonData = processComparisonData(parcels);

  return (
    <div className="flex justify-around">
     
      <BarChart width={600} height={300} data={bookedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="booked" fill="#8884d8" />
      </BarChart>

      
      <LineChart width={600} height={300} data={comparisonData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="booked" stroke="#8884d8" />
        <Line type="monotone" dataKey="delivered" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default Chart;