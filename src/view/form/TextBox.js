import React from 'react';
import './style.css'

class TextBox extends React.Component {
    render() {
        let description = ""
        if(this.props.description) {
            description = <small className="description">{this.props.description}</small>
        }

        let errorMessage = "";
        if(this.props.errorMessage) {
            errorMessage = <small className="errorMessage">{this.props.errorMessage}</small>;
        }

        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label} {description}</label>
                <input className="form-control" type="text" id={this.props.id}/>
                {errorMessage}
            </div>
        )
    }
}

export default TextBox;