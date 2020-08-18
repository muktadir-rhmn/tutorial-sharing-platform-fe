import React from 'react';
import {Link, Redirect} from 'react-router-dom'

import userManager from "./UserManager";
import requester from "../../library/requester";
import userPaths from "./UserPaths";
import TextBox from "../../form/TextBox";
import PasswordBox from "../../form/PasswordBox";
import Button from "../../form/Button";
import formDataCollector from "../../form/formDataCollector";

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

    }
    render() {
        if(userManager.isSignedIn()) return <Redirect to="/" />;

        return (
            <div id="sign-up-form" className="box shadow p-3 mb-5 ml-auto mr-auto bg-white rounded w-50">
                <h1>Sign Up</h1>
                <TextBox name="name" label="Name" errorMessage={this.state.errorMessage.name}/>
                <TextBox name="email" label="Email Address" errorMessage={this.state.errorMessage.email}/>
                <PasswordBox name="password" label="Password" description="At least 8 character long" errorMessage={this.state.errorMessage.password}/>
                <Button onClick={event => this.handleSignUp(event)} label="Sign Up"/><br/>
                <div>
                    Already have an account? <Link to={userPaths.signInPath()}>Sign In</Link>
                </div>
            </div>
        );
    }

    handleSignUp() {
        const data = formDataCollector.collect("sign-up-form");

        requester.POST("/users/sign-up", data).then(
            (response) => {
                console.log(response);

                alert(response.message);
                window.location.href = userPaths.signInPath();
            },
            (errorObject) => {
                console.error(errorObject);

                this.setState({
                    errorMessage: {
                        name: errorObject.name,
                        email: errorObject.email,
                        password: errorObject.password,
                    }
                })
            }
        )
    }
}

export default SignUp;