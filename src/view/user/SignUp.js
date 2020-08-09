import React from 'react';
import {Link} from 'react-router-dom'

import TextBox from '../form/TextBox'
import PasswordBox from '../form/PasswordBox'
import Button from '../form/Button'
import userManager from "../../data/UserManager";
import formDataCollector from "../../library/formDataCollector";

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
                <div className="alreadySignedUp">Already have an account? </div>
            </div>
        );
        //<Link to="/signin">Signin</Link>
    }

    handleSignUp() {
        const data = formDataCollector.collect("sign-up-form");
        userManager.requestSignUp(data.name, data.email, data.password,
            (message) => {
                alert(message);
                window.location.href = "/signin";
            },
            (error) => {
                this.setState({
                    errorMessage: {
                        name: error.name,
                        email: error.email,
                        password: error.password,
                    }
                })
            }
        )
    }
}

export default SignUp;