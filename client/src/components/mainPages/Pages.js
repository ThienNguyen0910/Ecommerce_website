import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import Products from './product/Products';
import ProductDetail from './productdetail/ProductDetail';
import Cart from './cart/Cart';
import Login from './auth/Login';
import Register from './auth/Register';
import NotFound from './utils/NotFound';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
import { GlobalState } from '../../GlobalState'

const Pages = () => {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin

  return (
    <Routes>
      <Route path='/products' element={<Products />} />
      <Route path='/products/detail/:id' element={<ProductDetail />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={isLogged ? <NotFound /> : <Login />} />
      <Route path='/register' element={isLogged ? <NotFound /> : <Register />} />
      <Route path='/category' element={isAdmin ? <Categories /> : <NotFound />} />
      <Route path='/create_product' element={isAdmin ? <CreateProduct /> : <NotFound />} />
      <Route path='/edit_product/:id' element={isAdmin ? <CreateProduct /> : <NotFound />} />


      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Pages