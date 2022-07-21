import React from 'react';
import Home from './Home';
import Register from './mongodb/Register';
import Error from './Error';
import About from './mongodb/About';
import AddProduct from './mysql/AddProduct';
import ShowProduct from './mysql/ShowProduct'
import ProductDetails from './mysql/ProductDetails.'
import EditProduct from './mysql/EditProduct'
import Login from './mongodb/Login';
import LoginBuyer from './mongodb/LoginBuyer'
import LoginSeller from './mongodb/LoginSeller'
import RegisterBuyer from './mongodb/RegisterBuyer';
import RegisterSeller from './mongodb/RegisterSeller';
import SellerData from './mongodb/SellerData';
import AllSeller from './mongodb/AllSeller';
import Logout from './mongodb/Logout';
import AlertFunc from './mongodb/AlertFunc';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

export default function App() {
    
    const [alert, setAlert] = React.useState(null);
    const showAlert = (message, type) => {
        setAlert({
            msg : message,
            type : type
        })
        setTimeout(() => {
            setAlert(null)
        }, 1900);
    }
  // we've to pass alert as props where ever we wanted to use alert function

    return (
        <div>
            <Router>
                <AlertFunc alert={alert}/>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/login/buyer" element={<LoginBuyer showAlert={showAlert} />} />
                    <Route exact path="/login/seller" element={<LoginSeller showAlert={showAlert} />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/register/buyer" element={<RegisterBuyer showAlert={showAlert} />} />
                    <Route exact path="/register/seller" element={<RegisterSeller showAlert={showAlert} />} />
                    <Route exact path="/about/buyer" element={<About />} />
                    <Route exact path="/about/seller" element={<About />} />
                    <Route exact path="/addProduct" element={<AddProduct />} />
                    <Route exact path="/allProducts" element={<ShowProduct />} />
                    <Route exact path="/product/:id" element={<ProductDetails />} />
                    <Route exact path="/product/edit/:id" element={<EditProduct />} />
                    <Route exact path="/allSellers" element={<AllSeller />} />
                    <Route exact path="/allSellers/:id" element={<SellerData />} />
                    <Route exact path="/logout" element={<Logout showAlert={showAlert} />} />
                    <Route exact path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    )
}
