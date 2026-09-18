import React, { useState } from 'react';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleGetStarted = () => {
    setCurrentPage('products');
  };

  return (
    <div className="App">
      {currentPage === 'landing' && (
        <div className="landing-page">
          <h1>Paradise Nursery</h1>
          <AboutUs />
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      )}

      {currentPage === 'products' && (
        <ProductList onNavigate={setCurrentPage} />
      )}

      {currentPage === 'cart' && (
        <CartItem
          onContinueShopping={() => setCurrentPage('products')}
          onNavigate={setCurrentPage}
        />
      )}
    </div>
  );
}

export default App;