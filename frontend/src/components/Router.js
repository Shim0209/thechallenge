import React from "react";
import {BrowserRouter as Router, Redirect} from "react-router-dom";

import Header from "components/Header";
import PrivateRoute from "components/auth/PrivateRoute";
import PublicRoute from "components/auth/PublicRoute";
import Login from "routes/Login";
import Logout from "routes/Logout";
import Signup from "routes/Signup";
import Home from "routes/Home";
import Oauth2Redirect from 'components/auth/Oauth2Redirect';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    
    <Router>
        <>
            <Header />
            <PublicRoute path="/" exact restricted={false} component={Home} />
            <PublicRoute path="/login" exact restricted={true} component={Login} />
            <PublicRoute path="/signup" exact restricted={true} component={Signup} />
            <PrivateRoute path="/logout" exact component={Logout} />
            <PublicRoute path="/oauth2/redirect" exact restricted={true} component={Oauth2Redirect} />
            <Redirect from="*" to="/" />
        </>
    </Router>
)