import React from 'react';
import { Route, Link } from 'react-router-dom';
    
function StartPageWithForm(props) {
  return (
    <div className="start-page-container page__start-page-container">
      <form onSubmit={ props.onSubmit } className={ `form start-page-container__form form_type_${props.name}` } name={ `${props.name}-form` } id={ `${props.name}-form` } >
        <h2 className="form__title form__title_type_start">{ props.title }</h2>
        { props.children }
        <button type="submit" disabled={ props.isDisabled } className={ `button ${props.isDisabled ? 'button_type_submit-inactive' : 'button_type_submit-start'} form__submit-button form__submit-button_type_start` } name={ `${props.name}-button` } value={ props.submitButtonText }>{ props.isLoading ? props.preloaderText : props.submitButtonText }</button>
        <Route path="/sign-up">
          <Link to="/sign-in" className="start-page-container__link">Уже зарегистрированы? Войти</Link>
        </Route>
      </form>
    </div>
  );
};

export default StartPageWithForm;
