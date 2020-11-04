import React from 'react';

/**
 * @module ImagePopup
 * @description Функциональный React-компонент<br>
 * Открывает изображение карточки в полном размере<br>
 * Принимает объект параметров - props<br>
 * Возвращает JSX-фрагмент разметки - попап с полноразмерным изображением карточки<br>
 * @param {Object} props - объект с параметрами и переданными функциями-коллбэками
 * @param {Object} props.card - объект с данными карточки
 * @param {String} props.card.link - ссылка на изображение карточки
 * @param {String} props.card.title - название карточки
 * @param {Function} props.onClose - функция-коллбэк, вызывается при клике по иконке закрытия попапа, закрывает попап
 * @param {Function} props.onOverlayClick - функция-коллбэк, вызывается при клике по оверлею, закрывает попап
 * @param {Boolean} props.isOpen - индикатор состояния попапа, управляет его видимостью:<br>
 *  - true - попап открыт<br>
 *  - false - попап закрыт
 * @returns {JSX} - JSX-фрагмент разметки, попап с полноразмерным изображением карточки
 * @since v.2.0.0
 */
function ImagePopup(props) {
  return (
    <div onClick={ props.onOverlayClick } className={ `popup page__overlay page__overlay_theme_dark popup_type_view-photo ${props.isOpen ? 'popup_opened' : ''}` } id="view">
      <div className="popup__container">
        <button type="button" onClick={ props.onClose } className="button button_type_close popup__close-photo-button" name="close-photo" value="Закрыть фото"></button>
        <figure className="popup__photo-content">
          <img className="popup__place-image" src={ `${props.card ? props.card.link : '#'}  ` } alt={ `${props.card ? props.card.title : 'изображение'}` } />
          <figcaption className="popup__place-name">{ `${props.card ? props.card.title : 'изображение'}` }</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
