import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import './productDetail.css'

const ProductDetail = () => {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    // console.log(products)

    const [productDetail, setProductDetail] = useState([])

    useEffect(() => {
        if (params) {
            products.forEach(product => {
                if (product._id === params.id)
                    setProductDetail(product)
            });
        }

    }, [params, products])
    if (productDetail.length === 0) return null;
    console.log(productDetail)
    return (
        <div className='container'>
            <div className='product-detail'>
                <img src={productDetail.images.url} alt="" />
                <div className='product-content'>
                    <h2>{productDetail.title}</h2>
                    <span>${productDetail.price}</span>
                    <p>{productDetail.decription}</p>
                    <p>{productDetail.content}</p>
                    <p>Sold: {productDetail.sold}</p>
                    <div className='product-detail__btn'>
                        <button className='btn btn-buy'>
                            <Link to="/cart" onClick={() => addCart(productDetail)}>Buy Now</Link>
                        </button>
                        <button className='btn btn_shop'>
                            <Link to="/products">Continue Shopping</Link>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetail