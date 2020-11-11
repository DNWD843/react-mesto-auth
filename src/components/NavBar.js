import { Link } from 'react-router-dom';

/**
 * @module NavBar
 * @description Функциональный React-компонент<br>
 * Представляет собой меню со ссылками на профиль пользователя и выход из приложения.
 *  В зависимости от места и контекста использования может иметь разный вид, быть с кнопкой открытия/закрытия
 *  меню и без нее.<br>
 *  * представляет собой выезжающее меню без кнопки открытия/закрытия при использовании на мобильных устройствах,
 *  при этом кнопка открытия/закрытия располагается в хэдере<br>
 *  * представляет собой меню со ссылками без кнопки открытия/закрытия, при использования в хэдере на больших
 *  разрешениях
 * @param {Object} props - пропсы, принимаемые компонентом
 * @param {String} props.email - емэйл (логин), введенный пользователем при входе в приложение
 * @param {Function} props.handleSignoutButtonClick - функция-коллбэк, вызывается при клике по "Выйти", выход из профиля
 * на страницу входа (авторизации)
 * @param {String} props.signOutButtonText - текст, который будет отображен на кнопке выхода из профиля
 * @param {Function} props.handleMenuClick - функция-коллбэк, вызывается при клике по иконке "Меню", открывает или
 *  закрывает меню на мобильных разрешениях
 * @param {Boolean} props.isMenuOpened - индикатор состояния меню:<br>
 *  - true - меню открыто<br>
 *  - false - меню закрыто
 * @param {Boolean} props.isDropdownMenu - пропс, определяющий как будет отрисован компонент:<br>
 *  * true - меню будет отрисовано как выпадающее меню,кнопка управления меню может находиться в другом компоненте
 *  * false - меню будет отрисовано статичным списком ссылок без кнопки открытия/закрытия.<br>
 * <b>Внимание!</b> Этот пропс задается вручную и не является управляемым стейтом.
 * @returns {JSX}
 * @since v.2.1.0
 */
function NavBar({ email, handleSignoutButtonClick, signOutButtonText, handleMenuClick, isMenuOpened, isDropdownMenu }) {
  return (
    <>
      <ul className={`navbar ${isDropdownMenu ? `navbar_type_mobile ${isMenuOpened ? 'navbar_opened' : ''}` : ''}`}>
        <li className="navbar__item">
          <Link to="#" className="navbar__link">{email}</Link>
        </li>
        <li className="navbar__item">
          <button onClick={handleSignoutButtonClick} className="button button_type_signout navbar__button-signout">{signOutButtonText}</button>
        </li>
      </ul>
      {!isDropdownMenu
        && <button
          type="button"
          title="Меню"
          onClick={handleMenuClick}
          className={`button navbar__menu-button ${isMenuOpened ? "navbar__menu-button_type_open" : "navbar__menu-button_type_close"}`}
        >
        </button>
      }
    </>
  )
}

export default NavBar;
