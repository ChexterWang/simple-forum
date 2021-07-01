import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useAuth } from "./index";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <Route {...rest}>
      {
        currentUser !== null ?
          <Component /> :
          <Redirect to={{ pathname: '/', state: { referer: location } }} />
      }
    </Route>
  );
}

export default PrivateRoute;