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
      }  ,

      {
        path: "/joinUs",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path : "/allmedi/:name",
        element:<PriveteRoute><MedicineDtls></MedicineDtls></PriveteRoute>,
       
      },
      {
        path : "/shop",
        element : <PriveteRoute><OurShop></OurShop></PriveteRoute>
      },
      
      {
        path : "/cart"
        ,
        element : <PriveteRoute> <Cart></Cart> </PriveteRoute>
      }

      

  ],

},
 /////// DASHBOARD ROUTE ////////
{
  path: 'dash',
  element:<PriveteRoute>  <Dashboard></Dashboard></PriveteRoute>,
  children: [
/////  NORMAL USER ROUTE




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

      



  ]
} 


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

            <AuthProvider>
            <QueryClientProvider client={queryClient}>
         
          <RouterProvider router={router} />
         
    
             </QueryClientProvider>

            
            </AuthProvider>
  </React.StrictMode>,
)
