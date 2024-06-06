import React from 'react'
import ReactDOM from 'react-dom/client'

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
      

  ],

},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

            <AuthProvider>
                    <RouterProvider router={router} />      
            </AuthProvider>
  </React.StrictMode>,
)
