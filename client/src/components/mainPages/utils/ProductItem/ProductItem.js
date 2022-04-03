import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import './style.css';

const ProductItem = ({ product , isAdmin , deleteProduct, handleCheck }) => {
  const state = useContext(GlobalState)
  const addCart = state.userAPI.addCart

    

  return (
    <div className='cart'>
      {
        isAdmin && <input type="checkbox" checked={product.checked}
        onChange={() => handleCheck(product._id)} />
      }
      <img src={product.images.url} alt="" className='cart-image' />
      <div className='cart-content'>
        <h2>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      {
        isAdmin ? 
        <div className='cart-btn'>
          <Link to={`/edit_product/${product._id}`} id="cart-btn__buy">Edit</Link>
          <Link to={`/delete/${product._id}`} id="cart-btn__view" onClick={() => deleteProduct(product._id, product.images.public_id)}>Delete </Link>
        </div> 
        : 
        <div className='cart-btn'>
          <Link to="#!" id="cart-btn__buy" onClick={() => addCart(product)}>Buy</Link>
          <Link to={`detail/${product._id}`} id="cart-btn__view">View </Link>
        </div>
      }

    </div>
  )
}

export default ProductItem