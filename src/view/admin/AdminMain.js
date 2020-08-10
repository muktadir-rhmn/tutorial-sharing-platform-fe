import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom'

function AdminMain (){
    let { path, url } = useRouteMatch();

    return (
        <div>
            <h1>Admin Portal</h1>
            <Switch>
                <Route exact path={path}>
                    Welcome to Admin Portal
                </Route>
            </Switch>
        </div>
    );


}

export default AdminMain;