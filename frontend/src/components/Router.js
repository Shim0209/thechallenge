import React from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";

import PrivateRoute from "components/auth/PrivateRoute";
import PublicRoute from "components/auth/PublicRoute";
import Login from "routes/Login";
import Logout from "routes/Logout";
import Home from "routes/Home";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    
    <Router>
        <>
            <Route path="/" exact component={Home} />
            <PublicRoute path="/login" exact restricted={true} component={Login} />
            <PrivateRoute path="/logout" exact component={Logout} />
            <Redirect from="*" to="/" />
        </>
    </Router>
)