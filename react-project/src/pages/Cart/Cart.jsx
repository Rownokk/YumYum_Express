import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const getItemById = (id) => food_list.find(item => item._id === id);

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
        setErrorMessage(''); // Clear error message when user types
    };

    const handlePromoCodeSubmit = () => {
        if (promoCode === 'mowmita') {
            setDiscount(0.1); // 10% discount
            setErrorMessage('Congratulationss!!'); // Clear error message on valid promo code
        } else {
            setDiscount(0); // no discount
            setErrorMessage('Sorry, this is not a valid promo code.');
        }
    };

    const totalAmount = getTotalCartAmount();
    const deliveryFee = totalAmount === 0 ? 0 : 50;
    const discountAmount = totalAmount * discount;
    const finalTotal = totalAmount - discountAmount + deliveryFee;

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
                            <img src={url + "/images/" + item.image} alt="" />
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
                            <p>Tk.{totalAmount}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>Tk {deliveryFee}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>Discount</p>
                            <p>Tk.{discountAmount.toFixed(2)}</p>
                        </div>
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>Tk.{finalTotal.toFixed(2)}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>ENTER `mowmita` TO ENJOY 10% DISCOUNT!!!</p>
                        <div className="cart-promocode-input">
                            <input
                                type="text"
                                placeholder='promo code'
                                value={promoCode}
                                onChange={handlePromoCodeChange}
                            />
                            <button onClick={handlePromoCodeSubmit}>Submit</button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

