import { ProfileBar } from '../Components/ProfileBar'
import { useEffect, useState } from 'react'
import { db, auth } from '../firebase'
import { Link } from 'react-router-dom'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import '../styles/NotesPage.css'
import { GiFeather } from 'react-icons/gi'
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

  // const [menuOpen, setMenuOpen] = useState(false)
  // const handleClickMenu = (id) => {
  //   console.log('hola')
  //   setMenuOpen(!menuOpen)
  // }
  return (
        <div className="notes-page">
            <ProfileBar/>
            <div className='notes-container'>
            {notes.map(note => {
              return (
                <div className='note-container' key={note.id} style= {{ background: note.color }}>
                <section className='title-container'>
                <h4 className='title-note'>{note.title}</h4>
                </section>
                <div className='textcontent-container'><Link className='note-text' to={`/editar/${note.id}`}>{note.postText}</Link></div>
                <p className='date-note'>Última actualización el {note.dateTime}</p>
                </div>
              )
            })}
            </div>
            <button className="add-note" ><Link className= 'link-create'to= '/crearnota'> <GiFeather size="1.3em"/> </Link></button>
        </div>
  )
}
export default NotesPage
