import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import '../styles/Login.css'
export function Login () {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState()
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(user.email, user.password)
      navigate('/notas')
    } catch (error) {
      setError(error.message)
    }
  }
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const handleGoogleSignin = async (e) => {
    e.preventDefault()
    await loginWithGoogle()
    navigate('/notas')
  }
  return (
            <form className="login-form" onSubmit={handleSubmit} >
            <input
            type="email"
            placeholder="Correo Electrónico"
            name= "email"
            id="email"
            onChange={handleChange}/>
            <input type="password"
            name= "password"
            id="password"
            placeholder="Contraseña"
            onChange= {handleChange}/>
            <button type="login" id='loginBtn'>Iniciar Sesión</button>
            <button type="button" id='googleBtn' onClick = {handleGoogleSignin}>Iniciar con <FcGoogle></FcGoogle> </button>
            </form>
  )
}
