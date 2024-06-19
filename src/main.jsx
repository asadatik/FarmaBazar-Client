import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Route from './Root/Route/Route';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import HomeGround from './Pages/Home/HomeGround';
import AuthProvider from './Provider/AuthProvider';
import Login from './Pages/JoinUs/Login/Login';
import SignUp from './Pages/JoinUs/SignUp/SignUp';
import MedicineDtls from './Pages/Home/MedicineDtls/MedicineDtls';
import OurShop from './Pages/Shop/OurShop';
import Cart from './Pages/Dashborad/Cart/Cart';
import PriveteRoute from './Root/PrivetRoute/PrivetRoute';
import Dashboard from './Root/Dashboard/Dashboard';
import AdminHome from './Pages/Dashboard/Admin/AdminHome';
import AllUser from './Pages/Dashboard/Admin/AllUser';
import ManageCategory from './Pages/Dashboard/Admin/ManageCategory';
import AskforAdd from './Pages/Dashboard/Seller/AskforAdd';
import { HelmetProvider } from 'react-helmet-async';
import ManageAdd from './Pages/Dashboard/Admin/ManageAdd';
import MangeAllMedicine from './Pages/Dashboard/Seller/MangeAllMedicine';
import Payment from './Pages/Payment/Payment';
import Invoice from './Pages/Payment/Invoice';
import ManagePaymet from './Pages/Dashboard/Admin/ManagePaymet';


const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <Route></Route>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomeGround></HomeGround>
      },

      {
        path: "/joinUs",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/allmedi/:name",
        element: <MedicineDtls></MedicineDtls>,

      },
      {
        path: "/shop",

        element: <OurShop></OurShop>
      },

      {
        path: "/cart"
        ,
        element: <PriveteRoute> <Cart></Cart> </PriveteRoute>
      },
      {
        path: "/payment"
        ,
        element: <PriveteRoute><Payment></Payment></PriveteRoute>
      },
      {
        path: '/invoice',
        element:    <PriveteRoute> <Invoice></Invoice> </PriveteRoute>
    } ,


    ],

  },
  /////// DASHBOARD ROUTE ////////
  {
    path: 'dash',
    element: <PriveteRoute>  <Dashboard></Dashboard></PriveteRoute>,
    children: [
      ///// seller 
       {
         path : 'sellerHome',



       },
      {
        path: 'askforAdd',
        element: <AskforAdd></AskforAdd>
      },
      {
        path: 'manageMedi',
        element:<MangeAllMedicine></MangeAllMedicine>
      }
       ,



       
      // //////  ADMIN USER ROUTES
      {
        path: 'adminHome',
        element: <AdminHome></AdminHome>
      },

      {
        path: 'users',
        element: <AllUser></AllUser>
      },
      {
        path: 'manageCategory',
        element: <ManageCategory> </ManageCategory>
      },
      {
        path: 'manageBanner',
        element: <ManageAdd></ManageAdd>
      },
      {
        path: 'payManage',
        element: <ManagePaymet></ManagePaymet>
      }


      ,
      // USER DASH
      {
        path: 'userHome',
        element: <AdminHome></AdminHome>
      },




    ]
  }


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>

          <RouterProvider router={router} />


        </HelmetProvider>


      </QueryClientProvider>


    </AuthProvider>
  </React.StrictMode>,
)
