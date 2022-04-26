import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './pages/ProtectedRoute'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import NotesPage from './pages/NotesPage'
import NotFoundPage from './pages/NotFoundPage'
import { AuthProvider } from './context/authContext'

import NavBar from './Components/NavBar'
import './App.css'

function App () {
  return (
    <BrowserRouter className="App">
      <NavBar />
      <AuthProvider>
      <Routes>
      <Route path="/" element={
      <ProtectedRoute><HomePage/></ProtectedRoute>}/>
      <Route path="/registro" element={<RegisterPage/>}/>
      <Route path="/notas" element={<NotesPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
