import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { Login } from '../Components/Login'
import logo from '../assets/logoScribo.png'
import '../styles/HomePage.css'

function HomePage () {
  const { user } = useAuth()
  console.log(user)
  return (
    <div className="home-page">
      <img src={logo} alt="logo" className="logo" />
      <Login />
      <div className="home-page__options">
      <p>¿No tienes cuenta? </p>
      <Link className= "link-registro" to="/registro">¡Registrate aquí !</Link>
      </div>
    </div>
  )
}
export default HomePage
