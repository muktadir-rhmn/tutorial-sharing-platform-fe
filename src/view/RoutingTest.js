import React from 'react';
import {BrowserRouter as Router, Route, Switch, useRouteMatch} from 'react-router-dom'
import SignIn from "./user/SignIn";

function RoutingTest (){
        let { path, url } = useRouteMatch();
        console.log(path)
        return (
            <div>
                <h1>Test</h1>
                <Switch>
                    <Route path={`${path}/ttt`}>
                        <SignIn />
                    </Route>
                    <Route path="/:id">

                    </Route>
                </Switch>

            </div>
        );
}



export default RoutingTest;