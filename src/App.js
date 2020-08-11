import React from 'react';
import './App.css';
import SignIn from "./view/user/SignIn";
import SignUp from "./view/user/SignUp";
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import userManager from "./view/user/UserManager";
import RoutingTest from "./view/RoutingTest";
import AdminMain from "./view/admin/AdminMain";
import ViewerMain from "./view/viewer/ViewerMain";

function App() {
    let userName = "";
    if (userManager.isSignedIn()) {
        userName = userManager.getUserName();
    } else {
        userName = "New Visitor";
    }
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/">
                    <h1>Hello, {userName}!</h1>
                    <div> This is the first page</div>
                    <button onClick={() => {userManager.removeSignedInUser(); window.location.reload();} }>Logout</button>
                </Route>
                <Route path="/user/sign-in">
                    <SignIn />
                </Route>
                <Route path="/user/sign-up">
                    <SignUp />
                </Route>
                <Route path="/admin">
                    <AdminMain />
                </Route>
                <Route path="/tutorials/:tutorialID" >
                    <ViewerMain/>
                </Route>
                <Route path="/test">
                    <RoutingTest/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
