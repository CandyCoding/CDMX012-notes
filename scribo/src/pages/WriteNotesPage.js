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
            <select className='color-input' onChange={(event) => { setColor(event.target.value) }}>
              <option className='option-one' value='#DDDFFD'>LigthPurple</option>
              <option value='#C8C1E3'>MediumPurple</option>
              <option value='#BBBAFF'>Purple</option>
              <option value='#7B78F6'></option>
              <option value='#7F7ECC'>Amarillo</option>
            </select>
            <button className='submit-note' onClick={createPost}>Guardar</button>
            </div>
        </div>
  )
}

export default WriteNotesPage
