import React from 'react';

/**
 * @module Footer
 * @description Функциональный React-компонент Footer<br>
 * Возвращает JSX-фрагмент разметки - "подвал" страницы приложения
 * @returns {JSX} - JSX-фрагмент разметки, блок Footer
 * @since v.2.0.0
 */
function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&#169; 2020 Mesto Russia</p>
    </footer>
  );
}

export default Footer;
