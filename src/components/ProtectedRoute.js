import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SIGNIN } from '../utils/routesMap';

/**
 * @module ProtectedRoute
 * @description Функциональный компонент<br>
 * Защищенный роут, предотвращает доступ к приложению не зарегистрированных и не авторизованных пользователей.
 *  Принимает на вход компонент, доступ к которму нужно защитить, и пропсы, которые далее пробрасываются
 *  в переданный компонент. Доступ разрешается или запрещается в зависимости от состояния стейта loggedIn,
 *  которое устанавливается после проверки учетных данных пользователя.
 * @since v.2.1.0
 */
const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {
        () => props.loggedIn ? <Component { ...props } /> : <Redirect to={SIGNIN} />
      }
    </Route>
  );
};

export default ProtectedRoute;
