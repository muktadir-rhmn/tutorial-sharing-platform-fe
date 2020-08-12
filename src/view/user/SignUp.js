import React from 'react';
import {Link} from 'react-router-dom'

import TextBox from '../form/TextBox'
import PasswordBox from '../form/PasswordBox'
import Button from '../form/Button'
import userManager from "./UserManager";
import formDataCollector from "../../library/formDataCollector";
import requester from "../../library/requester";
import userPaths from "./UserPaths";

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: {
                name: "",
                email: "",
                password: "",
            }
        }

        this.handleSignUp = this.handleSignUp.bind(this);
    }
    render() {
        if(userManager.isSignedIn()) {
            window.location.href = "/";
            return;
        }

        return (
            <div id="sign-up-form" className="box shadow p-3 mb-5 ml-auto mr-auto bg-white rounded w-50">
                <h1>Sign Up</h1>
                <TextBox id="name" label="Name" errorMessage={this.state.errorMessage.name}/>
                <TextBox id="email" label="Email Address" errorMessage={this.state.errorMessage.email}/>
                <PasswordBox id="password" label="Password" description="At least 8 character long" errorMessage={this.state.errorMessage.password}/>
                <Button onClick={this.handleSignUp} label="Sign Up"/><br/>
                <div className="alreadySignedUp">Already have an account? <Link to={userPaths.signInPath()}>Sign In</Link>
                </div>
            </div>
        );
    }

    handleSignUp() {
        const data = formDataCollector.collect("sign-up-form");

        requester.POST("/user/sign-up", data).then(
            (response) => {
                console.log(response);

                handleSignUpSuccess(this, response.message);
            },
            (errorObject) => {
                console.error(errorObject);
                handleSignUpFailure(this, errorObject)
            }
        )

        function handleSignUpSuccess(signUpComponent, message){
            alert(message);
            window.location.href = userPaths.signInPath();
        }

        function handleSignUpFailure(signUpComponent, errorObject) {
            signUpComponent.setState({
                errorMessage: {
                    name: errorObject.name,
                    email: errorObject.email,
                    password: errorObject.password,
                }
            })
        }
    }
}

export default SignUp;