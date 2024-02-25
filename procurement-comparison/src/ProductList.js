// ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css'; 

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
   
    axios.get('http://localhost:8000/products/api')  
      .then(response => {
        
        const productsWithDetails = response.data.map(async product => {
          const apiProduct = await fetchApiProductDetails(product.code);
          return {
            ...product,
            img_url: apiProduct.image_front_small_url,
          };
        });

       
        Promise.all(productsWithDetails)
          .then(updatedProducts => setProducts(updatedProducts))
          .catch(error => console.error('Error fetching product details:', error));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const fetchApiProductDetails = async (code) => {
    try {
      const apiUrl = `https://uk.openfoodfacts.org/api/v2/product/${code}?fields=image_front_small_url`;
      const response = await axios.get(apiUrl);
      return response.data.product;
    } catch (error) {
      console.error('Error fetching API data:', error);
      return {};
    }
  };

  return (
    <div className="centered-list">
      <h2><br></br>All Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.code}>
            <Link to={`/products/${product.code}`}>
            {product.img_url && <img src={product.img_url} alt={`Product ${product.name}`} className="product-image" />}
            <strong>{product.name}</strong> ECO-SCORE: {product.score}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
