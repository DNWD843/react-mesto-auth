import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import headerLogoPath from '../images/headerLogo.svg';

/**
 * @module Header
 * @description Функциональный React-компонент Header<br>
 * Возвращает JSX-фрагмент разметки - "шапку" страницы приложения
 * @returns {JSX} - JSX-фрагмент разметки, блок Header
 * @since v.2.0.0
 */
function Header({userData}) {
  const { email } = userData;
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
          <p className="header__link">{email}</p>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
