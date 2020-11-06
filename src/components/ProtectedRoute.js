import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ROUTES_MAP } from '../utils/constants';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {
        () => props.loggedIn ? <Component { ...props } /> : <Redirect to={ROUTES_MAP.SIGNIN} />
      }
    </Route>
  );
};

export default ProtectedRoute;