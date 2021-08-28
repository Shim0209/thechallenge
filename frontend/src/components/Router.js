import React from "react";
import {BrowserRouter as Router, Redirect} from "react-router-dom";

import Header from "components/Header";
import PrivateRoute from "components/auth/PrivateRoute";
import PublicRoute from "components/auth/PublicRoute";
import Login from "routes/Login";
import Logout from "routes/Logout";
import Home from "routes/Home";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    
    <Router>
        <>
            <Header />
            <PublicRoute path="/" exact restricted={false} component={Home} />
            <PublicRoute path="/login" exact restricted={true} component={Login} />
            <PrivateRoute path="/logout" exact component={Logout} />
            <Redirect from="*" to="/" />
        </>
    </Router>
)