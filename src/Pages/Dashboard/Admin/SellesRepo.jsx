import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/AxioSecure/useAxiosSecure";

const SellesRepo = () => {
    const axiosSecure = useAxiosSecure();

    const { data: sales = [] } = useQuery({
        queryKey: ['sales'],
        queryFn: async () => {
            const response = await axiosSecure.get('/allPayment');
            return response.data;
        }
    });

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);
    const filteredSales = sales.filter((item) => {
        const saleDate = new Date(item.data);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        if (start && end) {
            return saleDate >= start && saleDate <= end;
        } else if (start) {
            return saleDate >= start;
        } else if (end) {
            return saleDate <= end;
        } else {
            return true;
        }
    });

    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
            <Helmet>
                <title>Sales Report</title>
            </Helmet>
            <div className="mt-6">
                <div className="flex justify-between mb-4">
                    <div className="w-1/2">
                        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date:</label>
                        <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            className="mt-1 block w-full pl-3 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date:</label>
                        <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            className="mt-1 block w-full pl-3 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div className="flex justify-center my-3">
                    <DownloadTableExcel
                        filename="sales_report"
                        sheet="sales"
                        currentTableRef={document.getElementById('sales-table')}
                    >
                        <button className="px-4 py-2  text-white rounded-md btn btn-sm btn-secondary">Export to Excel</button>
                    </DownloadTableExcel>
                </div>
                <div className="overflow-x-auto">
                    <table id="sales-table" className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-4 py-3">SL No</th>
                                <th className="px-4 py-3">Medicine Name</th>
                                <th className="px-4 py-3">Seller Email</th>
                                <th className="px-4 py-3">Buyer Email</th>
                                <th className="px-4 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-800">
                            {filteredSales.length > 0 ? (
                                filteredSales.map((item, index) => (
                                    <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="px-4 py-3">
                                            <ul className="list-disc list-inside">
                                                {item.medicineName.map((name, idx) => (
                                                    <li key={idx}>{name}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="px-4 py-3">{item.sellerEmail[0]}</td>
                                        <td className="px-4 py-3">{item.email}</td>
                                        <td className="px-4 py-3">{new Date(item.data).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-4 py-3  text-center">No sales data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       
   
    );
};

export default SellesRepo;
