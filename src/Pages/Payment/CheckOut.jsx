import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import useCart from "../../Hook/useCart/useCart";
import useAxiosSecure from "../../Hooks/AxioSecure/useAxiosSecure";


const CheckOut = () => {

    const {user} = useContext(AuthContext);

    const [error, setError] = useState();
    const stripe = useStripe();
    const Elements = useElements();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [carts, refetch, isLoading] = useCart();
    console.log('Sellected carts',carts);
    const totalPrice = carts.reduce((total, i) => total + i.price, 0);
 
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/createPayment', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])


    const Submit = async (event) => {
        event.preventDefault();
        if (!stripe || !Elements) {
            return;
        }
        const card = Elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
       
            setError(error.message)
        }
        else {
            console.log('payment:', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('paymentIntent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    data: new Date(),
                    status: 'Pending',
                    cartIds: carts?.map(i => i._id),
                    transactionId: paymentIntent.id,
                    sellerEmail: carts?.map(i => i.sellerEmail),
                    medicineName: carts?.map(i => i.name)
                }
                const res = await axiosSecure.post('/payments', payment)
                console.log(res);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    navigate('/invoice')
                    Swal.fire({
                        position: "top-right",
                        icon: "success",
                        title: "Thank you for your  payment.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }
    }

    if (isLoading) {
         <div  className=" my-24 flex justify-center    "  >
         
        <img className="w-40" src="https://i.ibb.co/Vtpsz3S/Animation-1717848822065.gif" alt="" />

         </div> 
    }

    console.log(carts);

    return (
       
        <form onSubmit={Submit} className="space-y-4 max-w-md mx-auto">
             <Helmet>
              <title>Payment</title>
           </Helmet>
        <CardElement
            options={{
                style: {
                    base: {
                        fontSize: '30px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }}
            className="mb-4 p-2 border-2 border-blue-500 rounded-lg"
        />
        
        <button 
            className="btn btn-md bg-blue-500 text-white text-lg   rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
            type="submit" 
            disabled={!stripe}
        >
            Pay bill
        </button>
        
        {/* Error message */}
        {error && (
            <p className="text-red-600 bg-red-100 border-l-4 border-red-500 py-2 px-4 rounded-lg">
                {error}
            </p>
        )}
        
        {/* Transaction ID */}
        {transactionId && (
            <p className="text-green-600 bg-green-100 border-l-4 border-green-500 py-2 px-4 rounded-lg">
                Your transaction ID: {transactionId}
            </p>
        )}
    </form>
    );
};

export default CheckOut;