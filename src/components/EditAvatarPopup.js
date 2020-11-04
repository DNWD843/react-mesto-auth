import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

/**
 * @module EditAvatarPopup
 * @description Функциональный React-компонент<br>
 * Изменяет аватар пользователя.<br>
 * Для успешного изменения аватара пользователь должен ввести корректную ссылку (url-адрес) на новый аватар <br>
 * Принимает объект параметров props<br>
 * Возвращает JSX-фрагмент разметки попапа редактирования аватара пользователя<br>
 * @param {Object} props - объект с параметрами
 * @param {Function} props.onClose - функция-коллбэк, закрывает попап
 * @param {Function} props.onOverlayClick - функция-коллбэк, вызывается при клике по оверлею, закрывает попап
 * @param {Function} props.onUpdateAvatar -  функция-коллбэк, обновляет аватар пользователя при успешном сабмите формы изменения аватара
 * @param {Boolean} props.isOpen - индикатор состояния попапа, управляет его видимостью:<br>
 *  - true - попап открыт<br>
 *  - false - попап закрыт
 * @param {Boolean} props.isLoading - индикатор состояния загрузки нового аватара пользователя, 
 * управляет отображением прелоадера загрузки:<br>
 *  - true - идет загрузка, отображется текст-прелоадер на кнопке сабмит;<br>
 *  - false - нет загрузки, на кнопке сабмит дефолтный текст:
 * @returns {JSX} - JSX-фрагмент разметки, попап редактирования аватара пользователя
 * @see {@link PopupWithForm}
 * @since v.2.0.2
 */
const EditAvatarPopup = ({ isOpen, isLoading, onClose, onOverlayClick, onUpdateAvatar }) => {

  /**
  * @constant useFormWithValidation
  * @description Запуск хука валидации формы
  * @see {@link useFormWithValidation}
  * @since v.2.0.6
  */
  const { values, errors, isValid, handleInputChange, resetForm } = useFormWithValidation();

  const { avatar } = values;
  
  /**
  * @method handleSubmit
  * @argument {Event} evt - событие
  * @description Обработчик сабмита формы добавления новой карточки<br>
  * Вызывает метод onUpdateAvatar, полученный из props.
  * @public
  * @since v.2.0.6
  */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({ avatar });
  };

  /**
   * При закрытии попапа очищаем инпут формы и сбрасываем валидацию
   * @ignore
   */
  React.useEffect(() => {
    resetForm({}, {}, false);
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitButtonText="Создать"
      isOpen={ isOpen }
      onClose={ onClose }
      onOverlayClick={ onOverlayClick }
      onSubmit={ handleSubmit }
      isLoading={ isLoading }
      preloaderText="Сохранение..."
      isDisabled={ !isValid }
      children={
        <ul className="form__inputs">
          <li className="form__field">
            <input
              id="avatar-link-input"
              name="avatar"
              type="url"
              onChange={ handleInputChange }
              value={ avatar || '' }
              className="form__input form__input_type_avatar-link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="form__input-error" id="avatar-link-input-error">{ errors.avatar }</span>
          </li>
        </ul>
      }
    />
  );
}

export default EditAvatarPopup;
