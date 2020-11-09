import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { SIGNIN, SIGNUP } from '../utils/routesMap';

function StartPageWithForm({
  name, title, onSubmit, isDisabled, isLoading, submitButtonText, preloaderText, redirectTitleText, redirectLinkText, children,
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
