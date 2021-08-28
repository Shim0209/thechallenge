import React from 'react';
import { Route, Redirect } from 'react-router';
import verifJwt from 'components/auth/verifJwt';

/**
 * restriced가 false이면 누구나 접근가능 -> 인증 절차 없음
 * 
 * [인증된 유저가 특정 페이지에 접근하는것을 막고싶을때]
 * restriced가 true이면 verifJwt의 결과가 true시 유저화면 이동 
 *      => 로그인한 유저가 접근할 필요가 없는 페이지 login, signup 등
 */
const PublicRoute = ({component: Component, restricted, ...rest}) => (
    <Route {...rest} render={props => (
        verifJwt() && restricted ?
        <Redirect to="/" /> :
        <Component {...props} />
    )} />
);

export default PublicRoute;
