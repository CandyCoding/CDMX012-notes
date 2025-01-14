import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'
import User from '../assets/user.png'
export function ProfileBar () {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate('/CDMX012-notes')
  }
  // console.log(user)
  if (loading) return <p>Cargando...</p>
  return (
        <div className='profile-bar'>
            <h1>Bienvenido {user.displayName || user.email}</h1>
            <img className='profile-photo' src={user.photoURL || User} alt='profile photo'/>
            <button className='logout-btn' type='button' onClick={handleLogout}>
              <MdLogout/>
            </button>
        </div>
  )
}
