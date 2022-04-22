import {Link} from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <p>
        This is the home page.
      </p>
      <p>¿No tienes cuenta ?</p>
      <Link to="/registro"> Registrate aquí </Link>
    </div>
  );
}
export default HomePage;


