import React from 'react';
import { Route, Link } from 'react-router-dom';
import { SIGNIN, SIGNUP } from '../utils/routesMap';
    
function StartPageWithForm(props) {
  return (
    <div className="start-page-container page__start-page-container">
      <form onSubmit={ props.onSubmit } className={ `form start-page-container__form form_type_${props.name}` } name={ `${props.name}-form` } id={ `${props.name}-form` } >
        <h2 className="form__title form__title_type_start">{ props.title }</h2>
        { props.children }
        <button type="submit" disabled={ props.isDisabled } className={ `button ${props.isDisabled ? 'button_type_submit-inactive' : 'button_type_submit-start'} form__submit-button form__submit-button_type_start` } name={ `${props.name}-button` } value={ props.submitButtonText }>{ props.isLoading ? props.preloaderText : props.submitButtonText }</button>
        
        <Route path={ SIGNUP }>
          <p className="form__redirect-title" style={ { color: "white", fontSize: "14px" } }>Уже зарегистрированы? <Link to={ SIGNIN } className="form__redirect-link">Войти</Link></p>
        </Route>
      </form>
    </div>
  );
};

export default StartPageWithForm;
