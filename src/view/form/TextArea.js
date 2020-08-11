import React from 'react';
import './style.css'

class TextArea extends React.Component {
    render() {
        let description = ""
        if(this.props.description) {
            description = <small className="description">{this.props.description}</small>
        }

        let errorMessage = "";
        if(this.props.errorMessage && this.props.errorMessage !== "") {
            errorMessage = <small className="errorMessage">{this.props.errorMessage}</small>;
        }

        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label} {description}</label>
                <textarea className="form-control" id={this.props.id} defaultValue={this.props.value}/>
                {errorMessage}
            </div>
        )
    }
}

export default TextArea;