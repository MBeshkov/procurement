import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Make a request to your Django API endpoint
    axios.get('http://localhost:8000/products/api')  // Use the full URL with the /api endpoint
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.code}>
            <Link to={`/products/${product.code}`}>
              <strong>{product.name}</strong> - Ecoscore: {product.score}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;