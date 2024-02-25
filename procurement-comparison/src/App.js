import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import './styles.css';

function Home() {
  return (
    <div className="container">
      <div className="home-content">
        <h1>Let's clean your supply together!</h1>
        <div className="home-buttons">
          <Link to="/products">
            <button className="square-button">All Products</button>
          </Link>
          <Link to="/search">
            <button className="square-button">Search</button>
          </Link>
        </div>
        <div className="background-image"></div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:code" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const apiUrl = `https://uk.openfoodfacts.org/api/v2/search?categories_tags=${searchTerm}&fields=categories,code,product_name,ecoscore_score,packaging&sort_by=ecoscore_score&page_size=3&json=1`;

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
              <strong>{result.name}</strong> - Ecoscore: {result.ecoscore} - Packaging: {result.packaging}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
