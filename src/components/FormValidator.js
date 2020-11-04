/**
 * @deprecated Не используется начиная с версии 2.0.5
 * @description <b>Не используется начиная с версии 2.0.5</b><br>
 * <br>
 * Класс FormValidator<br>
 * Определяет логику валидации форм в модальных окнах приложения<br>
 * Для каждой формы создается свой экземпляр класса FormValidator<br>
 * Класс имеет один публичный метод, запускающий валидацию - enableValidation()<br>
 * Класс принимает в конструктор объект настроек config и DOM-ноду формы, для которой необходимо запустить валидацию<br>
 * <b>ПРИМЕЧАНИЕ:</b><br>
 * Для корректной работы валидации при добавлении новых форм, необходимо придерживаться описанного ниже порядка
 * присваивания значений атрибутов name и id в формах и открывающих их кнопках.<br>
 * Поиск кнопки, открывающей форму, производится по ее id.<br>
 * id кнопки состоит из id формы, которую он открывает, и слова button, добавленного через дефис.<br>
 * id формы, в свою очередь, имеет значение равное значению атрибута name этой же формы.<br>
 * Пример:<br>
 * Форма в модальном окне:
 * form  name="add-photo-form" id="add-photo-form"<br>
 * Кнопка, открывающая форму:
 * button  name="add-photo-form-button" id="add-photo-form-button"<br>
 * @param {Object} config - объект настроек валидации, содержит селекторы элементов и классы, необходимые для валидации
 * @param {String} config.inputSelector - селектор инпута формы, общий для всех инпутов
 * @param {String} config.submitButtonSelector - селектор кнопки отправки формы (submit)
 * @param {String} config.inactiveButtonClass - css класс, устанавливающй неактивное состояние кнопки submit
 * @param {String} config.inputErrorClass - css класс, устанавливающй невалидное состояние инпута
 * @param {String} config.errorClass - css класс, устанавливающй активное состояние элемента, содержащего текст ошибки
 * @param {HTMLFormElement} formNode - DOM-нода формы, для которой необходимо запустить валидацию
 * @since v.1.0.0
 */
class FormValidator {
  constructor(config, formNode) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formNode;
  }

  /**
   * @description Приватный метод<br>
   * Метод вывода сообщения об ошибке
   * @private
   * @param {HTMLElement} inputElement - инпут формы (один из нескольких или единственный)
   * @param {String} errorMesage - сообщение об ошибке
   */
  _showInputError(inputElement, errorMesage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMesage;
    errorElement.classList.add(this._errorClass);
  }

  /**
   * @description Приватный метод<br>
   * Метод скрытия сообщения об ошибке
   * @private
   * @param {HTMLElement} inputElement - инпут формы (один из нескольких или единственный)
   */
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  /**
   * @description Приватный метод<br>
   * Метод проверки валидности инпутов в форме<br>
   * Метод как бы отвечает на вопрос: этот инпут валиден?<br>
   * &nbsp Если да, то для этого инпута вызывается приватный метод скрытия ошибок _hideInputError<br>
   * &nbsp Если нет, то для этого инпута вызывается приватный метод отображения ошибок _showInputError<br>
   * @private 
   * @param {HTMLElement} inputElement - инпут формы (один из нескольких или единственный)
   */
  _isInputValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /**
   * @description Приватный метод<br>
   * Метод проверки наличия невалидных инпутов в форме<br>
   * Метод перебирает все инпуты формы и проверяет каждый на валидность<br>
   * Метод как бы отвечает на вопрос: в этой форме есть хотя бы один невалидный инпут?<br>
   * Возвращает true, если в форме есть хотя бы один невалидный инпут<br>
   * Возвращает false, если в форме нет ни одного невалидного инпута
   * @param {Array} inputList - массив, список инпутов формы
   * @private 
   */
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      /**
       * Валидность инпута определяется по состоянию свойства validity объекта ValidityState
       * @ignore
       */
      return !inputElement.validity.valid;
    });
  }

  /**
   * @description Приватный метод<br>
   * Изменяет состояние кнопки отправки формы (submit) в зависимости от валидности или невалидности инпутов формы<br>
   * Если форма содержит хотя бы один невалидный инпут, кнопка submit становится неактивной
   * @private
   * @param {Array} inputList - массив инпутов формы
   * @param {HTMLElement} buttonElement - DOM-элемент кнопки отправки формы (submit) 
   */
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  /**
   * @description Приватный метод<br>
   * Метод сброса валидации<br>
   * Если пользователь заполнял форму, но передумал отправлять данные и закрыл ее, то, несмотря на очистку инпутов при открытии форм,<br>
   * в форме остаются ошибки и стили невалидных инпутов.<br>
   * Метод _resetValidation очищает форму от ошибок и невалидных стилей, оставшихся после предыдущего сеанса работы пользователя с формой
   * @private
   * @param {Array} inputList - массив инпутов формы
   * @param {HTMLElement} buttonElement - DOM-элемент кнопки отправки формы (submit)
   */
  _resetValidation(inputList, buttonElement) {
    inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState(inputList, buttonElement);
  }

  /**
   * @description Приватный метод<br>
   * Метод установки слушателей на элементы формы
   * @private
   */
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    const openFormButton = document.querySelector(`#${this._formElement.id}-button`);

    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isInputValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
    openFormButton.addEventListener('click', () => {
      this._resetValidation(inputList, buttonElement);
    });
  }

  /**
   * @description Публичный метод<br>
   * Включает валидацию формы<br>
   * Включение валидации производится один раз.<br>
   * Далее валидация осуществляется постоянно при взаимодействии пользователя с формой
   * @public
   * @since v.2.0.1
   */
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
