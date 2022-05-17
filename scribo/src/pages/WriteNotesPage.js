import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ProfileBar } from '../Components/ProfileBar'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { GoX } from 'react-icons/go'
import '../styles/WriteNotesPage.css'

function WriteNotesPage () {
  const [title, setTitle] = useState('')
  const [postText, setPostText] = useState('')
  const [notecolor, setColor] = useState('#DDDFFD')
  const navigate = useNavigate()
  const createPost = async () => {
    await addDoc(collection(db, 'users', auth.currentUser.uid, 'notes'), {
      title,
      postText,
      date: serverTimestamp(),
      color: notecolor,
      dateTime: new Date().toLocaleString(),
      author: auth.currentUser.displayName,
      authorId: auth.currentUser.uid
    })
    navigate('/notas')
  }

  return (
        <div className="create-post">
            <ProfileBar/>
            <div className="create-post-container">
            <Link className= "back-notas" to="/notas"> <GoX/></Link>
            <input className= 'title-input'type="text"placeholder='Título'onChange={(event) => { setTitle(event.target.value) }}/>
            <textarea className='content-input'placeholder='Nota'onChange=
            {(event) => { setPostText(event.target.value) }}></textarea>
            <div className='color-container'>
              <button id = 'color-btn'className='LP' value='#DDDFFD'>LP</button>
              <button id = 'color-btn'className='CP' value='#C8C1E3'onClick={(event) => { setColor(event.target.value) }}>CP</button>
              <button id = 'color-btn'className='MP' value='#BBBAFF'onClick={(event) => { setColor(event.target.value) }}>MP</button>
              <button id = 'color-btn'className='PT' value='#7B78F6'onClick={(event) => { setColor(event.target.value) }}>PT </button>
              <button id = 'color-btn'className='PG' value='#7F7ECC'onClick={(event) => { setColor(event.target.value) }}>PG</button>
              </div>
            <button className='submit-note' onClick={createPost}>Guardar</button>
            </div>
        </div>
  )
}

export default WriteNotesPage
