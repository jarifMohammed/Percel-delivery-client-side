import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);

const Payment = () => {
    return (
        <div className="w-screen">
            <div className="w-full max-w-lg p-6 border rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Complete Your Payment</h2>
                <Elements stripe={stripePromise}>
                    < CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
