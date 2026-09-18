import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/CartSlice';

const ProductList = ({ onNavigate }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [addedNodes, setAddedNodes] = useState({});

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', cost: '$15' },
        { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', cost: '$12' },
      ],
    },
    {
      category: 'Aromatic & Fragrant',
      plants: [
        { name: 'Lavender', image: 'https://cdn.pixabay.com/photo/2017/07/18/18/24/lavender-2516540_1280.jpg', cost: '$18' },
        { name: 'Jasmine', image: 'https://cdn.pixabay.com/photo/2018/01/10/16/08/jasmine-3074187_1280.jpg', cost: '$20' },
      ],
    },
    {
      category: 'Low Maintenance',
      plants: [
        { name: 'ZZ Plant', image: 'https://cdn.pixabay.com/photo/2020/05/18/08/00/zz-plant-5185202_1280.jpg', cost: '$22' },
        { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/05/14/09/aloe-vera-3292941_1280.jpg', cost: '$10' },
      ],
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedNodes((prevState) => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo" onClick={() => onNavigate('landing')} style={{ cursor: 'pointer' }}>
          <h2>Paradise Nursery</h2>
        </div>
        <div className="nav-links">
          <a href="#plants" onClick={() => onNavigate('products')}>Plants</a>
          <a href="#cart" onClick={() => onNavigate('cart')}>
            Cart 🛒 <span className="cart-count">({totalCartCount})</span>
          </a>
        </div>
      </nav>

      <div className="product-container">
        {plantsArray.map((categoryObj, index) => (
          <div key={index}>
            <h2>{categoryObj.category}</h2>
            <div className="product-grid">
              {categoryObj.plants.map((plant, pIndex) => (
                <div key={pIndex} className="product-card">
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>{plant.cost}</p>
                  <button
                    disabled={addedNodes[plant.name] || cartItems.some((item) => item.name === plant.name)}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {addedNodes[plant.name] || cartItems.some((item) => item.name === plant.name)
                      ? 'Added to Cart'
                      : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;