import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import * as auth from '../utils/auth';
import StartPageWithForm from './StartPageWithForm';
import * as TO_ from '../utils/routesMap';

function Login(props) {
  const { values, errors, isValid, handleInputChange, resetForm } = useFormWithValidation();

  const [message, setMessage] = useState('');
  const history = useHistory();

  const { login, password } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!login || !password) {
      setMessage('Ошибка входа: не передано одно из полей!')
      return;
    }
    auth.authorize(password, login)
      .then((data) => {
        console.log(data)
        if (!data) {
          
          return setMessage(`Ошибка входа: пользователь с email ${login} не найден!`);
        }
        if (data.token) {
          setMessage('')
          const userData = { email: login };
          props.handleLogin(userData);
          history.push(TO_.MAIN);
        } 
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    resetForm({}, {}, false);
    setMessage('');
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setMessage('');
  }, [values]);

  return (
    <StartPageWithForm
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
            <span style={ { color: "white", fontSize: "10px" } }>{ message || props.tokenCheckMessage }</span>
          </li>
        </ul>
        
      </>
    </StartPageWithForm>
  );
};

export default Login;
