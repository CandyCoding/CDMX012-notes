import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
function RegisterPage () {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { singup } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState()
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await singup(user.email, user.password)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }
  return (
        <div className="register-page">
            <form onSubmit={handleSubmit} >
            <label htmlFor="email">Email</label>
            <input
            type="email"
            placeholder="correo@correo.com"
            name= "email"
            id="email"
            onChange={handleChange}/>
            <label htmlFor="password">Password</label>
            <input type="password"
            name= "password"
            id="password"
            placeholder="********"
            onChange= {handleChange}/>
            <button type="submit">Registrarse</button>
            <button type="button">Registrate con Google </button>
            </form>
        </div>
  )
}
export default RegisterPage
