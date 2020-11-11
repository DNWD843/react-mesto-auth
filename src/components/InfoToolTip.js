/**
 * @module InfoToolTip
 * @description Функциональный React-компонент<br>
 * Попап с информационной подсказкой об успехе или ошибке регистрации в приложении<br>
 * Открывается при попытках пользователя зарегистрироваться или войти в приложение.
 * @param {Object} props - пропсы, принимаемые компонентом
 * @param {String} props.name - имя пользователя, принимается для отображения в профиле на главной странице
 * @param {Boolean} props.isOpen - индикатор состояния попапа, управляет его видимостью:<br>
 *  - true - попап открыт<br>
 *  - false - попап закрыт
 * @param {Function} props.onClose - функция-коллбэк, вызывается при клике по иконке закрытия попапа, закрывает попап
 * @param {Function} props.onOverlayClick - функция-коллбэк, вызывается при клике по оверлею, закрывает попап
 * @param {String} props.titleTextSuccess - текст подсказки об успешной регистрации
 * @param {String} props.titleTextFail - текст подсказки об ошибке регистрации или авторизации
 * @param {Boolean} props.loggedIn - индикатор состояния пользователя, управляет его допуском в приложение:<br>
 *  - true - пользователь зарегистрирован и залогинился<br>
 *  - false - не зарегистрирован, не залогинился или вышел из приложения
 * @returns {JSX} - JSX-фрагмент разметки, попап с информационной подсказкой
 * @since v.2.1.0
 */
function InfoToolTip({
  name, isOpen, onClose, onOverlayClick, titleTextSuccess, titleTextFail, loggedIn,
}) {
  return (
    <div onClick={onOverlayClick} className={`popup page__overlay page__overlay_theme_light popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} id={name}>
      <div className="popup__container">
        <button type="button" onClick={onClose} className="button button_type_close popup__close-button popup__close-button_type_info-tool-tip" name="close-popup" value="Закрыть"></button>
        <div className="info-tool-tip popup__info-tool-tip">
          <div className={`info-tool-tip__image ${loggedIn ? 'info-tool-tip__image_type_success' : 'info-tool-tip__image_type_fail'}`}></div>
          <p className="info-tool-tip__title">{loggedIn ? titleTextSuccess : titleTextFail}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoToolTip;
