import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { SIGNIN, SIGNUP } from '../utils/routesMap';

/**
 * @module StartPageWithForm
 * @description Функциональный React-компонент<br>
 * Стартовая страница. Пропсами определяется тип страницы: страница авторизации или регистрации.
 *  Поля формы одинаковы для обоих типов страницы и также передаются в пропсах JSX-фрагментом.
 * @param {Object} props - пропсы, принимаемые компонентом
 * @param {String} props.name - название, которое будет присвоено форме компонента
 * @param {String} props.title - заголовок формы
 * @param {Function} props.onSubmit -функция-коллбэк, вызывается при сабмите формы.
 * @param {Boolean} props.isLoading - индикатор состояния загрузки, используется для информирования пользовтаеля
 *  о том, что инициированный им процесс выполняется
 * @param {String} props.submitButtonText - текст, который будет отображаться на кнопке submit
 * @param {String} props.preloaderText - екст, отображаемый на кнопке сабмит во время загрузки, т.е. когда isLoading: true
 * @param {String} props.redirectTitleText - текст, перед перенаправляющей ссылкой (не текст ссылки)
 * @param {String} props.redirectLinkText - текст непосредственно перенаправляющей ссылки
 * @param {JSX} props.children - JSX - фрагмент
 * @returns {JSX} - JSX - фрагмент, страница регистрации или авторизации
 * @since v.2.1.0
 */
function StartPageWithForm({
  name,
  title,
  onSubmit,
  isDisabled,
  isLoading,
  submitButtonText,
  preloaderText,
  redirectTitleText,
  redirectLinkText,
  children,
}) {
  return (
    <div className="start-page-container page__start-page-container">
      <form
        onSubmit={onSubmit}
        className={`form start-page-container__form form_type_${name}`}
        name={`${name}-form`}
        id={`${name}-form`}
      >
        <h2 className="form__title form__title_type_start">{title}</h2>
        {children}
        <button
          type="submit"
          disabled={isDisabled}
          className={`button ${isDisabled ? 'button_type_submit-inactive' : 'button_type_submit-start'} form__submit-button form__submit-button_type_start`}
          name={`${name}-button`}
          value={submitButtonText}
        >
          {isLoading ? preloaderText : submitButtonText}
        </button>
        <Switch>
          <Route path={SIGNUP}>
            <p className="form__redirect-title">
              {redirectTitleText}
              <Link to={SIGNIN} className="form__redirect-link">
                {redirectLinkText}
              </Link>
            </p>
          </Route>
          <Route path={SIGNIN}>
            <p className="form__redirect-title hidden-block">
              {redirectTitleText}
              <Link to="#" className="form__redirect-link hidden-block">
                {redirectLinkText}
              </Link>
            </p>
          </Route>
        </Switch>
      </form>
    </div>
  );
};

export default StartPageWithForm;
