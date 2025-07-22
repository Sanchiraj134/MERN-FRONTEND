import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, ArrowLeft } from "lucide-react";
import { AppContext } from "../App";
import axios from "axios";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    if (qty > 1) {
      const updatedCart = cart.map((product) =>
        product._id === id ? { ...product, qty: qty - 1 } : product
      );
      setCart(updatedCart);
    }
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(product => product._id !== id);
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      const result = await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cartItemCount = cart.reduce((total, item) => total + (item.qty || 0), 0);
  const shipping = orderValue > 50 ? 0 : 9.99;
  const tax = orderValue * 0.08;
  const total = orderValue + shipping + tax;

  return (
    <div className="page-wrapper fade-in">
      <div className="container">
        <div style={{ marginBottom: '24px' }}>
          <button 
            onClick={() => Navigate('/')}
            className="btn btn-secondary"
            style={{ marginBottom: '16px' }}
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </button>
          
          <h1 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '8px'
          }}>
            <ShoppingBag size={32} />
            Shopping Cart
          </h1>
          <p style={{ color: '#6b7280' }}>
            {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}

        {cart.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <ShoppingBag size={64} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <h3>Your cart is empty</h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              Looks like you haven't added any items to your cart yet.
            </p>
            <button 
              onClick={() => Navigate('/')}
              className="btn btn-primary"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div>
              <div className="card">
                <h3 style={{ marginBottom: '20px' }}>Cart Items</h3>
                {cart.map((item) => (
                  item.qty > 0 && (
                    <div key={item._id} className="cart-item">
                      <img 
                        src={item.imgUrl || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'} 
                        alt={item.productName}
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: '4px' }}>{item.productName}</h4>
                        <p style={{ 
                          color: '#6b7280', 
                          fontSize: '14px',
                          marginBottom: '8px'
                        }}>
                          ${item.price} each
                        </p>
                        
                        <div className="quantity-controls">
                          <button 
                            onClick={() => decrement(item._id, item.qty)}
                            className="quantity-btn"
                            disabled={item.qty <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="quantity-display">{item.qty}</span>
                          <button 
                            onClick={() => increment(item._id, item.qty)}
                            className="quantity-btn"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ 
                          fontSize: '18px', 
                          fontWeight: '600',
                          marginBottom: '8px'
                        }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </div>
                        <button 
                          onClick={() => removeItem(item._id)}
                          className="btn btn-danger btn-sm"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            <div>
              <div className="card" style={{ position: 'sticky', top: '100px' }}>
                <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
                
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <span>Subtotal ({cartItemCount} items)</span>
                    <span>${orderValue.toFixed(2)}</span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span style={{ color: '#059669' }}>FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <hr style={{ margin: '16px 0' }} />
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {orderValue < 50 && (
                  <div style={{ 
                    background: '#fef3c7',
                    color: '#92400e',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    marginBottom: '16px'
                  }}>
                    Add ${(50 - orderValue).toFixed(2)} more for free shipping!
                  </div>
                )}

                {user?.token ? (
                  <button 
                    onClick={placeOrder}
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    <CreditCard size={16} />
                    {loading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                  </button>
                ) : (
                  <button 
                    onClick={() => Navigate("/login")}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    Login to Place Order
                  </button>
                )}

                <div style={{ 
                  marginTop: '16px',
                  fontSize: '12px',
                  color: '#6b7280',
                  textAlign: 'center'
                }}>
                  🔒 Secure checkout • 30-day returns • Free support
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}