import React from 'react';
import { Route, Redirect } from 'react-router';
import verifJwt from 'components/auth/verifJwt';

/**
 * verifJwt(인증, 인가) True시 해당 컴포넌트로 이동, False시 로그인 페이지로 이동
 */
const PrivateRoute = ({component: Component, ...rest}) => (
        <Route {...rest} render={props => (
            verifJwt() ? 
            <Component {...props} /> :
            <Redirect to="/login" />)} 
        />
);

export default PrivateRoute;