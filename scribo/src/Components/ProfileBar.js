import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
export function ProfileBar () {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate('/')
  }
  // console.log(user)
  if (loading) return <p>Cargando...</p>
  return (
        <div className='profile-bar'>
            <h1>Bienvenido {user.displayName} </h1>
            <button className='logout-btn' type='button' onClick={handleLogout}>
                Cerrar Sesión
            </button>
            <img className='profile-photo' src={user.photoURL} alt='profile photo' />
        </div>
  )
}
