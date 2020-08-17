import React from 'react';
import './style.css';

class ComboBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
        };
    }

    render() {
        const options = this.renderOptions(this.props.options);

        return (
            <div className="form-group">
                {this.props.label ? <label>{this.props.label}</label> : ""}
                <select className="form-input form-control" name={this.props.name}
                        value={this.state.value} onChange={event => this.onChange(event)}>
                    {options}
                </select>
                {this.props.errorMessage ? <small className="errorMessage">{this.props.errorMessage}</small> : ""}
            </div>
        )
    }

    onChange(event) {
        const value = event.target.value;
        this.setState({value: value});
        if (this.props.onChange) this.props.onChange(value);
    }

    renderOptions(options) {
        const optionList = [];
        for (let i = 0; i < options.length; i++) {
            optionList.push(this.renderOption(options[i]));
        }

        return optionList;
    }

    renderOption(option) {
        return <option key={option.value} value={option.value}>{option.label}</option>;
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

export default ComboBox;
