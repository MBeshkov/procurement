import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import './styles.css';
import ReactDOM from 'react-dom';
import './app-background.css';
import reportWebVitals from './reportWebVitals';
import './global-styles.css';
import ImagePage from './ImagePage';

function Home() {
  return (
    <div className="container">
      <div className="home-content">
        <h1>Let's clean your supply together!</h1>
        <div className="home-buttons">
          <Link to="/products">
            <button className="square-button">Current Commitments</button>
          </Link>
          <Link to="/search">
            <button className="square-button">Product Database</button>
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
            <li>
              <Link to="/images">Missions</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:code" element={<ProductDetails />} />
          <Route path="/images" element={<ImagePage />} />
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
      const apiUrl = `https://uk.openfoodfacts.org/api/v2/search?categories_tags=${searchTerm}&fields=image_front_small_url,categories,code,product_name,ecoscore_score,packaging&sort_by=ecoscore_score&page_size=3&json=1`;

      const response = await axios.get(apiUrl);

      // Extract relevant information from the API response
      const results = response.data.products.map(product => ({
        img_url: product.image_front_small_url,
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
    <div className="search-page-container">
      <h1>Product Search</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Top 3 items with the highest eco-score:</h2>
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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

export default App;
