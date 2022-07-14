import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import "./styles/style.css"
import "./styles/Home.css"
import "./styles/AddProduct.css"
import "./styles/Info.css"
import "./styles/Login.css"
import "./styles/Modal.css"
import "./styles/Nav.css"
import "./styles/Register.css"
import "./styles/SellerData.css"
import "./styles/ShowProducts.css"
import "./styles/Footer.css"
import store  from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("head")
)