import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logoScribo.png'
import '../styles/RegisterPage.css'
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
      navigate('/CDMX012-notes')
    } catch (error) {
      setError(error.message)
    }
  }
  return (

    <div>
       <img src={logo} alt="logo" className="logo"/>
            <form className= "register-form" onSubmit={handleSubmit} >
            <input
            type="email"
            placeholder="Correo Electrónico"
            name= "email"
            id="email"
            onChange={handleChange}/>
            <input type="password"
            name= "password"
            id="password"
            placeholder="Crea tu contraseña"
            onChange= {handleChange}/>
            <button type="submit" className='bnt-registro'id='btn-registro'>Registrarse</button>
            <button type="button"className='btn-volver'> <Link className= "link-volver" to="/CDMX012-notes">Volver</Link></button>
            </form>
          </div>
  )
}
export default RegisterPage
