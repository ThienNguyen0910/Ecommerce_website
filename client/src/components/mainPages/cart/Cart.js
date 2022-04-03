import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import PaypalButton from './PaypalButton';


const Cart = () => {
  const state = useContext(GlobalState)
  const [cart , setCart] = state.userAPI.cart
  const [token] = state.token
  const [total , setTotal] = useState(0)

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev , item) => {
        return prev + (item.price * item.quantity)
      }, 0)
      setTotal(total)
    }
    getTotal()
} , [cart])

  if (cart.length === 0) {
    return <h1 style={{ textAlign: "center", fontSize: "30px" }}> Cart is empty</h1>
  }

  const addToCart = async (cart) => {
    await axios.patch('/user/addcart' , {cart} , {
      headers: {Authorization: token}
    })
  }

  const ecreaseQuantity = (id) => {
    cart.forEach(item => {
      if(item._id === id){
        item.quantity += 1
      }
    })
    setCart([...cart])
    addToCart(cart)
  }

  const decreaseQuantity = (id) => {
    cart.forEach(item => {
      if(item._id === id)
      {
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
      }
    })
    setCart([...cart])
    addToCart(cart)
  }

  const removeItem = (id) => {
    cart.forEach((item, index) => {
      if(item._id === id){
        cart.splice(index , 1)
      }
    }) 
    setCart([...cart])
    addToCart(cart)
  } 

  const tranSuccess = async(payment) => {
    const {paymentID, address} = payment;

    await axios.post('/api/payment', {cart, paymentID, address}, {
        headers: {Authorization: token}
    })

    setCart([])
    addToCart([])
    alert("You have successfully placed an order.")
}



  return (
    <div>
      {
        cart.map(product => (
          <div className='Cart-detail' key={product._id}>
            <img src={product.images.url} alt="" className='cart-img' />
            <div className='cart-content'>
              <h2>{product.title}</h2>
              <span>$ {product.price * product.quantity}</span>
              <p>{product.decription}</p>
              <p>{product.content}</p>
              <div className="amount">
                <button style={{width: "40px" , backgroundColor: "green"}} onClick={() => decreaseQuantity(product._id)}> - </button>
                  <span>{product.quantity}</span>
                <button style={{width: "40px" , backgroundColor: "green"}} onClick={() => ecreaseQuantity(product._id)}> + </button>
              </div>
              <div className="delete-item" onClick={() => removeItem(product._id)}>X</div>
            </div>
          </div>
        ))
    }
    <div className="total">
      <h3>Total ${total}</h3>

      <PaypalButton
        total={total}
        tranSuccess={tranSuccess}
      />
    </div>
    </div>
  )
}

export default Cart