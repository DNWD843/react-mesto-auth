import { Link } from 'react-router-dom';


function NavBarMobile({ email, signOut, signOutButtonText, isMenuOpened }) {
  return (
    <>
      {/*<input type="checkbox" id="navbar-menu" className="navbar__checkbox"></input>*/}
      <ul className={`navbar navbar_type_mobile ${isMenuOpened ? 'navbar_opened' : ''}`}>
        <li className="navbar__item">
          <Link to="#" className="navbar__link">{email}</Link>
        </li>
        <li className="navbar__item">
          <button onClick={signOut} className="button button_type_signout navbar__button-signout">{signOutButtonText}</button>
        </li>
      </ul>
    </>
  )
}

export default NavBarMobile;
