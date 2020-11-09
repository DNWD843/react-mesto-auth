import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import headerLogoPath from '../images/headerLogo.svg';
import {SIGNIN, SIGNUP, MAIN} from '../utils/routesMap';

/**
 * @module Header
 * @description Функциональный React-компонент Header<br>
 * Возвращает JSX-фрагмент разметки - "шапку" страницы приложения
 * @returns {JSX} - JSX-фрагмент разметки, блок Header
 * @since v.2.0.0
 */
function Header(props) {

  return (
    <header className="header page__header">
      <img className="header__logo" src={ headerLogoPath } alt="логотип проекта 'Место-Россия'" />
      <Switch>
        <Route path={SIGNIN}>
          <Link to={SIGNUP} className="header__link">{props.signupLinkText}</Link>
        </Route>
        <Route path={SIGNUP}>
          <Link to={SIGNIN} className="header__link">{props.signinLinkText}</Link>
        </Route>
        <Route path={MAIN} exact>
          <Navbar signOutButtonText="Выйти" {...props} />
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
