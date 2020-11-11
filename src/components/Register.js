import React, { useEffect } from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import StartPageWithForm from './StartPageWithForm';

/**
 * @module Register
 * @description Функциональный React-компонент<br>
 * Форма регистрации в приложении. Отправляет запрос на регистрацию пользователя.
 * @param {Object} props - пропсы, принимаемые компонентом
 * @param {Boolean} props.isLoading - индикатор состояния загрузки, используется для информирования пользовтаеля
 *  о том, что инициированный им процесс выполняется
 * @param {Function} props.handleRegister - функция-коллбэк, вызывается при сабмите формы регистрации, отправляет данные
 *  пользователя на сервер для его регистрации.
 * @returns {JSX} - JSX-фрагмент разметки, форма регистрации в приложении
 * @since v.2.1.0
 */
function Register({ isLoading, handleRegister }) {
  /**
   * Подключаем пользовательский хук работы с формой и валидации полей формы
   * @ignore
   */
  const { values, errors, isValid, handleInputChange, resetForm } = useFormWithValidation();

  const { regEmail, regPassword } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const userRegistrationData = {
      email: regEmail,
      password: regPassword
    }
    handleRegister(userRegistrationData);
  };

  /**
   * При открытии или обновлении формы все ее поля очищаются.
   * @ignore
   */
  useEffect(() => {
    resetForm({}, {}, false);
    //eslint-disable-next-line
  }, []);

  return (
    <StartPageWithForm
      name='register'
      title='Регистрация'
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      isLoading={isLoading}
      submitButtonText='Зарегистрироваться'
      preloaderText='Регистрация...'
      redirectTitleText="Уже зарегистрированы? "
      redirectLinkText="Войти"
    >
      <>
        <ul className="form__inputs form__inputs_type_start">
          <li className="form__field form__field_type_start">
            <input
              id="reg-email"
              name="regEmail"
              type="email"
              onChange={handleInputChange}
              onFocus={handleInputChange}
              value={regEmail || ''}
              className="form__input form__input_type_start form__input_type_reg-email"
              placeholder="Email"
              required
            />
            <span className="form__input-error" id="user-email-input-error">{errors.regEmail || ''}</span>
          </li>
          <li className="form__field">
            <input
              id="reg-password"
              name="regPassword"
              type="password"
              onChange={handleInputChange}
              onFocus={handleInputChange}
              value={regPassword || ''}
              className="form__input form__input_type_start form__input_type_reg-password"
              placeholder="Пароль"
              required
              minLength="3"
              maxLength="35"
            />
            <span className="form__input-error" id="reg-password-input-error">{errors.regPassword || ''}</span>
          </li>
        </ul>
      </>
    </StartPageWithForm>
  );
}

export default Register;
