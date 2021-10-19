import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../views/Login';

import HomeAdmin from '../views/admin/Home';
import Add from '../views/admin/Add';
import Edit from '../views/admin/Edit';

import HomeUser from '../views/user/Home';

const Router = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route exact path="/">
                    <HomeUser />
                </Route>
                
                <Route exact path="/admin">
                    <HomeAdmin />
                </Route>
                <Route path="/add">
                    <Add />
                </Route>
                <Route path="/edit/:id">
                    <Edit />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;