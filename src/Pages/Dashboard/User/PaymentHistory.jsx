import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/AxioSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: paymentHistory = [] } = useQuery({
        queryKey: ['paymentHistory'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pay?email=${user?.email}`);
            return res.data;
        }
    });

    console.log(paymentHistory);
    return (

        <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-lg">
            <Helmet>
                <title>Payment History</title>
            </Helmet>
<div className="flex justify-center" >

<h2 className="text-center text-3xl font-bold my-5 p-1 bg-amber-500 text-black md:w-2/4 mx-auto'">Payment History</h2>

</div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-cyan-400">
                        <tr>
                            <th></th>
                            <th className="py-3 px-6   text-left text-gray-700 font-semibold">Transaction ID</th>
                            <th className="py-3 px-6 text-left text-gray-700 font-semibold">Date</th>
                            <th className="py-3 px-6 text-left text-gray-700 font-semibold">Price</th>
                            <th className="py-3 px-6 text-left text-gray-700 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {paymentHistory.length > 0 ? (
                            paymentHistory.map((payment, index) => (

                                <tr key={payment.transactionId} className={` text-lg  transition-colors  ${index % 2 === 0 ? 'bg-gray-300' : 'bg-white'}`} >
                                    <td className='text-black text-lg  pl-2 '>
                                        {index + 1}.
                                    </td>
                                    <td className="py-4 text-black  px-6">{payment.transactionId}</td>
                                    <td className="py-4 text-black  px-6">
                                    {new Date(payment.data).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 text-black  px-6">${payment.price.toFixed(2)}</td>
                                    <td className="py-4  px-6">
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="py-4 px-6 text-center text-rose-600" colSpan="4">
                                    No payment history available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default PaymentHistory;