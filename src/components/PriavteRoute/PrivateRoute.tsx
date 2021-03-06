import React from "react";
import { RouteProps } from "react-router";
import { Redirect, Route } from "react-router-dom";

interface IProps extends RouteProps {
    component: any
    authenticated: boolean
}
const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}: IProps)=>{
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          rest.path === '/' || rest.path === '/signIn' ?  <Redirect to="/trips" /> : <Component {...props} {...rest} />
        ) : (
          <Redirect to="/signIn" />
        )
      }
    />
  );
}

export default PrivateRoute;