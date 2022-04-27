import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
export function ProtectedRoute ({ children }) {
  const { user, loading } = useAuth()
  if (!user) return <Navigate to = '/' />
  if (loading) return <p>Cargando...</p>
  return <>{ children }</>
}
