// ProductDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { code } = useParams();
  const [product, setProduct] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/products/api/${code}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [code]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleSearchByCategory = async () => {
    try {
      const apiUrl = `https://uk.openfoodfacts.org/api/v2/search?categories_tags=${product.category}&fields=code,categories,product_name,ecoscore_score,packaging&sort_by=ecoscore_score&page_size=3&json=1`;

      const response = await axios.get(apiUrl);

      // Extract relevant information from the API response
      const results = response.data.products.map(product => ({
        code: product.code,
        categories: product.categories,
        name: product.product_name,
        ecoscore: product.ecoscore_score,
        packaging: product.packaging,
      }));

      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Product Details</h2>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Ecoscore:</strong> {product.score}</p>
      <p><strong>Materials:</strong> {product.materials}</p>
      <p><strong>Category:</strong> {product.category}</p>
      {/* Add more details as needed */}

      <button onClick={handleSearchByCategory}>Can I do better?</button>

      <div>
        <h3>Search Results based on Category</h3>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>
              <strong>{result.name}</strong> - Ecoscore: {result.ecoscore} - Packaging: {result.packaging}
            </li>
          ))}
        </ul>
      </div>

    </div>
        
  );
}

export default ProductDetails;
