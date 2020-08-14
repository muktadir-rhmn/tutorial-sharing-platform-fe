import React from 'react';

import './style.css';
import userManager from "../user/UserManager";
import {Link} from "react-router-dom";
import adminPaths from "../admin/AdminPaths";
import userPaths from "../user/UserPaths";

class UserBar extends React.Component{

    render() {
        let content = "";
        if (userManager.isSignedIn()) content = <Link className="btn btn-outline-success m-2" to={adminPaths.rootPath()}>Admin Panel</Link>;
        else content = (
            <div>
                <Link className="btn btn-outline-success m-2" to={userPaths.signInPath()}>
                    <i className="fa fa-sign-in" aria-hidden="true"></i> Sign In</Link>
                <Link className="btn btn-outline-success" to={userPaths.signUpPath()}>
                    <i className="fa fa-user-plus" aria-hidden="true"></i> Sign Up</Link>
            </div>
        )
        return (
            <div className="d-flex justify-content-end mr-3">
                {content}
            </div>
        );
    }

}

export default UserBar;