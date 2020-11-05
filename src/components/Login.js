import React from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import StartPageForm from './StartPageForm';

export default function Login(props) {
  const { values, errors, isValid, handleInputChange, resetForm } = useFormWithValidation();

  const { login, password } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('login submit');
    
  };

  React.useEffect(() => {
    resetForm({}, {}, false);
  }, []);

  return (
    <StartPageForm
      name='login'
      title='Вход'
      onSubmit={ handleSubmit }
      isDisabled={ !isValid }
      isLoading={ props.isLoading }
      submitButtonText='Войти'
      preloaderText='Вход в систему...'
      
    >
      <>
        <ul className="form__inputs form__inputs_type_start">
          <li className="form__field">
            <input
              id="user-login"
              name="login"
              type="email"
              onChange={ handleInputChange }
              value={ login || '' }
              className="form__input form__input_type_start form__input_type_user-login"
              placeholder="Email"
              required
            />
            <span className="form__input-error" id="user-login-input-error">{ errors.login || '' }</span>
          </li>
          <li className="form__field">
            <input
              id="user-password"
              name="password"
              type="password"
              onChange={ handleInputChange }
              value={ password || '' }
              className="form__input form__input_type_start form__input_type_user-password"
              placeholder="Пароль"
              required
              minLength="3"
              maxLength="35"
            />
            <span className="form__input-error" id="user-password-input-error">{ errors.password || '' }</span>
          </li>
        </ul>
      </>
    </StartPageForm>
  );
};