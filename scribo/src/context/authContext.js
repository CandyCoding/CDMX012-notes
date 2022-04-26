import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { auth } from '../firebase'
export const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error('There is not auth provider')
  return context
}
// eslint-disable-next-line react/prop-types
export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const singup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)
  const login = async (email, password) => {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredentials)
  }
  const logout = () => signOut(auth)
  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])
  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    signInWithPopup(auth, googleProvider)
  }
  return (
        <authContext.Provider value={{ singup, login, user, logout, loginWithGoogle, loading }}>
            {children}
        </authContext.Provider>
  )
}
