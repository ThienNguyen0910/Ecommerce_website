import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './register.css'

const Register = () => {
  const [user, setUser] = useState({
    name: '', email: '', password: ''
  })

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const registerSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/user/register', { ...user })

      localStorage.setItem('firstLogin', true)


      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <div className="register-page">
      <form onSubmit={registerSubmit} className="register-form">
        <h2>Register</h2>
        <input type="text" name="name" required
          placeholder="Name" value={user.name} onChange={onChangeInput} />

        <input type="email" name="email" required
          placeholder="Email" value={user.email} onChange={onChangeInput} />

        <input type="password" name="password" required autoComplete="on"
          placeholder="Password" value={user.password} onChange={onChangeInput} />


        <input type="submit" placeholder='Register' />
        <div className="login">
          <span>Already have an account ? </span>
          <Link to="/login">Login</Link>
        </div>

      </form>
    </div>
  )
}

export default Register