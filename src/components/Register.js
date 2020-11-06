import React from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import StartPageWithForm from './StartPageWithForm';
import {register} from '../utils/auth';

export default function Register(props) {
  const { values, errors, isValid, handleInputChange, resetForm } = useFormWithValidation();

  const { userEmail, regPassword } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    register(userEmail, regPassword);

  };

  React.useEffect(() => {
    resetForm({}, {}, false);
  }, []);

  return (
    <StartPageWithForm
      name='register'
      title='Регистрация'
      onSubmit={ handleSubmit }
      isDisabled={ !isValid }
      isLoading={ props.isLoading }
      submitButtonText='Зарегистрироваться'
      preloaderText='Регистрация...'
    >
      <>
        <ul className="form__inputs form__inputs_type_start">
          <li className="form__field">
            <input
              id="user-email"
              name="userEmail"
              type="email"
              onChange={ handleInputChange }
              value={ userEmail || '' }
              className="form__input form__input_type_start form__input_type_user-email"
              placeholder="Email"
              required
            />
            <span className="form__input-error" id="user-email-input-error">{ errors.userEmail || '' }</span>
          </li>
          <li className="form__field">
            <input
              id="reg-password"
              name="regPassword"
              type="password"
              onChange={ handleInputChange }
              value={ regPassword || '' }
              className="form__input form__input_type_start form__input_type_reg-password"
              placeholder="Пароль"
              required
              minLength="3"
              maxLength="35"
            />
            <span className="form__input-error" id="reg-password-input-error">{ errors.regPassword || '' }</span>
          </li>
        </ul>
      </>
    </StartPageWithForm>
  );
}
