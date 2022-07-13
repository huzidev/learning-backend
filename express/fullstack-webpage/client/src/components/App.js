import React from 'react';
import Home from './Home';
import Register from './mongodb/Register';
import Error from './Error';
import About from './mongodb/About';
import AddProduct from './mysql/AddProduct';
import ShowProducts from './mysql/ShowProducts'
import ProductDetails from './mysql/ProductDetails.'
import EditProduct from './mysql/EditProduct'
import Login from './mongodb/Login';
import LoginBuyer from './mongodb/LoginBuyer'
import LoginSeller from './mongodb/LoginSeller'
import RegisterBuyer from './mongodb/RegisterBuyer';
import RegisterSeller from './mongodb/RegisterSeller';
import Test from './mongodb/Test';
import AllSeller from './mongodb/AllSeller';
import Logout from './mongodb/Logout';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

export default function App() {
    
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/login/buyer" element={<LoginBuyer />} />
                    <Route exact path="/login/seller" element={<LoginSeller />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/register/buyer" element={<RegisterBuyer />} />
                    <Route exact path="/register/seller" element={<RegisterSeller />} />
                    <Route exact path="/about/buyer" element={<About />} />
                    <Route exact path="/about/seller" element={<About />} />
                    <Route exact path="/addProduct" element={<AddProduct />} />
                    <Route exact path="/allProducts" element={<ShowProducts />} />
                    <Route exact path="/product/:id" element={<ProductDetails />} />
                    <Route exact path="/product/edit/:id" element={<EditProduct />} />
                    <Route exact path="/allSellers" element={<Test />} />
                    <Route exact path="/allSellers/:id" element={<AllSeller />} />
                    <Route exact path="/logout" element={<Logout />} />
                    <Route exact path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    )
}
