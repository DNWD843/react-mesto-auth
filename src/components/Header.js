import React from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import headerLogoPath from '../images/headerLogo.svg';
import { TOKEN_KEY } from '../utils/token';
import * as TO_ from '../utils/routesMap';

/**
 * @module Header
 * @description Функциональный React-компонент Header<br>
 * Возвращает JSX-фрагмент разметки - "шапку" страницы приложения
 * @returns {JSX} - JSX-фрагмент разметки, блок Header
 * @since v.2.0.0
 */
function Header({userData}) {
  const { email } = userData;
  const history = useHistory();
  function signOut() {
    localStorage.removeItem(TOKEN_KEY);
    history.push(TO_.SIGNIN);
  }
  return (
    <header className="header page__header">
      <img className="header__logo" src={ headerLogoPath } alt="логотип проекта 'Место-Россия'" />
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route path="/" exact>
          <ul className="header__navbar">
            <li className="header__navbar-item">
              <Link to="#" className="header__link">{email}</Link>
            </li>
            <li className="header__navbar-item">
              <button onClick={ signOut } className="button button_type_signout header__button-signout">Выйти</button>
            </li>
          </ul>
          
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
