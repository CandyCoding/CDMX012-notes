import { useAuth } from '../context/authContext'
import { Navigate } from '@reach/router'
import HomePage from './HomePage'
// eslint-disable-next-line react/prop-types
export function ProtectedRoute ({ children }) {
  const { user, loading } = useAuth()
  if (!user) return <HomePage/>
  if (loading) return <p>Cargando...</p>
  return <>{ children }</>
}
