import React, { useContext } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { FiShoppingCart , FiLogOut} from 'react-icons/fi';
import { GrLogout } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import './styleHeader.css';

//vd 

const Header = () => {
  const state = useContext(GlobalState)
  const [isLogged, setIsLogged] = state.userAPI.isLogged
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin
  const [cart] = state.userAPI.cart

  const logoutUser = async () => {
    await axios.get('/user/logout')
    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)
  }
  const adminRouter = () => {
    return (
      <>
        <li style={{paddingRight: "40px"}}><Link to="/create_product" style={{ color: "white" }}> Create product</Link></li>
        <li><Link to="/category" style={{ color: "white" }}> Categories</Link></li>
      </>
    )
  }
  const loggedRouter = () => {
    return (
      <>
        {/* <li><Link to="/history" style={{color: "white"}}> History</Link></li> */}
        <li style={{width: "30px"}}><Link to="/" onClick={() => logoutUser()} style={{color: "white"}}><FiLogOut size={28}/></Link></li>
      </>
    )
  }


  return (
    <nav className='nav-bar'>
      <div className='logo'><Link to="/">{isAdmin ? 'Admin' : 'Logo'}</Link></div>
      <ul className='nav-bar__list'>
        <li className='list-item'><Link to="/products">{isAdmin ? 'Product' : 'Product'}</Link></li>
        <li className='list-item'><Link to="/about">{isAdmin ? "" : 'About'}</Link></li>
        <li className='list-item'><Link to="/contact">{isAdmin ? '' : 'Contact'}</Link></li>
        {isAdmin && adminRouter()}
      </ul>
      <ul className='icons'>
        {
          isLogged ? loggedRouter() : <Link to="/login" style={{ color: "white" }} >
            <FaUserAlt size={24} />
          </Link>
        }

        {
          isAdmin ? '' : <li className='list-item' style={{ display: 'flex' }}>
            <Link to="/cart"><FiShoppingCart size={24} /></Link>
            <span style={{ color: "white", paddingLeft: "10px" }}>{cart.length}</span>
          </li>
        }

      </ul>
    </nav>
  )
}

export default Header