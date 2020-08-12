import React from 'react';
import './App.css';
import SignIn from "./view/user/SignIn";
import SignUp from "./view/user/SignUp";
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import userManager from "./view/user/UserManager";
import RoutingTest from "./view/RoutingTest";
import AdminRouter from "./view/admin/AdminRouter";
import ViewerMain from "./view/viewer/ViewerMain";
import LandingPage from "./view/landing-page/LandingPage";
import NavBar from "./view/nav-bar/NavBar";

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
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route path="/user/sign-in">
                    <SignIn />
                </Route>
                <Route path="/user/sign-up">
                    <SignUp />
                </Route>
                <Route path="/admin">
                    <AdminRouter />
                </Route>
                <Route path="/tutorials/:tutorialID/:chapterID/:lessonID" >
                    <ViewerMain/>
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
