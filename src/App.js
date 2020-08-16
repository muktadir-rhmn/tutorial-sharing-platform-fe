import React from 'react';
import './App.css';
import SignIn from "./view/user/SignIn";
import SignUp from "./view/user/SignUp";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AdminRouter from "./view/admin/AdminRouter";
import ViewerMain from "./view/viewer/ViewerMain";
import LandingPage from "./view/navigator/landing-page/LandingPage";
import NavBar from "./view/nav-bar/NavBar";
import TutorialsByRouter from "./view/navigator/by/TutorialsByRouter";

function App() {
  return (
    <div className="App">

        <Router>
            <Switch>
                <Route exact path="/">
                    <NavBar />
                    <LandingPage />
                </Route>
                <Route path="/browse/:by/:itemID">
                    <NavBar />
                    <TutorialsByRouter />
                </Route>
                <Route path="/tutorials/:tutorialID/:chapterID/:lessonID" >
                    <NavBar />
                    <ViewerMain/>
                </Route>
                <Route path="/tutorials/:tutorialID" >
                    <NavBar />
                    <ViewerMain/>
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
            </Switch>
        </Router>
    </div>
  );
}

export default App;
