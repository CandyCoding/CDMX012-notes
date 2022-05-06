import { ProfileBar } from '../Components/ProfileBar'
import { useEffect, useState } from 'react'
import { db, auth } from '../firebase'
import { Link } from 'react-router-dom'
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import '../styles/NotesPage.css'
function NotesPage () {
  const [notes, setNotes] = useState([])
  const [currentId, setCurrentId] = useState('')

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

  const deleteNote = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta nota?')) {
      const postDoc = doc(db, 'users', auth.currentUser.uid, 'notes', id)
      await deleteDoc(postDoc)
    }
  }
  return (
        <div className="notes-page">
            <ProfileBar/>
            <div className='notes-container'>
            {notes.map(note => {
              return (
                <div className='note-container' key={note.id}>
                <section className='title-container'>
                <h4 className='title-note'>{note.title}</h4>
                </section>
                <div className='textcontent-container'>{note.postText}</div>
                <section className='btn-container'>
                <button onClick= {() => deleteNote(note.id)}>&#128465;
                </button>
                <button className='edit-note' onClick={() => setCurrentId(note.id)}>
                &#9999;</button>
                </section>
                </div>
              )
            })}
            </div>
            <button className="add-note" ><Link className= 'link-create'to= '/crearnota'> + </Link></button>
        </div>
  )
}
export default NotesPage
