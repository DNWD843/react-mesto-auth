import { Link } from 'react-router-dom'

function Navbar({ userData, signOut, signOutButtonText, handleClick, isMenuOpened }) {
  const { email } = userData;
  return (
    <>
      <ul className="navbar">
        <li className="navbar__item">
          <Link to="#" className="navbar__link">{email}</Link>
        </li>
        <li className="navbar__item">
          <button onClick={signOut} className="button button_type_signout navbar__button-signout">{signOutButtonText}</button>
        </li>
      </ul>
      {/*<label for="navbar-menu" className="navbar__menu"></label>*/}
      <button
        type="button"
        onClick={handleClick}
        className={`button navbar__menu ${isMenuOpened ? "navbar__menu_opened" : "navbar__menu_closed"}`}></button>
    </>
  );
}

export default Navbar;
