import React from 'react';
import ProductCard from './ProductCard';
import api from '../../service/api';

export default function ShowProducts() {

    const [products, setProducts] = React.useState([]);
    
    React.useEffect(() => {

        const getProductsData = async () => {
            const { data } = await api.get('/api/products/allProducts');
            console.log(data);
            setProducts(data);
        }
        getProductsData();
    }, [])

  return (
    <>
        <div className='show-all-products'>
            { products.length > 0 ? 
                products.map((product) => (
                    <div key={product.pid}>
                        <ProductCard product={product} />
                    </div>
                )) 
                : <p>No Products</p>
            }
        </div>
    </>
  )
}