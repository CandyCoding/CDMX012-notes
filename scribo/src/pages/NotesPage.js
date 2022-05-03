import { ProfileBar } from '../Components/ProfileBar'
import { useEffect, useState } from 'react'
import { db, auth } from '../firebase'
import { Link } from 'react-router-dom'
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import '../styles/NotesPage.css'
function NotesPage () {
  const [notes, setNotes] = useState([])

  const getNotes = async () => {
    onSnapshot(collection(db, 'users', auth.currentUser.uid, 'notes'), (querySnapshot) => {
      const docs = []
      querySnapshot.forEach(doc => {
        docs.push({ ...doc.data(), id: doc.id })
      })
      setNotes(docs)
    }
    )
  }
  useEffect(() => {
    getNotes()
  }, [])
  const deleteNote = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta nota?')) {
      deleteDoc(collection(db, 'users', auth.currentUser.uid, 'notes', id))
    }
  }
  return (
        <div className="notes-page">
            <ProfileBar/>
            <h2>Sección de notas </h2>
            <div className='notes-container'>
            {notes.map(note => {
              return (
                <div className='note-container' key={note.id}>
               <button onClick= {() => deleteNote(note.id)}>Borrar</button>
                <h2>{note.title}</h2>
                <p>{note.postText}</p>
                </div>
              )
            })}
            </div>
            <button className="add-note" ><Link className= 'link-create'to= '/crearnota'> + </Link></button>
        </div>
  )
}
export default NotesPage
