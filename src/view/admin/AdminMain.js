import React from 'react';
import {Route, Switch, useRouteMatch, useLocation} from 'react-router-dom'

import './style.css'

function AdminMain (){
    let { path, url } = useRouteMatch();
    console.log(useRouteMatch())
    console.log(useLocation())

    return (
        <div>
            <aside id="left-panel" className="left-panel">
                <nav className="navbar navbar-expand-sm navbar-default">
                    <div id="main-menu" className="main-menu collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li>
                                <a href="index.html"><i className="menu-icon fa fa-laptop"></i>Dashboard </a>
                            </li>
                            <li className="menu-title">UI elements</li>
                            <li>
                                <a href="#" className="dropdown-toggle"> <i className="menu-icon fa fa-table"></i>Tables</a>
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
                                        <Route path={`${path}/tutorials/create`}>
                                            Hello
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

export default AdminMain;