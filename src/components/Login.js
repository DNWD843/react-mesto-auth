import React, { useEffect } from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import StartPageWithForm from './StartPageWithForm';

function Login({isLoading, handleLogin, userData}) {

  const { values, errors, isValid, handleInputChange, resetForm } = useFormWithValidation();

  const { login, password } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const userData = { password, login };
    handleLogin(userData);
  };

  useEffect(() => {
    resetForm({ login: userData.email, password: userData.password }, {});
    //eslint-disable-next-line
  }, []);

  return (
    <StartPageWithForm
      name='login'
      title='Вход'
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      isLoading={isLoading}
      submitButtonText='Войти'
      preloaderText='Выполняется вход...'
      redirectTitleText="Уже зарегистрированы? "
      redirectLinkText="Войти"
    >
      <>
        <ul className="form__inputs form__inputs_type_start">
          <li className="form__field form__field_type_start">
            <input
              id="user-login"
              name="login"
              type="email"
              onChange={handleInputChange}
              onFocus={handleInputChange}
              value={login || ''}
              className="form__input form__input_type_start form__input_type_user-login"
              placeholder="Email"
              required
            />
            <span className="form__input-error" id="user-login-input-error">{errors.login || ''}</span>
          </li>
          <li className="form__field">
            <input
              id="user-password"
              name="password"
              type="password"
              onChange={handleInputChange}
              onFocus={handleInputChange}
              value={password || ''}
              className="form__input form__input_type_start form__input_type_user-password"
              placeholder="Пароль"
              required
              minLength="3"
              maxLength="35"
            />
            <span className="form__input-error" id="user-password-input-error">{errors.password || ''}</span>
          </li>
        </ul>
      </>
    </StartPageWithForm>
  );
};

export default Login;
