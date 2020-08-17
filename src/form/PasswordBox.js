import React from 'react';
import './style.css'

class PasswordBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
        };
    }

    render() {

        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                {this.props.description ? <small className="description">{this.props.description}</small> : ""}
                <input className="form-input form-control" type="password" name={this.props.name} value={this.state.value} onChange={event => this.onChange(event)}/>
                {this.props.errorMessage ? <small className="errorMessage">{this.props.errorMessage}</small> : ""}
            </div>
        )
    }

    onChange(event) {
        const value = event.target.value;
        this.setState({value: value});

        if (this.props.onChange) this.props.onChange(value);
    }
    componentDidMount() {
        this.initValue();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.value !== prevProps.value) this.initValue();
    }

    initValue() {
        const value = this.props.value ? this.props.value : "";
        this.setState({
            value: value,
        });
    }
}

export default PasswordBox;