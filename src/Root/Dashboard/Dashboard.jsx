import {  FaBook,  FaHome, FaList,  FaUsers, } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/AxioSecure/useAxiosSecure";
import { TbMedicineSyrup } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";
import { PiFlagBannerFoldBold } from "react-icons/pi";




const Dashboard = () => {
   
    const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

 const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  useEffect(() => {
    if (!isLoading && !error) {
      const currentUser = users.find(u => u.email === user?.email);
      const userRole = currentUser?.role;

      if (userRole === 'admin') {
        navigate('/dash/adminHome');
      } else if (userRole === 'seller') {
        navigate('/dash/sellerHome');
      } else if (userRole === 'user') {
        navigate('/dash/userHome');
      }
    }
  }, [isLoading, error, users, user?.email, navigate]);

  if (isLoading) {
    return (
      <div className="text-center mt-10 text-2xl font-nothing">
        Loading data. Please wait...
        <span className="loading loading-dots loading-md"></span>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-xl font-cinzel">
        Error loading users data: {error.message}
      </div>
    );
  }

  const currentUser = users.find(u => u.email === user?.email);
  const userRole = currentUser?.role;


    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="md:w-72 min-h-screen bg-[#48bee6]">
                <ul className="menu text-[#333333] text-lg font-inter font-medium md:p-4">
                    {/* admin  */}
                    {userRole === 'admin' &&
                        <>
                          
                          <li>
                                <NavLink to="/dash/adminHome">
                                  
                                    Admin Home</NavLink>
                            </li>

                            <li>
                                <NavLink to="/dash/users">
                                    <FaUsers></FaUsers>
                                    Manage Users</NavLink>
                            </li>

                            <li>
                                <NavLink to="/dash/manageCategory">
                                    <FaList></FaList>
                                    Manage Category</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/payManage">
                                    <FaBook></FaBook>
                                    Manage Payment</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/salesRep">
                                    <FaBook></FaBook>
                                    Sales Report</NavLink>
                            </li>

                            <li>
                                <NavLink to="/dash/manageBanner">
                                    <PiFlagBannerFoldBold className="text-2xl" />Manage Banner Advertisements
                                </NavLink>
                            </li>


                        </>
                    }
                    {/*seller */}
                    {userRole === 'seller' &&
                        <>
                            <li>
                                <NavLink to="/dash/sellerHome">
                          Seller Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dash/manageMedi">
                                    <TbMedicineSyrup className="text-xl" />Manage medicines
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/payHistory">
                                    <MdPayment className="text-xl" />Payment history
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dash/askforAdd">
                                    <RiAdvertisementLine className="text-xl" />Ask for Advertisement
                                </NavLink>
                            </li>
                        </>
                    }
                    {/* user */}
                    {
                        userRole === 'user' &&
                        <>
                            <li>
                                <NavLink to="/dash/userHome">
                                    
                                    User Home</NavLink>
                            </li>
                          
                        </>

                    }

                    <div className=" divider  "></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home Page </NavLink>
                    </li>

                </ul>
            </div>
            {/* ////////////////////////////////////////////// */}
            <div className="flex-1  p-8">
               

          


                <div className="my-10" >  <Outlet></Outlet>  </div>

            </div>
        </div>
    );
};

export default Dashboard;