// In your React app, ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Make a request to your Django API endpoint
    axios.get('http://localhost:8000/products/api')  // Update the URL with your Django server's address
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong> - Ecoscore: {product.ecoscore}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
