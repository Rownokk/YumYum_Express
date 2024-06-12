import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);

    const getItemById = (id) => food_list.find(item => item._id === id);

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                {Object.keys(cartItems).map((itemId) => {
                    const item = getItemById(itemId);
                    if (!item) return null;
                    return (
                        <div key={itemId} className='cart-items-item'>
                            <img src={item.image} alt=""/>
                            <p>{item.name}</p>
                            <p>Tk.{item.price}</p>
                            <p>{cartItems[itemId]}</p>
                            <p>Tk.{(item.price * cartItems[itemId]).toFixed(2)}</p>
                            <button onClick={() => removeFromCart(itemId)}>Remove</button>
                        </div>
                    );
                })}
            </div>
            <div className="cart-bottom">
              <div className="cart-total">
                <h2>Cart Totals</h2>
                <div>
                  <div className="cart-total-details">
                    <p>Subtotal</p>
                    <p>Tk.{getTotalCartAmount()}</p> {/* Use getTotalCartAmount function */}
                  </div>
                  <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>Tk.{ 50}</p> {/* Use getTotalCartAmount function */}
                  </div>
                  <div className="cart-total-details">
                    <b>Total</b>
                    <b>Tk.{getTotalCartAmount()+50}</b>
                  </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
              </div>
              <div className="cart-promocode">
                <div>
                  <p>IF YOU HAVE A PROMOCODE, ENTER IT HERE</p>
                  <div className="cart-promocode-input">
                    <input type="text" placeholder='promo code'/>
                    <button>Submit</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
};

export default Cart;
