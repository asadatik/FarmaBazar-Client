import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
console.log('Stripe Publishable Key:', import.meta.env.VITE_Payment_gateway_PK);

const Payment = () => {

    return (
        <div className="mx-auto container"  >
            <div  className="text-center space-y-20">

            <p className='  text-4xl uppercase font-normal border-y-2 border-cyan-700  p-2 lg:w-1/3 mx-auto '   >pay your bill</p>

                <Elements stripe={stripePromise}>
                   <CheckOut></CheckOut>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;