import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import NotesPage from './pages/NotesPage'
import NotFoundPage from './pages/NotFoundPage'
import WriteNotesPage from './pages/WriteNotesPage'
import { AuthProvider } from './context/authContext'

// import NavBar from './Components/NavBar'
import './App.css'

function App () {
  return (
    <BrowserRouter className="App">
     {/*  <NavBar /> */}
      <AuthProvider>
      <Routes>
      <Route path="/" element={ <HomePage/>}/>
      <Route path="/registro" element={<RegisterPage/>}/>
      <Route path="/notas" element={<NotesPage/>}/>
      <Route path="/crearnota" element={<WriteNotesPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
