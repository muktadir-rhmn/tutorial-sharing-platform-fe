import React from 'react';
import {Link} from 'react-router-dom'

import TextBox from '../form/TextBox'
import PasswordBox from '../form/PasswordBox'
import Button from '../form/Button'
import formDataCollector from "../../library/formDataCollector";
import userManager from "../../managers/UserManager";
import requester from "../../library/requester";

class SignIn extends React.Component {
    constructor(props)  {
        super(props);

        this.state = {
            overallErrorMessage: "",
        }

        this.handleSignIn = this.handleSignIn.bind(this);
    }

    render() {
        if(userManager.isSignedIn()) {
            window.location.href = "/";
            return;
        }

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
                <TextBox id="email" label="Email"/>
                <PasswordBox id="password" label="Password"/>
                <Button onClick={this.handleSignIn} label="Sign In"/><br/>
                <div className="alreadySignedUp">No Account? </div>
            </div>
        );
    }

    handleSignIn() {
        const data =  formDataCollector.collect("sign-in-form");

        requester.POST("/user/sign-in", data).then(
            (response) => {
                userManager.setUser(response.token, response.userType, response.userID, response.userName);

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