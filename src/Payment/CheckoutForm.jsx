import axiosPublic from "@/Hooks/axiosPublic";
import axiosSecure from "@/Hooks/axiosSecure";
import { AuthContext } from "@/Providers/AuthProvider";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { deliveryFee, _id } = useLoaderData();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  // const axios = axiosSecure();
  const axiosPub = axiosPublic();

  useEffect(() => {
    if (!deliveryFee) return;

    const fetchClientSecret = async () => {
      try {
        const res = await axios.post("/create-payment-intent", {
          price: deliveryFee,
        });
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, [deliveryFee]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (!clientSecret) {
      setErrorMessage("Payment is not ready yet. Please try again.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
      return;
    }

    // Confirm the payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email,
          name: user?.displayName,
        }
      },
    });

    if (confirmError) {
      setErrorMessage(confirmError.message);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user.email,
        parcelID: _id,
        price: deliveryFee,
        date: new Date(),
        transactionId: paymentIntent.id,
        status: "Paid"
      };

      try {
        // Save payment details in the database
        await axiosPub.post('/payment', payment);

        // Optimistically update parcel status to "Paid" without waiting for response
        const paymentStatus = { paymentStatus: "Paid" };
        await axiosPub.patch(`/parcels/${_id}`, paymentStatus);

        // Show success message
        toast.success("Payment Status updated successfully!");
        
        // Navigate to the 'my-parcels' page
        navigate('/dashboard/my-parcels');
      } catch (error) {
        console.error("Error updating payment status:", error);
        toast.error("Payment failed. Please try again.");
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <button
        className="btn bg-green-200 px-5 rounded-lg my-4"
        type="submit"
        disabled={!stripe || !clientSecret || isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay"}
      </button>
      {transactionId && <p className="text-orange-700">Your TransactionId:  {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;
