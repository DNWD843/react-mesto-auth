import React from 'react';
import headerLogoPath from '../images/headerLogo.svg';

/**
 * @module Header
 * @description Функциональный React-компонент Header<br>
 * Возвращает JSX-фрагмент разметки - "шапку" страницы приложения
 * @returns {JSX} - JSX-фрагмент разметки, блок Header
 * @since v.2.0.0
 */
function Header() {
  return (
    <header className="header page__header">
      <img className="header__logo" src={ headerLogoPath } alt="логотип проекта 'Место-Россия'" />
    </header>
  );
}

export default Header;
