import {Link} from 'react-router-dom'

function Navbar({userData, signOut}) {
  const { email } = userData;
  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link to="#" className="navbar__link">{ email }</Link>
      </li>
      <li className="navbar__item">
        <button onClick={ signOut } className="button button_type_signout header__button-signout">Выйти</button>
      </li>
    </ul>
  );
}

export default Navbar;
