/**
 * @module PopupWithForm
 * @description Функциональный React-компонент<br>
 * Шаблонный компонент попапа<br>
 * По принятым параметрам props и JSX-фрагменту разметки с инпутами props.children создает попап с формой для каждой
 * конкретной задачи: редактирование профиля, редактирование аватара, добавление карточки, подтверждение удаления карточки<br>
 * Принимает объект параметров - props<br>
 * Возвращает JSX-фрагмент разметки - попап<br>
 * @param {Object} props - объект с параметрами и переданными функциями-коллбэками
 * @param {JSX} props.children - JSX-фрагмент, список инпутов попапа<br>
 * <b>ПРИМЕЧАНИЕ:</b> Может не указываться явно в пропсах, может быть указан JSX-фрагментом при декларировании отрисовки компонента
 * @param {String} props.name - название формы, вставляется в атрибут name тега form и в css-класс, уточняющий тип формы
 * @param {String} props.title - название попапа
 * @param {String} props.submitButtonText - текст, который будет отображаться на кнопке submit
 * @param {String} props.preloaderText - текст, отображаемый на кнопке сабмит во время загрузки, т.е. когда isLoading: true
 * @param {Funcion} props.onClose - функция-коллбэк, вызывается при клике по иконке закрытия попапа, закрывает попап
 * @param {Function} props.onOverlayClick - функция-коллбэк, вызывается при клике по оверлею попапа, закрывает попап
 * @param {Function} props.onSubmit - функция-коллбэк, вызывается при сабмите формы попапа
 * @param {Boolean} props.isOpen - индикатор состояния попапа, управляет его видимостью:<br>
 *  - true: попап отображается<br>
 *  - false: попап не отображается
 * @param {Boolean} props.isLoading - индикатор состояния загрузки новых данных на сервер:<br>
 *  - true - идет загрузка<br> -  false - нет загрузки
 * @param {Boolean} props.isReadyToSubmit - индикатор готовности формы к сабмиту, вычисляется по результатам валидации инпутов:<br>
 * true - форма готова к сабмиту, все поля валидны<br>
 * false - форма не готова к сабмиту, хотя бы одно из полей не валидно<br>
 * <b>ПРИМЕЧАНИЕ: </b>в попапе подтверждения удаления DeleteConfirmPopup нет формы, поэтому этот параметр принимается от DeleteConfirmPopup
 * в значении true по умолчанию <br>Since: v.2.0.5
 * @returns {JSX} - JSX-фрагмент разметки, попап
 * @since v.2.0.0
 */
function PopupWithForm(props) {
  return (
    <div onClick={ props.onOverlayClick } className={ `popup page__overlay page__overlay_theme_light popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}` } id={ props.name }>
      <div className="popup__container">
        <button type="button" onClick={ props.onClose } className="button button_type_close popup__close-button popup__close-button_type_modal" name="close-popup" value="Закрыть"></button>
        <form onSubmit={ props.onSubmit } className={ `form popup__form form_type_${props.name}` } name={ `${props.name}-form` } id={ `${props.name}-form` } >
          <h2 className="form__title">{ props.title }</h2>
          { props.children }
          <button type="submit" disabled={ props.isDisabled } className={ `button ${props.isDisabled ? 'button_type_submit-inactive' : 'button_type_submit'} form__submit-button` } name={ `${props.name}-button` } value={ props.submitButtonText }>{ props.isLoading ? props.preloaderText : props.submitButtonText }</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
