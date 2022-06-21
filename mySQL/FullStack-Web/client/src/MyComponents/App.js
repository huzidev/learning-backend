import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import AddProducts from '../screens/AddProducts';
import EditProduct from '../screens/EditProduct';
import ShowProducts from '../screens/ShowProducts';
import ProductDetails from '../screens/ProductDetails';

export default function App() {
  return (
    <div>
        <Router >
            <Routes>
                <Route exact path="/addProduct" element={AddProducts}/>
                <Route exact path="/products" element={ShowProducts}/>
                <Route exact path="/product/edit/:id" element={EditProduct}/>
                <Route exact path="/product/:id" element={ProductDetails}/>
            </Routes>
        </Router>
    </div>
  )
}
