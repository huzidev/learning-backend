import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import AddProducts from './screens/AddProducts';
import EditProduct from './screens/EditProduct';
import ShowProducts from './screens/ShowProducts';
import ProductDetails from './screens/ProductDetails';
import Home from './screens/Home';
import Nav from './screens/Nav';
export default function App() {
  return (
    <div>
        <Router >
          <Nav />
            <Routes>
                {/* it is necessary to use first route as just / otherwise it'll not work */}
                <Route exact path="/" element={<Home />}/> 
                <Route exact path="/addProducts" element={<AddProducts />}/>
                <Route exact path="/products" element={<ShowProducts />}/>
                <Route exact path="/product/edit/:id" element={<EditProduct />}/>
                <Route exact path="/product/:id" element={<ProductDetails />}/>
            </Routes>
        </Router>
    </div>
  )
}
