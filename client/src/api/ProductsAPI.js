import axios from 'axios';
import { useEffect, useState } from 'react';

const ProductsAPI = () => {
    const [products , setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`/api/products?limit=${page*12}&${category}`)
            setProducts(res.data.products)
            setResult(res.data.result)
        }
        getProducts()
    },[callback , category , page])

  return {
      products: [products , setProducts] ,
      callback : [callback, setCallback] , 
      category :  [category, setCategory] ,
      page : [page , setPage] ,
      result: [result, setResult]
  }
}

export default ProductsAPI