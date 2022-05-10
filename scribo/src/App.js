import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import NotesPage from './pages/NotesPage'
import NotFoundPage from './pages/NotFoundPage'
import WriteNotesPage from './pages/WriteNotesPage'
import EditNotePage from './pages/EditNotePage'
import { AuthProvider } from './context/authContext'
// import NavBar from './Components/NavBar'
import './App.css'
import { ProtectedRoute } from './pages/ProtectedRoute'

function App () {
  return (
    <BrowserRouter className="App">
     {/*  <NavBar /> */}
      <AuthProvider>
      <Routes>
      <Route path="/CDMX012-notes" element={
      <HomePage/> }/>
      <Route path="/registro" element={<RegisterPage/>}/>
      <Route path="/notas" element={
      <ProtectedRoute><NotesPage/></ProtectedRoute>}/>
      <Route path="/crearnota" element={<ProtectedRoute><WriteNotesPage/></ProtectedRoute>}/>
      <Route path="editar/:id"element={<ProtectedRoute><EditNotePage/></ProtectedRoute>}/>
      <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
