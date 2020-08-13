import React from 'react';
import './style.css'

class TextBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
        };
    }

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
                <input className="form-input form-control" type="text" id={this.state.id} value={this.state.value} onChange={event => this.setState({value: event.target.value})}/>
                {errorMessage}
            </div>
        )
    }

    componentDidMount() {
        this.setState({value: this.props.value});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.value !== prevProps.value) this.setState({value: this.props.value});
    }
}

export default TextBox;