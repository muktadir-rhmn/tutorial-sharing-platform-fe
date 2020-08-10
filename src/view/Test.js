import React from 'react';
import {BrowserRouter as Router, Route, Switch, useRouteMatch} from 'react-router-dom'
import SignIn from "./user/SignIn";

function Test (){
        let { path, url } = useRouteMatch();
        console.log(path)
        return (
            <div>
                <h1>Test</h1>
                <Switch>
                    <Route path={`${path}/ttt`}>
                        <SignIn />
                    </Route>
                </Switch>

            </div>
        );


}

export default Test;