import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { Login } from '../Components/Login'

function HomePage () {
  const { user } = useAuth()
  console.log(user)
  return (
    <div className="home-page">
      <Login />
      <p>¿No tienes cuenta? </p>
      <Link to="/registro">¡Registrate aquí !</Link>
    </div>
  )
}
export default HomePage
