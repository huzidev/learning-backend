import React from 'react';
import axios from 'axios';

export default function ShowProducts() {

    const [products, setProducts] = React.useState([]);
    
    React.useEffect(() => {

        const getProductsData = async () => {

            const { data } = await axios.get('/api/products/allProducts');
            console.log(data);
            setProducts(data);
        }
        getProductsData();
    }, [])

  return (
    <div>
        <h1>
            All Products
        </h1>
        {
            products.map((product) => (
                <>
                    <li key={product.id}>
                        {product.title}
                    </li>
                </>
            )) 
        }
    </div>
  )
}
