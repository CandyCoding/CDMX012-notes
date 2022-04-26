import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
export function ProfileBar () {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate('/')
  }
  console.log(user)
  return (
        <div className="profile-bar">
            <h1>Bienvenido{user.email} </h1>
            <button type='button' onClick= {handleLogout}> Cerrar Sesión </button>
            </div>
  )
}
