// ProductDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles.css';

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
      const apiUrl = `https://uk.openfoodfacts.org/api/v2/search?categories_tags=${product.category}&fields=image_front_small_url,code,categories,product_name,ecoscore_score,packaging&sort_by=ecoscore_score&page_size=3&json=1`;

      const response = await axios.get(apiUrl);

      // Extract relevant information from the API response
      const results = response.data.products.map(product => ({
        code: product.code,
        img_url: product.image_front_small_url,
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
    <div className="product-details-container">
      <h2>Product Details</h2>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Eco-score:</strong> {product.score}</p>
      <p><strong>Materials:</strong> {product.materials}</p>
      <p><strong>Category:</strong> {product.category}</p>

      <button className="do-better-button" onClick={handleSearchByCategory}>
        Can I do better?
      </button>

      <div className="recommended-container">
        <h3>Recommended Alternatives</h3>
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div key={index} className="search-result">
              <div className="thumbnail-container">
                {result.img_url && <img src={result.img_url} alt={`Thumbnail ${index}`} className="thumbnail" />}
              </div>
              <div className="result-details">
                <strong>{result.name}</strong>
                <p>Eco-score: {result.ecoscore}</p>
                <p>Materials: {result.packaging}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
