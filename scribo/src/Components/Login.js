import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
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
  const { login, loginWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const handleGoogleSignin = async (e) => {
    e.preventDefault()
    if (loading) return <p>Cargando...</p>
    await loginWithGoogle()
    navigate('/notas')
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
            <button type="login">Iniciar Sesión</button>
            <button type="button" onClick = {handleGoogleSignin}>Iniciar con  Google </button>
            </form>
        </div>
  )
}
