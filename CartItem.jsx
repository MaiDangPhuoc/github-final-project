import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../features/CartSlice';

const CartItem = ({ onContinueShopping, onNavigate }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (costString) => parseFloat(costString.replace('$', ''));

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0).toFixed(2);
  };

  const calculateTotalCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
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
            Cart 🛒 <span className="cart-count">({calculateTotalCount()})</span>
          </a>
        </div>
      </nav>

      <div className="cart-container">
        <h2>Total Shopping Cart Amount: ${calculateTotalAmount()}</h2>
        <h3>Total Items in Cart: {calculateTotalCount()}</h3>

        <div>
          {cart.map((item) => (
            <div className="cart-item" key={item.name} style={{ display: 'flex', gap: '20px', margin: '15px 0' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <div>
                <h4>{item.name}</h4>
                <p>Unit Price: {item.cost}</p>
                <p>Subtotal: ${(parseCost(item.cost) * item.quantity).toFixed(2)}</p>
                <div>
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <button onClick={() => handleRemove(item)} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          <button onClick={onContinueShopping} style={{ marginRight: '10px' }}>Continue Shopping</button>
          <button onClick={handleCheckoutShopping}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;