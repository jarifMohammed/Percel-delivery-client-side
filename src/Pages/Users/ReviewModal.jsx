import axiosPublic from "@/Hooks/axiosPublic";
import { AuthContext } from "@/Providers/AuthProvider";
import { useContext, useState } from "react";

const ReviewModal = ({ parcel, closeModal, refetch }) => {
    const { user } = useContext(AuthContext);
    const axios = axiosPublic();
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!rating || !feedback) {
            alert("Please provide a rating and feedback.");
            return;
        }

        setIsSubmitting(true);
        const reviewData = {
            parcelId: parcel._id,
            deliveryManId: parcel.deliveryManId,
            reviewerName: user?.displayName || "Anonymous",
            date: new Date().toISOString(),
            rating: rating,
            feedback: feedback,
        };

        try {
            const res = await axios.post("/reviews", reviewData);
            if (res.status === 201) {
                alert("Review submitted successfully!");
                refetch(); // Refresh parcel list
                closeModal(); // Close modal
            } else {
                alert("Failed to submit review. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            if (error.response) {
                alert(`Error: ${error.response.data.error || "Failed to submit review"}`);
            } else {
                alert("There was an error submitting your review. Please try again later.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl mx-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Delivery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Review Giver and Deliveryman Info */}
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-600">Review Giver</p>
                            <p className="text-lg font-semibold text-gray-800">
                                {user?.displayName || "Anonymous"}
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-600">Deliveryman ID</p>
                            <p className="text-lg font-semibold text-gray-800">
                                {parcel.deliveryManId}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Rating and Feedback */}
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Rating
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Feedback
                            </label>
                            <textarea
                                rows="4"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                    <button
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;