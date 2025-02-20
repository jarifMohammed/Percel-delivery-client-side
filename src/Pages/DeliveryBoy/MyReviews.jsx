import axiosPublic from "@/Hooks/axiosPublic";
import { AuthContext } from "@/Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const MyReviews = () => {
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

    // Get all reviews
    const { data: allReviews = [], isLoading: loadingReviews, refetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axios.get("/reviews");
            return res.data;
        },
    });

    // Filter reviews that match the delivery man's ID
    const reviews = allReviews.filter((review) => review.deliveryManId === deliveryMan?._id);

    if (loadingUser || loadingReviews) {
        return <div>Loading...</div>;
    }

    // Function to render stars dynamically based on the rating
    const renderStars = (rating) => {
        const totalStars = 5;
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <span key={i} className={i <= rating ? "text-yellow-500" : "text-gray-300"}>
                    ★
                </span>
            );
        }

        return stars;
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">My Reviews</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">{review.reviewerName}</h2>
                            <div className="flex space-x-1">{renderStars(review.rating)}</div>
                        </div>
                        <p className="text-gray-700 mb-4">{review.feedback}</p>
                        <div className="text-sm text-gray-500">
                            <p>Parcel ID: {review.parcelId}</p>
                            <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReviews;
