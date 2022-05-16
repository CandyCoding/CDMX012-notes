import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProfileBar } from '../Components/ProfileBar'
import { doc, getDoc, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'
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
  /*   const handleInputChange = (event) => {
    setValues({ date: serverTimestamp(), dateTime: new Date().toLocaleString() })
  } */
  useEffect(() => {
    getNote(id)
  }, [])

  const editNote = async (id) => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid, 'notes', id), values, serverTimestamp(), new Date().toLocaleString())
    navigate('/notas')
  }
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
        navigate('/notas')
      }
    }
    )
  }

  return (
          <div className="create-post">
              <ProfileBar/>
              <div className="create-post-container" style= {{ background: values.color }}>
              <Link className= "back-notas" to="/notas"> <GoX/></Link>
              <input className= 'title-input'type="text" name='title' value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} style= {{ background: values.color }}/>
              <textarea className='content-input' name='postText'value={values.postText}onChange=
              {(e) => setValues({ ...values, postText: e.target.value, date: serverTimestamp(), dateTime: new Date().toLocaleString() })} style= {{ background: values.color }}></textarea>
              <button className='update-note' onClick={() => editNote(id)}>Actualizar</button>
              <button className='delete-note' onClick={() => deleteNote(id)}>Borrar</button>
              </div>
          </div>
  )
}

export default EditNotePage
