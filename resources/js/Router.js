import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";

import NotFound from "./NotFound";

// User is LoggedIn
import PrivateRoute from "./PrivateRoute";
import UserList from "./components/UserList";

const Main = props => (
    <Switch>
        {/*User might LogIn*/}
        <Route exact path="/" component={UserList} />

        {/*User will LogIn*/}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* User is LoggedIn*/}
        <PrivateRoute path="/" component={UserList} />

        {/*Page Not Found*/}
        <Route component={NotFound} />
    </Switch>
);

export default Main;
