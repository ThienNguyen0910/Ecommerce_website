import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

const Filters = () => {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category

    const handleCategory = e => {
        setCategory(e.target.value)
        // setSearch('')
    }
    return (
        <>
        <ul style={{display: "flex"}}>
            {
                categories.map(category => (
                    <li value={"category=" + category._id} key={category._id}  onClick={handleCategory}>{category.name}</li>
                ))
            }
        </ul>
        </>
    )
}

export default Filters