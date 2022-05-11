import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProfileBar } from '../Components/ProfileBar'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { GoX } from 'react-icons/go'
import '../styles/WriteNotesPage.css'
function EditNotePage () {
  const navigate = useNavigate()
  const { id } = useParams()
  const initiaStateValues = {
    title: '',
    postText: ''
  }
  const [values, setValues] = useState(initiaStateValues)
  const getNote = async (id) => {
    const postDoc = doc(db, 'users', auth.currentUser.uid, 'notes', id)
    const docSnap = await getDoc(postDoc)
    setValues(docSnap.data())
  }
  // const handleInputChange = (event) => {
  //   const { name, values } = event.target
  //   setValues({ ...values, [name]: event.target.value, date: serverTimestamp(), dateTime: new Date().toLocaleString() })
  // }
  useEffect(() => {
    getNote(id)
  }, [])
  const editNote = async (id) => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid, 'notes', id), values)
    navigate('/notas')
  }
  return (
          <div className="create-post">
              <ProfileBar/>
              <div className="create-post__container">
              <Link className= "back-notas" to="/notas"> <GoX/></Link>
              <input className= 'title-input'type="text" name='title' value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })}/>
              <textarea className='content-input' name='postText'value={values.postText}onChange=
              {(e) => setValues({ ...values, postText: e.target.value })}></textarea>
              <button className='update-note' onClick={() => editNote(id)}>Actualizar</button>
              </div>
          </div>
  )
}

export default EditNotePage
