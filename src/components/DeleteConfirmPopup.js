import React from 'react';
import PopupWithForm from './PopupWithForm';

/**
 * @module DeleteConfirmPopup
 * @description Функциональный React-компонент<br>
 * Запрашивает подтверждение удаления карточки<br>
 * Принимает объект параметров props<br>
 * Возвращает JSX-фрагмент разметки попапа  подтверждения удаления карточки
 * @param {Object} props - объект параметров
 * @param {Function} props.onClose - функция-коллбэк, закрывает попап
 * @param {Function} props.onOverlayClick - функция-коллбэк, вызывается при клике по оверлею, закрывает попап
 * @param {Function} props.onSubmit - функция-коллбэк сабмита попапа, удаляет карточку 
 * @param {Boolean} props.isOpen - индикатор состояния попапа, управляет его видимостью:<br>
 *  - true - попап открыт<br>
 *  - false - попап закрыт 
 * @param {Boolean} props.isProcessing - индикатор статуса процесса удаления карточки: 
 * true - карточка удаляется, false - ожидается подтверждение удаления карточки или отмена 
 * @see {@link PopupWithForm}
 * @since v.2.0.4
 */
function DeleteConfirmPopup(props) {
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      submitButtonText="Да"
      onClose={ props.onClose }
      onOverlayClick={ props.onOverlayClick }
      isOpen={ props.isOpen }
      onSubmit={ props.onSubmit }
      isLoading={ props.isProcessing }
      preloaderText="Удаление..."
      isReadyToSubmit={ true }
    />
  );
}

export default DeleteConfirmPopup;