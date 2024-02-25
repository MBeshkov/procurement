import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const apiUrl = `https://uk.openfoodfacts.org/api/v2/search?categories_tags=${searchTerm}&fields=product_name,ecoscore_score&sort_by=ecoscore_score&page_size=3&json=1`;

      const response = await axios.get(apiUrl);

      // Extract relevant information from the API response
      const results = response.data.products.map(product => ({
        name: product.product_name,
        ecoscore: product.ecoscore_score,
      }));

      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Open Food Facts Search</h1>
      <div>
        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Top 3 items with the highest ecoscore:</h2>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>
              <strong>{result.name}</strong> - Ecoscore: {result.ecoscore}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;