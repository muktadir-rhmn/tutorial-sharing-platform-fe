import React from 'react';
import {Link, Redirect} from 'react-router-dom'

import userManager from "./UserManager";
import requester from "../../library/requester";
import userPaths from "./UserPaths";
import TextBox from "../../form/TextBox";
import PasswordBox from "../../form/PasswordBox";
import Button from "../../form/Button";
import formDataCollector from "../../form/formDataCollector";

class SignIn extends React.Component {
    constructor(props)  {
        super(props);

        this.state = {
            overallErrorMessage: "",
        }
    }

    render() {
        if(userManager.isSignedIn()) return <Redirect to="/" />;

        let overallErrorMessage = "";
        if (this.state.overallErrorMessage !== "") {
            overallErrorMessage = (<div className="alert alert-danger" role="alert">
                {this.state.overallErrorMessage}
            </div>)
        }

        return (
            <div id="sign-in-form" className="box shadow p-3 mb-5 ml-auto mr-auto bg-white rounded w-50">
                <h1>Sign In</h1>
                {overallErrorMessage}
                <TextBox name="email" label="Email"/>
                <PasswordBox name="password" label="Password"/>
                <Button onClick={event => this.handleSignIn(event)} label="Sign In"/><br/>
                <div>
                    No Account? <Link to={userPaths.signUpPath()}>Sign Up</Link>
                </div>
            </div>
        );
    }

    handleSignIn() {
        const data =  formDataCollector.collect("sign-in-form");

        requester.POST("/users/sign-in", data).then(
            (response) => {
                userManager.setSignedInUser(response.token, response.userType, response.userID, response.userName);

                alert(response.message);
                window.location.href = "/";
            },
            (errorResponse) => {
                console.log(errorResponse);

                this.setState({
                    overallErrorMessage: errorResponse.message,
                })
            }
        );
    }
}

export default SignIn;