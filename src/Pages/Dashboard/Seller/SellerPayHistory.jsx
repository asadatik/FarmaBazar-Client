import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/AxioSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const SellerPayHistory = () => {
   
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);


    const { data: payment = [] } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pay?email=${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="overflow-x-auto p-4">
    <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-center items-center py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-lg">
            <h2 className="text-xl font-bold">Seller Payment History</h2>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">SL No</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Transaction ID</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Amount</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Date</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Payment Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">

                    {
                    payment.length > 0 ? (
                    payment.map((pay, index) => (
                        <tr key={index} className="hover:bg-gray-100 transition-colors">
                            <td className="px-3 py-4 border-b border-gray-200 bg-white text-xs font-medium text-gray-700 rounded-l-lg">{index + 1}.</td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-gray-700">{pay.transactionId}</td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-gray-700">${pay.price.toFixed(2)}</td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-gray-700">{new Date(pay.data).toLocaleDateString()}</td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    pay.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {pay.status}
                                </span>
                            </td>
                        </tr>
                    ))
                 )   
                  :   <tr>
                  <td className="py-4 text-xl font-bold  px-6 text-center text-rose-600" colSpan="4">
                      No payment history available
                  </td>
                 </tr>
                    
                    
                    }


                </tbody>
            </table>
        </div>
    </div>
</div>

    );
};

export default SellerPayHistory;