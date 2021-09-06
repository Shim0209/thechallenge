import React from "react";
import {BrowserRouter as Router, Redirect} from "react-router-dom";

import Header from "components/Header";
import PrivateRoute from "components/auth/PrivateRoute";
import PublicRoute from "components/auth/PublicRoute";
import Login from "routes/Login";
import Logout from "routes/Logout";
import Signup from "routes/Signup";
import Dashboard from "routes/Dashboard";
import Profile from "routes/Profile";
import Mandalart from "routes/Mandalart";
import ChallengeManage from "routes/challenge/ChallengeManage";
import List from "routes/challenge/List";
import Create from "routes/challenge/Create";
import Manage from "routes/challenge/Manage";
import MyChallenge from "routes/challenge/MyChallenge";
import Assignment from "routes/challenge/Assignment";
import Home from "routes/Home";
import Oauth2Redirect from 'components/auth/Oauth2Redirect';
import Oauth2Fail from "components/auth/Oauth2Fail";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    
    <Router>
        <>
            <Header />
            <PublicRoute path="/" exact restricted={false} component={Home} />
            <PublicRoute path="/login" exact restricted={true} component={Login} />
            <PublicRoute path="/signup" exact restricted={true} component={Signup} />
            <PrivateRoute path="/logout" exact component={Logout} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <PrivateRoute path="/mandalart" exact component={Mandalart} />
            <PublicRoute path="/challenge" exact restricted={false} component={List} />
            <PrivateRoute path="/challenge/create" exact component={Create} />
            <PrivateRoute path="/challenge/manage" exact component={Manage} />
            <PrivateRoute path="/challenge/manage/:id" exact component={ChallengeManage} />
            <PrivateRoute path="/challenge/mychallenge" exact component={MyChallenge} />
            <PrivateRoute path="/challenge/assignment" exact component={Assignment} />
            <PublicRoute path="/oauth2/redirect" exact restricted={true} component={Oauth2Redirect} />
            <PublicRoute path="/oauth2/fail" exact restricted={true} component={Oauth2Fail} />
            <Redirect from="*" to="/Login" />
        </>
    </Router>
)