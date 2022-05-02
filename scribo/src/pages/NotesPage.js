import { ProfileBar } from '../Components/ProfileBar'
import { Link } from 'react-router-dom'
import '../styles/NotesPage.css'
function NotesPage () {
  return (
        <div className="notes-page">
            <ProfileBar/>
            <h1>Acá verás todas tus notas </h1>
            <div className='notes-container'>
            </div>
            <button className="add-note" ><Link className= 'link-create'to= '/crearnota'> + </Link></button>
        </div>
  )
}
export default NotesPage
