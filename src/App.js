import React from 'react';
import './App.css';
import SignIn from "./view/user/SignIn";
import SignUp from "./view/user/SignUp";
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import userManager from "./managers/UserManager";

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
            </Switch>
        </Router>
    </div>
  );
}

export default App;
