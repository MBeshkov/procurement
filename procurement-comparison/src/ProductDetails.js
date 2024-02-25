// ProductDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { code } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/products/api/${code}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [code]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Product Details</h2>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Ecoscore:</strong> {product.score}</p>
      <p><strong>Materials:</strong> {product.materials}</p>
      <p><strong>Category:</strong> {product.category}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default ProductDetails;
