import React from 'react';
import {Link, Route, Switch, useRouteMatch} from 'react-router-dom'

import './style.css'
import CreateTutorial from "./tutorial/create/CreateTutorial";
import TutorialList from "./tutorial/list/TutorialList";
import TutorialContentsRouter from "./tutorial/contents/TutorialContentsRouter";
import AddUpdateLessonRouter from "./Lesson/AddUpdateLessonRouter";
import userManager from "../user/UserManager";

function AdminRouter (){
    if (!userManager.isSignedIn()) window.location.href = "/user/sign-in";

    let { path } = useRouteMatch();

    return (
        <div>
            <aside id="left-panel" className="left-panel">
                <nav className="navbar navbar-expand-sm navbar-default">
                    <div id="main-menu" className="main-menu collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/admin"> <i className="menu-icon fa fa-table"></i> Dashboard</Link>
                            </li>
                            <li className="menu-title">My Tutorials</li>
                            <li>
                                <Link to="/admin/tutorials/create"> <i className="menu-icon fa fa-table"></i> Create Tutorial</Link>
                            </li>
                            <li>
                                <Link to="/admin/tutorials/"> <i className="menu-icon fa fa-table"></i> Tutorial List</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>
            
            <div id="right-panel" className="right-panel">
                <header id="header" className="header">
                    <div className="top-left">
                        <div className="navbar-header">
                            Tutorial Sharing Platform
                        </div>
                    </div>
                    <div className="top-right">
                        <div className="header-menu">
                            <div className="header-left">
                                <button className="btn btn-danger">Logout</button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="content">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <Switch>
                                        <Route exact path={path}>
                                            Welcome to Admin Portal
                                        </Route>
                                        <Route exact path={`${path}/tutorials/`}>
                                            <TutorialList/>
                                        </Route>
                                        <Route path={`${path}/tutorials/create`}>
                                            <CreateTutorial/>
                                        </Route>
                                        <Route exact path={`${path}/tutorials/:tutorialID`}>
                                            <TutorialContentsRouter/>
                                        </Route>
                                        <Route exact path={`${path}/tutorials/:tutorialID/:chapterID/add-lesson`}>
                                            <AddUpdateLessonRouter operation="add"/>
                                        </Route>
                                        <Route exact path={`${path}/tutorials/:tutorialID/:chapterID/:lessonID/update`}>
                                            <AddUpdateLessonRouter operation="update"/>
                                        </Route>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>

        </div>

        </div>
    );

}

export default AdminRouter;