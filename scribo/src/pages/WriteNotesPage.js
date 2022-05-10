import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ProfileBar } from '../Components/ProfileBar'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../firebase'
import '../styles/WriteNotesPage.css'

function WriteNotesPage () {
  const [title, setTitle] = useState('')
  const [postText, setPostText] = useState('')
  const navigate = useNavigate()
  const createPost = async () => {
    await addDoc(collection(db, 'users', auth.currentUser.uid, 'notes'), {
      title,
      postText,
      author: auth.currentUser.displayName,
      authorId: auth.currentUser.uid
    })
    navigate('/notas')
  }

  return (
        <div className="create-post">
            <ProfileBar/>
            <div className="create-post__container">
            <Link className= "back-notas" to="/notas"> X </Link>
            <input className= 'title-input'type="text"placeholder='Título'onChange={(event) => { setTitle(event.target.value) }}/>
            <textarea className='content-input'placeholder='Nota'onChange=
            {(event) => { setPostText(event.target.value) }}></textarea>
            <button className='submit-note' onClick={createPost}>Guardar</button>
            </div>
        </div>
  )
}

export default WriteNotesPage
