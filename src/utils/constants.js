/**
 * @namespace constants 
 * @description Модуль Constants содержит все DOM-элементы, классы, селекторы, которые используются повторно,<br>
 * объекты конфигурации для классов, пакеты селекторов для классов.
 */

/**
 * @deprecated Не используется начиная с версии 2.0.5
 * @memberof constants
 * @type {Object} 
 * @constant
 * @name validationConfig
 * @instance
 * @description <b>Не используется начиная с версии 2.0.5</b><br>
 * <b>Начиная с версии 2.0.5 валидация форм выполняется с помощью библиотек Formik и Yup.</b><br>
 * <br>
 * объект, содержащий данные для запуска валидации форм
 * @property {Object} config
 * @property {String} config.inputSelector - селектор инпута формы, общий для всех инпутов
 * @property {String} config.submitButtonSelector - селектор кнопки отправки формы (submit)
 * @property {String} config.inactiveButtonClass - css класс, устанавливающй неактивное состояние кнопки submit
 * @property {String} config.inputErrorClass - css класс, устанавливающй невалидное состояние инпута
 * @property {String} config.errorClass - css класс, устанавливающй активное состояние элемента, содержащего текст ошибки
 * @since v.1.0.0
 */
const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'button_type_submit-inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

export { validationConfig };
