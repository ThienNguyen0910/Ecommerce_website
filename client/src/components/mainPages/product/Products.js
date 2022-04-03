import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/ProductItem/ProductItem';
import Loading from '../utils/loading/Loading';
import axios from 'axios';
import Filters from './Filters';
import './Products.css';

const Products = () => {
  const state = useContext(GlobalState)
  const [products , setProducts] = state.productsAPI.products
  console.log(products)
  const [isAdmin] = state.userAPI.isAdmin
  // const [products, setProducts] = useState([]);
  const [token] = state.token
  const [callback, setCallback] = state.productsAPI.callback
  const [loading, setLoading] = useState(false)
  const [isCheck, setIsCheck] = useState(false)

  // useEffect(() => {
  //   const getPoducts = async () => {

  //     const response = await axios.get("/api/products")
  //     const newData = response.data.products
  //     setProducts(newData);
  //     setFilter(newData);
  //     console.log(newData);

  //   }
  //   getPoducts();
  // }, [])


  const handleCheck = (id) =>{
    products.forEach(product => {
        if(product._id === id) product.checked = !product.checked
    })
    setProducts([...products])
}

const deleteProduct = async(id, public_id) => {
    try {
        setLoading(true)
        const destroyImg = axios.post('/api/destroy', {public_id},{
            headers: {Authorization: token}
        })
        const deleteProduct = axios.delete(`/api/products/${id}`, {
            headers: {Authorization: token}
        })

        await destroyImg
        await deleteProduct
        setCallback(!callback)
        setLoading(false)
    } catch (err) {
        alert(err.response.data.msg)
    }
}

const checkAll = () =>{
    products.forEach(product => {
        product.checked = !isCheck
    })
    setProducts([...products])
    setIsCheck(!isCheck)
}

const deleteAll = () =>{
    products.forEach(product => {
        if(product.checked) deleteProduct(product._id, product.images.public_id)
    })
}
  if (loading) return <div><Loading /></div>

  return (
    <>
    {
      isAdmin && 
      <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
      </div>
    }
    <section>
      <div className='container'>
        <div className="filter-container">
          <Filters/>
        </div>

        <div className='products'>
          {
            products.map(product => {
              return <ProductItem product={product} key={product._id} isAdmin={isAdmin}  deleteProduct={deleteProduct} handleCheck={handleCheck} />
            })
          }
        </div>
      </div>
    </section>
    </>
  )
}

export default Products