import React, { useContext } from 'react'
import './placeOrder.css'
import { StoreContext } from '../../context/StoreContext'

const placeOrder = () => {
  const {getTotalCartAmount}=useContext(StoreContext)
  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name'/>
          <input type="text" placeholder='Last Name'/>
        </div>
        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input type="text" placeholder='City'/>
          <input type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code'/>
          <input type="text" placeholder='Country'/>
        </div>
        <input type="text" placeholder='Phone'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                    <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>Tk.{getTotalCartAmount()}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>Tk {getTotalCartAmount()===0?0:2}</p>
                        </div>
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>Tk.{getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button >PROCEED TO PAYMENT</button>
                </div>
      </div>
      </form>
  )
}

export default placeOrder