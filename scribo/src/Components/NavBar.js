import { NavLink } from 'react-router-dom'
function NavBar () {
  return (
      <div>
        <ul>
            <li>
                <NavLink to='/registro'> Registro </NavLink>
            </li>
            <li>
                <NavLink to='/notas'> Notas </NavLink>
            </li>
            <li>
                <NavLink to='/'> Home </NavLink>
            </li>
        </ul>
      </div>
  )
}
export default NavBar
