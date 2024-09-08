import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputShake, setInputShake] = useState(false); // To trigger shake animation

    const getItemById = (id) => food_list.find(item => item._id === id);

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
        setErrorMessage(''); // Clear error message when user types
        setInputShake(false); // Reset shake effect on typing
    };

    const launchConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    const handlePromoCodeSubmit = () => {
        if (promoCode === 'SYJ78OIG56') {
            setDiscount(0.1); // 10% discount
            setErrorMessage('Congratulations!! Discount applied.'); // Success message
            launchConfetti(); // Trigger the confetti animation
        } else {
            setDiscount(0); // No discount
            setErrorMessage('Sorry, this is not a valid promo code.'); // Error message
            setInputShake(true); // Trigger the shake animation
        }
    };

    const totalAmount = getTotalCartAmount();
    const deliveryFee = totalAmount === 0 ? 0 : 50;
    const discountAmount = totalAmount * discount;
    const finalTotal = totalAmount - discountAmount + deliveryFee;

    const handleProceedToCheckout = () => {
        const checkoutData = {
            cartItems,
            discount,
            totalAmount,
            finalTotal,
            deliveryFee,
        };

        // Save checkoutData to localStorage
        localStorage.setItem('checkoutData', JSON.stringify(checkoutData));

        navigate('/order');
    };

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Image</p>
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
                            <p>Tk.{totalAmount.toFixed(2)}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>Tk {deliveryFee.toFixed(2)}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>Discount</p>
                            <p className={`discount-amount ${discount > 0 ? 'glow-effect' : ''}`}>
                                Tk.{discountAmount.toFixed(2)}
                            </p>
                        </div>
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>Tk.{finalTotal.toFixed(2)}</b>
                        </div>
                    </div>
                    <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>ENTER `SYJ78OIG56` TO ENJOY 10% DISCOUNT!!!</p>
                        <div className="cart-promocode-input">
                            <input
                                type="text"
                                placeholder='promo code'
                                value={promoCode}
                                onChange={handlePromoCodeChange}
                                className={inputShake ? 'shake' : ''} // Apply shake effect
                            />
                            <button onClick={handlePromoCodeSubmit}>Submit</button>
                        </div>
                        {errorMessage && <p className={`error-message ${discount === 0 ? 'error-shake' : ''}`}>{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
