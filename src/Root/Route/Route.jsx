import { Outlet } from "react-router-dom";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";

const Route = () => {
    return (
        <div>
            <Navbar></Navbar>

           <div className="px-1"  >
           <Outlet></Outlet>
           </div>
                
             <Footer></Footer>
        </div>
    );
};

export default Route;