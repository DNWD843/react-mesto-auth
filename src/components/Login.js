import React, {useState} from 'react';
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
    console.log('login: ' + login + ' , pass: ' + password);
    evt.preventDefault();
    if (!login || !password) {
      return;
    }
    auth.authorize(password, login)
      .then((data) => {
        console.log(data);
        if (!data) {
          return setMessage('Что-то пошло не так!');
        }
        if (data.token) {
          setMessage('')
          //setValues({ ...values, login: '', password: '' });
          const userData = { email: login };
          props.handleLogin(userData);
          history.push(TO_.MAIN);
        } 
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    resetForm({}, {}, false);
    //eslint-disable-next-line
  }, []);

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
          </li>
        </ul>
      </>
    </StartPageWithForm>
  );
};

export default Login;
