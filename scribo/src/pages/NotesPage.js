import { ProfileBar } from '../Components/ProfileBar'
import { useEffect, useState } from 'react'
import { db, auth } from '../firebase'
import { Link } from 'react-router-dom'
import { collection, onSnapshot, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import '../styles/NotesPage.css'
import Swal from 'sweetalert2'
import { GiFeather } from 'react-icons/gi'
import { GoKebabVertical } from 'react-icons/go'
function NotesPage () {
  const [notes, setNotes] = useState([])
  const getNotes = async () => {
    const collectionRef = collection(db, 'users', auth.currentUser.uid, 'notes')
    const q = query(collectionRef, orderBy('date', 'desc'))
    onSnapshot(q, (querySnapshot) => {
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
    Swal.fire({
      title: '¿Quieres borrar esta nota?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      cancelButtonColor: '#7066e0',
      confirmButtonColor: '#7066e0',
      width: '500px',
      background: '#DDDFFD'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const postDoc = doc(db, 'users', auth.currentUser.uid, 'notes', id)
        await deleteDoc(postDoc)
      }
    }
    )
  }
  const [menuOpen, setMenuOpen] = useState(false)

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
                <p className='date-note'>Última actualización el {note.dateTime}</p>
                <section>
                <button id='menu-item' onClick={() => setMenuOpen(!menuOpen)}>
                  <GoKebabVertical size='1.2em'/>
                </button>
                {menuOpen && <ul className='menu'>
                  <li>
                    <Link to={`/editar/${note.id}`}>Editar</Link>
                  </li>
                  <li onClick= {() => deleteNote(note.id)}> Eliminar
                  </li>
                </ul>}
                </section>
                </div>
              )
            })}
            </div>
            <button className="add-note" ><Link className= 'link-create'to= '/crearnota'> <GiFeather size="1.3em"/> </Link></button>
        </div>
  )
}
export default NotesPage
