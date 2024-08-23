import React, { useState, useEffect } from 'react';
import './placeOrder.css';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });
    const [checkoutData, setCheckoutData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve checkout data from localStorage
        const storedData = localStorage.getItem('checkoutData');
        if (storedData) {
            setCheckoutData(JSON.parse(storedData));
        }
    }, []);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const proceedToPayment = (event) => {
        event.preventDefault();

        let orderItems = [];
        if (checkoutData) {
            // Create order items array
            Object.keys(checkoutData.cartItems).forEach(itemId => {
                if (checkoutData.cartItems[itemId] > 0) {
                    const item = checkoutData.cartItems[itemId];
                    orderItems.push({ ...item, quantity: item.quantity });
                }
            });

            let orderData = {
                address: data,
                items: orderItems,
                amount: checkoutData.finalTotal,
            };

            // Save orderData to localStorage or pass it as state when navigating
            console.log(orderData); // Debugging to see order data
            localStorage.setItem('orderData', JSON.stringify(orderData));
            navigate('/payment-options');
        }
    };

    return (
        <form onSubmit={proceedToPayment} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        {checkoutData && (
                            <>
                                <div className="cart-total-details">
                                    <p>Subtotal</p>
                                    <p>Tk. {checkoutData.totalAmount.toFixed(2)}</p>
                                </div>
                                <div className="cart-total-details">
                                    <p>Delivery Fee</p>
                                    <p>Tk {checkoutData.deliveryFee.toFixed(2)}</p>
                                </div>
                                <div className="cart-total-details">
                                    <p>Discount</p>
                                    <p>Tk.{(checkoutData.totalAmount * checkoutData.discount).toFixed(2)}</p>
                                </div>
                                <div className="cart-total-details">
                                    <b>Total</b>
                                    <b>Tk. {checkoutData.finalTotal.toFixed(2)}</b>
                                </div>
                            </>
                        )}
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
